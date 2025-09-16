import { Card, CardContent } from "./ui/card";
import { Brain, Video, BarChart3, Lock, Clock, Heart, Stethoscope, Shield } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI Symptom Checker",
      description: "Get instant, accurate symptom analysis powered by advanced AI technology. Receive preliminary insights before your consultation to save time and reduce anxiety.",
      benefits: ["95% accuracy rate", "Instant results", "Reduces wait time"]
    },
    {
      icon: Video,
      title: "24/7 Telehealth Appointments",
      description: "Connect with board-certified doctors anytime, anywhere. No more waiting rooms or scheduling conflicts - get the care you need when you need it.",
      benefits: ["Available 24/7", "Board-certified doctors", "No travel required"]
    },
    {
      icon: BarChart3,
      title: "Personalized Health Dashboard",
      description: "Track your health metrics, medication reminders, and progress over time. Your comprehensive health story in one secure, easy-to-understand platform.",
      benefits: ["Track progress", "Medication reminders", "Health insights"]
    },
    {
      icon: Lock,
      title: "Secure Data Privacy",
      description: "Your health data is protected with bank-level security and HIPAA compliance. Complete privacy and security you can trust.",
      benefits: ["HIPAA compliant", "End-to-end encryption", "Your data stays private"]
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            Comprehensive Healthcare at Your Fingertips
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of healthcare with our AI-powered platform designed to make quality care accessible, personalized, and convenient.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Benefits */}
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Trust Signals */}
        <div className="mt-20 pt-16 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm">Average 2-min wait</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-sm">98% satisfaction rate</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <Stethoscope className="w-5 h-5 text-primary" />
              <span className="text-sm">500+ specialists</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm">ISO 27001 certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}