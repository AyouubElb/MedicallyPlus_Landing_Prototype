import { Card, CardContent } from "./ui/card";
import { UserPlus, MessageSquare, Brain, FileText } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      step: "1",
      title: "Sign Up",
      description: "Create your secure account in under 2 minutes. Verify your identity and complete your health profile to get personalized care.",
      details: "Quick verification • Health profile setup • Secure registration"
    },
    {
      icon: MessageSquare,
      step: "2", 
      title: "Consult a Doctor",
      description: "Connect instantly with board-certified doctors via video, voice, or chat. Choose from our network of specialists based on your needs.",
      details: "24/7 availability • Video/voice/chat options • Specialist network"
    },
    {
      icon: Brain,
      step: "3",
      title: "Receive AI Insights",
      description: "Get AI-powered health insights and recommendations tailored to your symptoms and medical history for comprehensive care.",
      details: "Personalized insights • Medical history analysis • Treatment recommendations"
    },
    {
      icon: FileText,
      step: "4",
      title: "Follow Your Plan",
      description: "Access your personalized treatment plan, prescriptions, and follow-up care instructions through your secure health dashboard.",
      details: "Treatment plans • Digital prescriptions • Progress tracking"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-teal-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            How MedicallyPlus Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting quality healthcare has never been easier. Follow these simple steps to start your personalized health journey today.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="relative h-0.5 bg-gradient-to-r from-teal-200 via-teal-300 to-teal-200">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white">
                <CardContent className="p-8 text-center">
                  <div className="space-y-6">
                    {/* Step Number & Icon */}
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-teal-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">{step.step}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Details */}
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm text-primary">
                          {step.details}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
            <h3 className="text-2xl text-gray-900 mb-4">
              Ready to get started?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Join thousands of patients who trust MedicallyPlus for their healthcare needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg transition-colors">
                Start Free Consultation
              </button>
              <button className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg transition-colors">
                Try AI Symptom Checker
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}