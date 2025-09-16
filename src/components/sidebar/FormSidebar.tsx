"use client";

import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";
import { useEffect, useRef, useState, ComponentType } from "react";
import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Mail,
  Sparkles,
} from "lucide-react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ConfirmationStep } from "../form/ConfirmationStep";
import { GoalsStep } from "../form/GoalsStep";
import { ProfessionalInfoStep } from "../form/ProfessionalInfoStep";
import { BasicInfoStep } from "../form/BasicInfoStep";
import { UserTypeStep } from "../form/UserTypeStep";
import {
  scrollToSection,
  isStepValid,
  getInitialFormData,
} from "../form/utils";
import { FORM_STEPS } from "../form/constants";
import { Badge } from "../ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormSchema,
  PATIENT_REQUIRED_FIELDS,
  PROVIDER_REQUIRED_FIELDS,
} from "../form/types";
import type { FormData } from "../form/types";
import { v4 as uuidv4 } from "uuid";

const STEP_COMPONENTS: Record<string, ComponentType<any>> = {
  "user-type": UserTypeStep,
  "basic-info": BasicInfoStep,
  "professional-info": ProfessionalInfoStep,
  goals: GoalsStep,
  confirmation: ConfirmationStep,
};

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FormSidebar({ isOpen, onClose }: CartSidebarProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [stepHasErrors, setStepHasErrors] = useState<boolean[]>(() =>
    Array(FORM_STEPS.length).fill(false)
  );

  // react-hook-form methods (single owner)
  const methods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: getInitialFormData(),
    shouldUnregister: false, // keeps values from unmounted steps
  });

  const anonIdRef = useRef<string | null>(null);
  const autosaveTimerRef = useRef<number | null>(null);
  const currentStepRef = useRef<number>(currentStep);

  // DEBUG toggle
  const DEBUG_DL = true;

  // push event to dataLayer + debug log
  function pushEvent(name: string, payload: Record<string, any> = {}) {
    const event = { event: name, ...payload };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
    if (DEBUG_DL) console.debug("dataLayer push:", event);
  }

  // SHA-256 hex
  async function sha256Hex(input: string | null) {
    if (!input || !window?.crypto?.subtle) return null;
    const enc = new TextEncoder().encode(input);
    const hash = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      const anonIdHash = await sha256Hex(anonIdRef.current);
      pushEvent("questionnaire_start", { anonIdHash });
    })();
  }, [isOpen]);

  // keep currentStepRef in sync
  useEffect(() => {
    currentStepRef.current = currentStep;

    (async () => {
      const anonIdHash = await sha256Hex(anonIdRef.current);
      pushEvent("questionnaire_step", {
        anonIdHash,
        step: currentStep + 1,
        totalSteps: FORM_STEPS.length,
        progress: Math.round(progress),
      });
    })();
  }, [currentStep]);

  // Single effect: init anonId, attempt restore, and autosave watch
  useEffect(() => {
    let isMounted = true;

    // helper to get/create anonId safely
    const ensureAnonId = () => {
      try {
        let id = localStorage.getItem("mp:q:anonId");
        if (!id) {
          id = uuidv4();
          localStorage.setItem("mp:q:anonId", id);
        }
        anonIdRef.current = id;
        return id;
      } catch (e) {
        // fallback if localStorage blocked
        console.warn(
          "Could not access localStorage for anonId, using in-memory id.",
          e
        );
        anonIdRef.current = uuidv4();
        return anonIdRef.current;
      }
    };

    const anonId = ensureAnonId();
    const progressKey = `mp:q:${anonId}`;

    // try to load saved progress
    try {
      const raw = localStorage.getItem(progressKey);
      if (raw) {
        const payload = JSON.parse(raw);
        // simple safety check
        if (payload && payload.values) {
          /*const shouldRestore = window.confirm(
            "We found a saved questionnaire. Restore progress?"
          );*/
          const shouldRestore = true;
          if (shouldRestore && isMounted) {
            methods.reset(payload.values); // restore values
            // restore currentStep if saved, otherwise 0
            if (typeof payload.currentStep === "number") {
              setCurrentStep(payload.currentStep);
            }
          }
        }
      }
    } catch (e) {
      console.warn("Failed to parse saved progress", e);
    }

    // subscribe to form value changes
    const subscription = methods.watch((values) => {
      // debounce
      if (autosaveTimerRef.current) {
        window.clearTimeout(autosaveTimerRef.current);
      }

      autosaveTimerRef.current = window.setTimeout(() => {
        try {
          const payload = {
            v: 1,
            anonId: anonIdRef.current,
            updatedAt: new Date().toISOString(),
            currentStep: currentStepRef.current, // include current step
            values,
          };
          const key = `mp:q:${anonIdRef.current}`;
          localStorage.setItem(key, JSON.stringify(payload));
        } catch (err) {
          console.warn("Autosave failed", err);
        }
      }, 600);
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe?.();
      if (autosaveTimerRef.current) {
        window.clearTimeout(autosaveTimerRef.current);
      }
    };
  }, [methods]);

  // IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleBackToHome = () => {
    onClose();

    // tweak 250ms
    window.setTimeout(() => {
      scrollToSection("home");
    }, 250);

    scrollToSection("home");
  };

  const handleExploreFeatures = () => {
    onClose();

    // tweak 250ms
    window.setTimeout(() => {
      scrollToSection("home");
    }, 250);

    scrollToSection("features");
  };

  const nextStep = async () => {
    const stepDef = FORM_STEPS[currentStep];
    const uiStepFields: string[] = (stepDef?.fields as string[]) ?? [];

    const userType = methods.getValues("userType");
    console.log("User type:", userType);

    if (!userType) {
      const ok = await methods.trigger(["userType"]);
      if (!ok) {
        const firstError = Object.keys(methods.formState.errors)[0];
        if (firstError) {
          const el = document.querySelector(
            `[name="${firstError}"]`
          ) as HTMLElement | null;
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
          el?.focus?.();
        }
        return; // stop — user must pick a userType first
      }
    }

    const requiredForBranch =
      userType === "provider"
        ? PROVIDER_REQUIRED_FIELDS
        : userType === "patient"
        ? PATIENT_REQUIRED_FIELDS
        : []; // userType not chosen yet

    console.log("UI step fields:", uiStepFields);

    console.log("Required for branch:", requiredForBranch);

    // intersection: only validate fields that are both in the UI step and required by schema
    const fieldsToValidate = uiStepFields.filter((f) =>
      requiredForBranch.includes(f)
    );

    console.log("Fields to validate:", fieldsToValidate);

    const valid =
      fieldsToValidate.length > 0
        ? await methods.trigger(fieldsToValidate)
        : true;

    console.log("valid?", valid);

    if (!valid) {
      setStepHasErrors((prev) => {
        const copy = [...prev];
        copy[currentStep] = true;
        return copy;
      });

      console.log("Errors:", methods.formState.errors);
      // focus first field with error (you already do this)
      const firstError = Object.keys(methods.formState.errors)[0];
      if (firstError) {
        const el = document.querySelector(
          `[name="${firstError}"]`
        ) as HTMLElement | null;
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus?.();
      }
      return; // stop here
    }

    /*if (!valid) {
      const firstError = Object.keys(methods.formState.errors)[0];
      if (firstError) {
        const el = document.querySelector(
          `[name="${firstError}"]`
        ) as HTMLElement | null;
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus?.();
      }
      return;
    }*/

    setStepHasErrors((prev) => {
      const copy = [...prev];
      copy[currentStep] = false;
      return copy;
    });

    // move to next step
    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const onFinalSubmit = async (data) => {
    setIsSubmitting(true);
    const idempotencyKey = uuidv4();
    const anonId = anonIdRef.current ?? null;

    try {
      const payload = {
        values: data,
        anonId,
        submittedAt: new Date().toISOString(),
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      /*const res = await fetch("/api/v1/questionnaire/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-idempotency-key": idempotencyKey,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // read server error message
        let errMsg = `Server returned ${res.status}`;
        try {
          const json = await res.json();
          if (json?.message) errMsg = json.message;
        } catch (_) {}

        console.error("Submit failed:", errMsg);
        alert("Submission failed. Please try again. (" + errMsg + ")");
        return; // do not clear localStorage
      }*/

      try {
        if (anonId) {
          localStorage.removeItem(`mp:q:${anonId}`);
        }
      } catch (err) {
        console.warn("Failed to remove saved progress", err);
      }

      setIsSubmitted(true);

      (async () => {
        const anonIdHash = await sha256Hex(anonIdRef.current);
        pushEvent("questionnaire_submit", {
          anonIdHash,
          idempotencyKey,
          submittedAt: new Date().toISOString(),
        });
      })();

      // scroll to confirmation section
      if (sectionRef.current)
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // convenience
  const progress = ((currentStep + 1) / FORM_STEPS.length) * 100;
  const currentStepData = FORM_STEPS[currentStep];

  const renderStepContent = () => {
    const stepId = FORM_STEPS[currentStep].id;
    const StepComponent = STEP_COMPONENTS[stepId];
    return StepComponent ? (
      <StepComponent showStepErrors={stepHasErrors[currentStep]} />
    ) : null;
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={onClose}
      className="py-20 bg-gradient-to-br from-bright-blue/3 via-white to-teal-blue/3"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <SheetContent className="w-full sm:max-w-2xl gap-0 overflow-y-auto">
        {!isSubmitted && (
          <SheetHeader>
            <div
              className={`text-center mb-8 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="inline-flex items-center gap-3 bg-bright-blue/10 px-6 py-3 rounded-full mb-4">
                <Sparkles className="w-5 h-5 text-bright-blue" />
                <span className="text-bright-blue font-bold text-base">
                  Get Started
                </span>
              </div>

              <h2
                className="text-3xl lg:text-3xl font-bold text-deep-black mb-4 leading-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Join the Healthcare
                <span className="text-bright-blue block bg-gradient-to-r from-bright-blue to-teal-blue bg-clip-text text-transparent">
                  Revolution
                </span>
              </h2>

              <p className="text-base text-shadow-gray leading-relaxed font-medium">
                Complete our smart questionnaire to get personalized access to
                our AI-powered global healthcare platform.
              </p>
            </div>
          </SheetHeader>
        )}

        {isSubmitted ? (
          <Card className="bg-white text-center border-0 relative h-full overflow-auto">
            <CardContent
              className="py-20 px-8"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <div className="space-y-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-bright-blue to-teal-blue rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl lg:text-3xl font-bold text-deep-black">
                    Welcome to MedicallyPlus!
                  </h2>

                  <p className="text-lg text-shadow-gray leading-relaxed max-w-2xl mx-auto font-medium">
                    Thank you for joining our global healthcare community. We're
                    processing your information and will send you personalized
                    access details within 24 hours.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-bright-blue/5 to-teal-blue/5 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-deep-black mb-6">
                    What Happens Next?
                  </h3>
                  <div className="grid gap-6 justify-center text-left">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-bright-blue rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-deep-black">
                          Check Your Email
                        </div>
                        <div className="text-sm text-shadow-gray">
                          Personalized onboarding guide sent to your inbox
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-teal-blue rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-deep-black">
                          Schedule Demo
                        </div>
                        <div className="text-sm text-shadow-gray">
                          Optional 1-on-1 platform walkthrough
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-medical-red rounded-xl flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-deep-black">
                          Start Exploring
                        </div>
                        <div className="text-sm text-shadow-gray">
                          Access your personalized dashboard
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                  <Button
                    onClick={handleBackToHome}
                    className="bg-gradient-to-r from-bright-blue to-teal-blue hover:from-bright-blue/90 hover:to-teal-blue/90 text-white px-10 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold focus:outline-none"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Back to Home
                  </Button>
                  <Button
                    onClick={handleExploreFeatures}
                    variant="outline"
                    className="border-2 border-bright-blue text-bright-blue hover:bg-bright-blue hover:text-white px-10 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold focus:outline-none"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Explore Features
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col h-full">
            {/* Progress Indicator */}
            <div className="mb-12 px-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-shadow-gray">
                  Step {currentStep + 1} of {FORM_STEPS.length}
                </span>
                <span className="text-sm font-semibold text-bright-blue">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-200">
                <div
                  className="h-full bg-gradient-to-r from-bright-blue to-teal-blue rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </Progress>

              {/* Step indicators */}
              <div className="flex justify-between mt-4">
                {FORM_STEPS.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        index <= currentStep
                          ? `${step.bgColor} ${step.color} border-current`
                          : "bg-gray-100 text-shadow-gray border-gray-300"
                      }`}
                    >
                      <step.icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium text-center max-w-16 ${
                        index <= currentStep ? step.color : "text-shadow-gray"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onFinalSubmit)}>
                <Card className="backdrop-blur-sm border-0 shadow-none">
                  <CardContent
                    className="p-12"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <div className="space-y-8">
                      {/* Step Header */}
                      <div className="text-center space-y-4">
                        <div
                          className={`w-20 h-20 mx-auto rounded-2xl ${currentStepData.bgColor} flex items-center justify-center`}
                        >
                          <currentStepData.icon
                            className={`w-10 h-10 ${currentStepData.color}`}
                          />
                        </div>
                        <h3 className="text-3xl font-bold text-deep-black">
                          {currentStepData.title}
                        </h3>
                        <p className="text-lg text-shadow-gray font-medium">
                          {currentStepData.subtitle}
                        </p>
                      </div>

                      {/* Step Content */}
                      <div className="space-y-6">{renderStepContent()}</div>

                      {/* Navigation */}
                      <div className="flex items-center justify-between pt-8 border-t border-shadow-gray/20">
                        <Button
                          onClick={prevStep}
                          variant="outline"
                          disabled={
                            currentStep === 0 ||
                            methods.formState.isSubmitting ||
                            isSubmitting
                          }
                          className="border-2 border-shadow-gray text-shadow-gray hover:border-bright-blue hover:text-bright-blue disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-xl transition-all duration-300 focus:outline-none"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          <ChevronLeft className="w-5 h-5 mr-2" />
                          Previous
                        </Button>

                        <div className="text-center">
                          <Badge
                            variant="secondary"
                            className="bg-bright-blue/10 text-bright-blue font-semibold px-6 py-2"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            Step {currentStep + 1} of {FORM_STEPS.length}
                          </Badge>
                        </div>

                        {currentStep === FORM_STEPS.length - 1 ? (
                          <Button
                            type="submit"
                            disabled={
                              !methods.watch("consent") ||
                              methods.formState.isSubmitting ||
                              isSubmitting
                            }
                            className="bg-gradient-to-r from-bright-blue to-teal-blue hover:from-bright-blue/90 hover:to-teal-blue/90 text-white disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-xl transition-all duration-300 hover-lift focus:outline-none"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {methods.formState.isSubmitting || isSubmitting ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                Complete Registration
                                <CheckCircle className="w-5 h-5 ml-2" />
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button
                            onClick={nextStep}
                            disabled={
                              methods.formState.isSubmitting || isSubmitting
                            }
                            className="bg-gradient-to-r from-bright-blue to-teal-blue hover:from-bright-blue/90 hover:to-teal-blue/90 text-white disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-xl transition-all duration-300 hover-lift focus:outline-none"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            Next Step
                            <ChevronRight className="w-5 h-5 ml-2" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </FormProvider>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
