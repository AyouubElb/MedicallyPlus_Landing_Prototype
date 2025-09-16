import {
  User,
  Stethoscope,
  FileText,
  Star,
  CheckCircle,
  Globe,
  Heart,
} from "lucide-react";

export const FORM_STEPS = [
  {
    id: "user-type",
    title: "Tell Us About You",
    subtitle: "Are you a healthcare provider or patient?",
    icon: User,
    color: "text-bright-blue",
    bgColor: "bg-bright-blue/10",
    fields: ["userType"],
  },
  {
    id: "basic-info",
    title: "Basic Information",
    subtitle: "Help us personalize your experience",
    icon: FileText,
    color: "text-teal-blue",
    bgColor: "bg-teal-blue/10",
    fields: ["fullName", "email", "phone", "country"],
  },
  {
    id: "professional-info",
    title: "Professional Details",
    subtitle: "Tell us about your healthcare focus",
    icon: Stethoscope,
    color: "text-medical-red",
    bgColor: "bg-medical-red/10",
    fields: ["organization", "specialty", "experience", "condition", "urgency"],
  },
  {
    id: "goals",
    title: "Your Goals",
    subtitle: "What do you hope to achieve?",
    icon: Star,
    color: "text-accent-red",
    bgColor: "bg-accent-red/10",
    fields: ["goals"],
  },
  {
    id: "confirmation",
    title: "Almost Done!",
    subtitle: "Review and confirm your information",
    icon: CheckCircle,
    color: "text-bright-blue",
    bgColor: "bg-bright-blue/10",
    fields: ["consent"],
  },
];

export const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Singapore",
  "Japan",
  "Australia",
  "Brazil",
  "Mexico",
  "India",
  "South Africa",
  "Nigeria",
  "Other",
];

export const SPECIALTIES = [
  "Cardiology",
  "Neurology",
  "Oncology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Gynecology",
  "Ophthalmology",
  "Radiology",
  "Surgery",
  "Emergency Medicine",
  "Family Medicine",
  "Internal Medicine",
  "Other",
];

export const GOAL_OPTIONS = [
  { id: "second-opinion", label: "Get Second Opinions", icon: Stethoscope },
  { id: "specialist-access", label: "Access Global Specialists", icon: Globe },
  { id: "collaborate", label: "Collaborate with Peers", icon: User },
  { id: "continuing-education", label: "Continuing Education", icon: FileText },
  { id: "research", label: "Medical Research", icon: Star },
  { id: "patient-care", label: "Improve Patient Outcomes", icon: Heart },
];

export const EXPERIENCE_OPTIONS = [
  "<2 years",
  "2-5 years",
  "5-10 years",
  "10+ years",
];

export const URGENCY_OPTIONS = [
  {
    value: "immediate",
    label: "Immediate",
    desc: "Within 24 hours",
    color: "medical-red",
  },
  {
    value: "urgent",
    label: "Urgent",
    desc: "Within 1 week",
    color: "accent-red",
  },
  {
    value: "routine",
    label: "Routine",
    desc: "Within 1 month",
    color: "teal-blue",
  },
];
