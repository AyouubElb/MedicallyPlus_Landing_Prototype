import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { FormData } from "./types";
import { COUNTRIES } from "./constants";
import { Controller, useFormContext } from "react-hook-form";

export function BasicInfoStep({ showStepErrors }: { showStepErrors: boolean }) {
  const {
    control,
    formState: { errors, touchedFields },
  } = useFormContext<FormData>();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-deep-black font-semibold">
          Full Name *
        </Label>

        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="fullName"
              placeholder="Enter your full name"
              className="border-2 border-gray-200 focus:border-bright-blue rounded-xl p-4 focus:outline-none"
              style={{ fontFamily: "Poppins, sans-serif" }}
            />
          )}
        />
        {errors.fullName && (showStepErrors || touchedFields.fullName) && (
          <p className="text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-deep-black font-semibold">
          Email Address *
        </Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="border-2 border-gray-200 focus:border-bright-blue rounded-xl p-4 focus:outline-none"
              style={{ fontFamily: "Poppins, sans-serif" }}
            />
          )}
        />
        {errors.email && (showStepErrors || touchedFields.email) && (
          <p className="text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-deep-black font-semibold">
          Phone Number
        </Label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="border-2 border-gray-200 focus:border-bright-blue rounded-xl p-4 focus:outline-none"
              style={{ fontFamily: "Poppins, sans-serif" }}
            />
          )}
        />
        {errors.phone && (showStepErrors || touchedFields.phone) && (
          <p className="text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="country" className="text-deep-black font-semibold">
          Country *
        </Label>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                className="border-2 border-gray-200 focus:border-bright-blue rounded-xl p-4 focus:outline-none"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent style={{ fontFamily: "Poppins, sans-serif" }}>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.country && (showStepErrors || touchedFields.country) && (
          <p className="text-red-600">{errors.country.message}</p>
        )}
      </div>
    </div>
  );
}
