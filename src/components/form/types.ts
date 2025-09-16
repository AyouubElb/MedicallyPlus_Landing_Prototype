import z from "zod";

const providerSchema = z.object({
  userType: z.literal("provider"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number must be at least 7 characters"),
  country: z.string().min(1, "Please select a country"),
  organization: z.string().min(2, "Organization must be at least 2 characters"),
  specialty: z.string().min(1, "Please select a specialty"),
  experience: z.string().min(1, "Please select your experience level"),
  goals: z.array(z.string().min(1, "Please select at least one goal")),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  newsletter: z.boolean().optional(),
});

const patientSchema = z.object({
  userType: z.literal("patient"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number must be at least 7 characters"),
  country: z.string().min(1, "Please select a country"),
  condition: z.string().min(2, "Condition must be at least 2 characters"),
  urgency: z.string().min(1, "Please select the urgency level"),
  goals: z.array(z.string().min(1, "Please select at least one goal")),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  newsletter: z.boolean().optional(),
});

export const FormSchema = z.discriminatedUnion("userType", [
  providerSchema,
  patientSchema,
]);

export type FormData = z.infer<typeof FormSchema>;

export const PROVIDER_REQUIRED_FIELDS = [
  "userType",
  "fullName",
  "email",
  "phone",
  "country",
  "organization",
  "specialty",
  "experience",
  "goals",
  "consent",
];

export const PATIENT_REQUIRED_FIELDS = [
  "userType",
  "fullName",
  "email",
  "phone",
  "country",
  "condition",
  "urgency",
  "goals",
  "consent",
];

export interface FormStep {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  bgColor: string;
}
