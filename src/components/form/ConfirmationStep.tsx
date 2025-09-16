import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import type { FormData } from "./types";

export function ConfirmationStep({
  showStepErrors,
}: {
  showStepErrors: boolean;
}) {
  const {
    control,
    formState: { errors, touchedFields },
    watch,
  } = useFormContext<FormData>();

  const watchedFields = watch([
    "userType",
    "fullName",
    "email",
    "country",
    "specialty",
    "goals",
    "consent",
    "newsletter",
  ]);
  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="bg-gradient-to-r from-bright-blue/5 to-teal-blue/5 rounded-2xl p-8">
        <h4 className="text-xl font-bold text-deep-black mb-6">
          Review Your Information
        </h4>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <span className="font-semibold text-shadow-gray">User Type:</span>
            <div className="text-deep-black capitalize">{watchedFields[0]}</div>
          </div>
          <div>
            <span className="font-semibold text-shadow-gray">Name:</span>
            <div className="text-deep-black">{watchedFields[1]}</div>
          </div>
          <div>
            <span className="font-semibold text-shadow-gray">Email:</span>
            <div className="text-deep-black">{watchedFields[2]}</div>
          </div>
          <div>
            <span className="font-semibold text-shadow-gray">Country:</span>
            <div className="text-deep-black">{watchedFields[3]}</div>
          </div>
          {watchedFields[4] && (
            <div>
              <span className="font-semibold text-shadow-gray">Specialty:</span>
              <div className="text-deep-black">{watchedFields[4]}</div>
            </div>
          )}
          <div>
            <span className="font-semibold text-shadow-gray">Goals:</span>
            <div className="text-deep-black">
              {watchedFields[5].length} selected
            </div>
          </div>
        </div>
      </div>

      {/* Consent */}
      <div className="space-y-4">
        <Controller
          control={control}
          name="consent"
          render={({ field }) => (
            <div className="flex items-start gap-4">
              <Checkbox
                id="consent"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mt-1"
              />
              <Label
                htmlFor="consent"
                className="text-sm text-deep-black leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                I agree to MedicallyPlus Terms of Service and Privacy Policy. I
                understand that this platform is for healthcare coordination and
                does not replace emergency medical care. *
              </Label>
            </div>
          )}
        />
        {errors.consent && (showStepErrors || touchedFields.consent) && (
          <p className="text-red-600">{errors.consent.message}</p>
        )}

        {/* Newsletter optional */}
        <Controller
          control={control}
          name="newsletter"
          render={({ field }) => (
            <div className="flex items-start gap-4">
              <Checkbox
                id="newsletter"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mt-1"
              />
              <Label
                htmlFor="newsletter"
                className="text-sm text-shadow-gray leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                I'd like to receive updates about new features, healthcare
                insights, and platform improvements.
              </Label>
            </div>
          )}
        />
      </div>
    </div>
  );
}
