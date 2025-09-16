import { FormData } from "./types";

export const scrollToSection = (targetId: string) => {
  try {
    const element = document.getElementById(targetId);

    if (element) {
      const headerHeight = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth",
      });
    } else {
      console.warn(`Element with id "${targetId}" not found`);
    }
  } catch (error) {
    console.error("Error scrolling to section:", error);
  }
};

export const isStepValid = (stepIndex: number, formData: FormData): boolean => {
  switch (stepIndex) {
    case 0:
      return formData.userType !== "";
    case 1:
      return !!(formData.fullName && formData.email && formData.country);
    case 2:
      if (formData.userType === "provider") {
        return !!(
          formData.organization &&
          formData.specialty &&
          formData.experience
        );
      } else {
        return !!(formData.condition && formData.urgency);
      }
    case 3:
      return formData.goals.length > 0;
    case 4:
      return formData.consent;
    default:
      return true;
  }
};

export const getInitialFormData = (): FormData => ({
  userType: "",
  fullName: "",
  email: "",
  phone: "",
  country: "",
  organization: "",
  specialty: "",
  experience: "",
  patientType: "",
  condition: "",
  urgency: "",
  previousTreatment: "",
  goals: [],
  consent: false,
  newsletter: true,
});
