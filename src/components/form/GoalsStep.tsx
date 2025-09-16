import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { CheckCircle } from "lucide-react";
import type { FormData } from "./types";
import { GOAL_OPTIONS } from "./constants";
import { Controller, useFormContext } from "react-hook-form";

export function GoalsStep({ showStepErrors }: { showStepErrors: boolean }) {
  const {
    control,
    formState: { errors, touchedFields },
  } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <Controller
        control={control}
        name="goals"
        render={({ field }) => (
          <div className="grid md:grid-cols-2 gap-4">
            {GOAL_OPTIONS.map((goal) => {
              const checked = field.value.includes(goal.id);
              return (
                <div key={goal.id} className="relative">
                  <Checkbox
                    id={goal.id}
                    checked={checked}
                    onCheckedChange={(val) => {
                      let newValue = [...field.value];
                      if (val) {
                        if (!newValue.includes(goal.id)) newValue.push(goal.id);
                      } else {
                        newValue = newValue.filter((g) => g !== goal.id);
                      }
                      field.onChange(newValue);
                    }}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={goal.id}
                    className="flex items-center gap-4 p-6 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-bright-blue hover:bg-bright-blue/5 peer-checked:border-bright-blue peer-checked:bg-bright-blue/10 transition-all duration-300 hover-lift"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <div className="w-12 h-12 bg-bright-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <goal.icon className="w-6 h-6 text-bright-blue" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-deep-black">
                        {goal.label}
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 border-2 border-gray-300 rounded-md flex items-center justify-center ${
                        checked ? "border-bright-blue bg-bright-blue" : ""
                      }`}
                    >
                      {checked && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </Label>
                </div>
              );
            })}
          </div>
        )}
      />
      {errors.goals && (showStepErrors || touchedFields.goals) && (
        <p className="text-red-600">{errors.goals.message}</p>
      )}
    </div>
  );
}
