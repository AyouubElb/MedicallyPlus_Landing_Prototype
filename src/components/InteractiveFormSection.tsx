import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { ChevronLeft, ChevronRight, Calendar, Mail, CheckCircle, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { UserTypeStep } from "./form/UserTypeStep";
import { BasicInfoStep } from "./form/BasicInfoStep";
import { ProfessionalInfoStep } from "./form/ProfessionalInfoStep";
import { GoalsStep } from "./form/GoalsStep";
import { ConfirmationStep } from "./form/ConfirmationStep";

import { FORM_STEPS } from "./form/constants";
import { FormData } from "./form/types";
import { scrollToSection, isStepValid, getInitialFormData } from "./form/utils";

export function InteractiveFormSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>(getInitialFormData());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    scrollToSection('home');
  };

  const handleExploreFeatures = () => {
    scrollToSection('features');
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGoalToggle = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const nextStep = () => {
    if (currentStep < FORM_STEPS.length - 1 && isStepValid(currentStep, formData)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid(currentStep, formData)) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / FORM_STEPS.length) * 100;
  const currentStepData = FORM_STEPS[currentStep];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <UserTypeStep formData={formData} onInputChange={handleInputChange} />;
      case 1:
        return <BasicInfoStep formData={formData} onInputChange={handleInputChange} />;
      case 2:
        return <ProfessionalInfoStep formData={formData} onInputChange={handleInputChange} />;
      case 3:
        return <GoalsStep formData={formData} onGoalToggle={handleGoalToggle} />;
      case 4:
        return <ConfirmationStep formData={formData} onInputChange={handleInputChange} />;
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <section 
        ref={sectionRef}
        id="interactive-form" 
        className="py-20 bg-gradient-to-br from-bright-blue/3 via-white to-teal-blue/3 relative overflow-hidden"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-white border-0 shadow-2xl relative overflow-hidden">
            <CardContent className="p-16" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <div className="space-y-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-bright-blue to-teal-blue rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-16 h-16 text-white" />
                </div>

                <div className="space-y-6">
                  <h2 className="text-4xl lg:text-5xl font-bold text-deep-black">
                    Welcome to MedicallyPlus!
                  </h2>
                  
                  <p className="text-xl text-shadow-gray leading-relaxed max-w-2xl mx-auto font-medium">
                    Thank you for joining our global healthcare community. We're processing your information 
                    and will send you personalized access details within 24 hours.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-bright-blue/5 to-teal-blue/5 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-deep-black mb-6">What Happens Next?</h3>
                  <div className="grid md:grid-cols-3 gap-6 text-left">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-bright-blue rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-deep-black">Check Your Email</div>
                        <div className="text-sm text-shadow-gray">Personalized onboarding guide sent to your inbox</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-teal-blue rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-deep-black">Schedule Demo</div>
                        <div className="text-sm text-shadow-gray">Optional 1-on-1 platform walkthrough</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-medical-red rounded-xl flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-deep-black">Start Exploring</div>
                        <div className="text-sm text-shadow-gray">Access your personalized dashboard</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                  <Button 
                    onClick={handleBackToHome}
                    className="bg-gradient-to-r from-bright-blue to-teal-blue hover:from-bright-blue/90 hover:to-teal-blue/90 text-white px-10 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold focus:outline-none"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Back to Home
                  </Button>
                  <Button 
                    onClick={handleExploreFeatures}
                    variant="outline"
                    className="border-2 border-bright-blue text-bright-blue hover:bg-bright-blue hover:text-white px-10 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold focus:outline-none"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Explore Features
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      id="interactive-form" 
      className="py-20 bg-gradient-to-br from-bright-blue/3 via-white to-teal-blue/3 relative overflow-hidden"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(6)].map((_, i) => {
          const colors = ['bg-bright-blue', 'bg-teal-blue', 'bg-medical-red'];
          return (
            <div
              key={i}
              className={`absolute w-24 h-24 rounded-full ${colors[i % 3]} animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 3}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-3 bg-bright-blue/10 px-8 py-4 rounded-full mb-8">
            <Sparkles className="w-6 h-6 text-bright-blue" />
            <span className="text-bright-blue font-bold text-lg">Get Started</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-deep-black mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Join the Healthcare
            <span className="text-bright-blue block bg-gradient-to-r from-bright-blue to-teal-blue bg-clip-text text-transparent">
              Revolution
            </span>
          </h2>
          
          <p className="text-xl text-shadow-gray max-w-2xl mx-auto leading-relaxed font-medium">
            Complete our smart questionnaire to get personalized access to our 
            AI-powered global healthcare platform.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-shadow-gray">Step {currentStep + 1} of {FORM_STEPS.length}</span>
            <span className="text-sm font-semibold text-bright-blue">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3 bg-gray-200">
            <div 
              className="h-full bg-gradient-to-r from-bright-blue to-teal-blue rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </Progress>
          
          {/* Step indicators */}
          <div className="flex justify-between mt-6">
            {FORM_STEPS.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  index <= currentStep 
                    ? `${step.bgColor} ${step.color} border-current` 
                    : 'bg-gray-100 text-shadow-gray border-gray-300'
                }`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <span className={`text-xs mt-2 font-medium text-center max-w-16 ${
                  index <= currentStep ? step.color : 'text-shadow-gray'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <div className="space-y-8">
              {/* Step Header */}
              <div className="text-center space-y-4">
                <div className={`w-20 h-20 mx-auto rounded-2xl ${currentStepData.bgColor} flex items-center justify-center`}>
                  <currentStepData.icon className={`w-10 h-10 ${currentStepData.color}`} />
                </div>
                <h3 className="text-3xl font-bold text-deep-black">
                  {currentStepData.title}
                </h3>
                <p className="text-lg text-shadow-gray font-medium">
                  {currentStepData.subtitle}
                </p>
              </div>

              {/* Step Content */}
              <div className="space-y-6">
                {renderStepContent()}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8 border-t border-shadow-gray/20">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  disabled={currentStep === 0}
                  className="border-2 border-shadow-gray text-shadow-gray hover:border-bright-blue hover:text-bright-blue disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-xl transition-all duration-300 focus:outline-none"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>

                <div className="text-center">
                  <Badge variant="secondary" className="bg-bright-blue/10 text-bright-blue font-semibold px-6 py-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Step {currentStep + 1} of {FORM_STEPS.length}
                  </Badge>
                </div>

                {currentStep === FORM_STEPS.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!isStepValid(currentStep, formData) || isSubmitting}
                    className="bg-gradient-to-r from-bright-blue to-teal-blue hover:from-bright-blue/90 hover:to-teal-blue/90 text-white disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-xl transition-all duration-300 hover-lift focus:outline-none"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {isSubmitting ? (
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
                    disabled={!isStepValid(currentStep, formData)}
                    className="bg-gradient-to-r from-bright-blue to-teal-blue hover:from-bright-blue/90 hover:to-teal-blue/90 text-white disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-xl transition-all duration-300 hover-lift focus:outline-none"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Next Step
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}