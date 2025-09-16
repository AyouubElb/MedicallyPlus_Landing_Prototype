import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { FormData } from "./types";
import { SPECIALTIES, EXPERIENCE_OPTIONS, URGENCY_OPTIONS } from "./constants";
import { Controller, useFormContext } from "react-hook-form";

export function ProfessionalInfoStep({
  showStepErrors,
}: {
  showStepErrors: boolean;
}) {
  const {
    control,
    formState: { errors, touchedFields },
    watch,
  } = useFormContext<FormData>();
  const userType = watch("userType");

  return (
    <div className="space-y-6">
      {userType === "provider" ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="organization"
              className="text-deep-black font-semibold"
            >
              Organization/Hospital *
            </Label>
            <Controller
              name="organization"
              control={control}
              render={({ field }) => (
                <Input
                  id="organization"
                  placeholder="Your workplace"
                  {...field}
                  className="border-2 border-gray-200 focus:border-bright-blue rounded-xl p-4 focus:outline-none"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                />
              )}
            />
            {errors.organization &&
              (showStepErrors || touchedFields.organization) && (
                <p className="text-red-600">{errors.organization.message}</p>
              )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="specialty"
              className="text-deep-black font-semibold"
            >
              Medical Specialty *
            </Label>
            <Controller
              name="specialty"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className="border-2 border-gray-200 focus:border-bright-blue rounded-xl p-4 focus:outline-none"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <SelectValue placeholder="Select your specialty" />
                  </SelectTrigger>
                  <SelectContent style={{ fontFamily: "Poppins, sans-serif" }}>
                    {SPECIALTIES.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.specialty &&
              (showStepErrors || touchedFields.specialty) && (
                <p className="text-red-600">{errors.specialty.message}</p>
              )}
          </div>

          {/*Experience */}
          <div className="md:col-span-2 space-y-2">
            <Label className="text-deep-black font-semibold">
              Years of Experience *
            </Label>
            <Controller
              name="experience"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {EXPERIENCE_OPTIONS.map((option) => (
                    <div key={option} className="relative">
                      <RadioGroupItem
                        value={option}
                        id={option}
                        className="peer"
                      />
                      <Label
                        htmlFor={option}
                        className="block p-4 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-teal-blue hover:bg-teal-blue/5 peer-checked:border-teal-blue peer-checked:bg-teal-blue/10 transition-all duration-300 text-center font-medium"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.experience &&
              (showStepErrors || touchedFields.experience) && (
                <p className="text-red-600">{errors.experience.message}</p>
              )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            {/* Condition */}
            <Label
              htmlFor="condition"
              className="text-deep-black font-semibold"
            >
              Medical Condition or Concern *
            </Label>
            <Controller
              name="condition"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="condition"
                  placeholder="Please describe your medical condition or health concern..."
                  {...field}
                  value={typeof field.value === "string" ? field.value : ""}
                  className="border-2 border-gray-200 focus:border-bright-blue rounded-xl p-4 min-h-24 focus:outline-none"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                />
              )}
            />
            {errors.condition &&
              (showStepErrors || touchedFields.condition) && (
                <p className="text-red-600">{errors.condition.message}</p>
              )}
          </div>
          {/* Urgency */}
          <div className="space-y-2">
            <Label className="text-deep-black font-semibold">
              How urgent is your need? *
            </Label>
            <Controller
              name="urgency"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {URGENCY_OPTIONS.map((option) => (
                    <div key={option.value} className="relative">
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={option.value}
                        className={`block p-6 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-${option.color} hover:bg-${option.color}/5 peer-checked:border-${option.color} peer-checked:bg-${option.color}/10 transition-all duration-300`}
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        <div className="text-center">
                          <div className="font-bold text-deep-black mb-1">
                            {option.label}
                          </div>
                          <div className="text-sm text-shadow-gray">
                            {option.desc}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.urgency && (showStepErrors || touchedFields.urgency) && (
              <p className="text-red-600">{errors.urgency.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
