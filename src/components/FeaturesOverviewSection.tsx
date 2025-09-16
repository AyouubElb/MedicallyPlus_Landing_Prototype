import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Brain, Globe, Shield, Zap, Clock, Users, Heart, Star, CheckCircle, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function FeaturesOverviewSection() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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

  // Auto-rotate through features
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const scrollToSection = (targetId: string) => {
    try {
      const element = document.getElementById(targetId);
      
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: elementPosition - headerHeight,
          behavior: 'smooth'
        });
      } else {
        console.warn(`Element with id "${targetId}" not found`);
      }
    } catch (error) {
      console.error('Error scrolling to section:', error);
    }
  };

  const handleGetStarted = () => {
    scrollToSection('interactive-form');
  };

  const handleLearnMore = () => {
    scrollToSection('saas-preview');
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Specialist Matching",
      description: "Revolutionary AI algorithm that analyzes patient symptoms, medical history, and preferences to match with the most qualified specialists worldwide.",
      details: [
        "98% accuracy in specialist matching",
        "Sub-30 second analysis and recommendation",
        "Considers 200+ medical specialties",
        "Factors in doctor availability and expertise"
      ],
      color: "bg-bright-blue/10 text-bright-blue",
      gradient: "from-bright-blue to-bright-blue/80",
      bgPattern: "bg-gradient-to-br from-bright-blue/5 to-teal-blue/5"
    },
    {
      icon: Globe,
      title: "Global Second Opinion Network",
      description: "Connect with world-renowned specialists across 50+ countries for comprehensive second opinions on complex medical cases.",
      details: [
        "Access to 10,000+ certified specialists",
        "Multi-language consultation support",
        "24-48 hour response guarantee",
        "Comprehensive case review and analysis"
      ],
      color: "bg-teal-blue/10 text-teal-blue",
      gradient: "from-teal-blue to-teal-blue/80",
      bgPattern: "bg-gradient-to-br from-teal-blue/5 to-bright-blue/5"
    },
    {
      icon: Heart,
      title: "Personalized Healthcare Concierge",
      description: "Dedicated healthcare coordinators who manage your entire medical journey from initial consultation to follow-up care.",
      details: [
        "Personal care coordinator assignment",
        "Appointment scheduling and management",
        "Medical record coordination",
        "Treatment plan follow-up"
      ],
      color: "bg-medical-red/10 text-medical-red",
      gradient: "from-medical-red to-medical-red/80",
      bgPattern: "bg-gradient-to-br from-medical-red/5 to-accent-red/5"
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Bank-level encryption and HIPAA-compliant infrastructure ensuring your medical data remains completely private and secure.",
      details: [
        "End-to-end encryption for all data",
        "HIPAA and GDPR compliant",
        "Multi-factor authentication",
        "Regular security audits and updates"
      ],
      color: "bg-accent-red/10 text-accent-red",
      gradient: "from-accent-red to-accent-red/80",
      bgPattern: "bg-gradient-to-br from-accent-red/5 to-medical-red/5"
    }
  ];

  const stats = [
    { icon: Users, value: "200K+", label: "Global Patients Served", color: "text-bright-blue" },
    { icon: Clock, value: "15min", label: "Average Response Time", color: "text-teal-blue" },
    { icon: Globe, value: "50+", label: "Countries Connected", color: "text-medical-red" },
    { icon: Star, value: "4.9/5", label: "Patient Satisfaction", color: "text-accent-red" }
  ];

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  const currentFeatureData = features[currentFeature];

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="py-20 bg-gradient-to-b from-bright-blue/3 via-white to-teal-blue/3 relative overflow-hidden"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(12)].map((_, i) => {
          const colors = ['bg-bright-blue', 'bg-teal-blue', 'bg-medical-red', 'bg-accent-red'];
          return (
            <div
              key={i}
              className={`absolute w-32 h-32 rounded-full ${colors[i % 4]} animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${10 + Math.random() * 8}s`
              }}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-3 bg-bright-blue/10 px-8 py-4 rounded-full mb-10">
            <Zap className="w-6 h-6 text-bright-blue" />
            <span className="text-bright-blue font-bold text-lg">Revolutionary Features</span>
          </div>
          
          <h2 className="text-4xl lg:text-7xl font-bold text-deep-black mb-10 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Advanced Healthcare
            <span className="text-bright-blue block bg-gradient-to-r from-bright-blue to-teal-blue bg-clip-text text-transparent">
              Technology Platform
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-shadow-gray max-w-4xl mx-auto leading-relaxed font-medium">
            Experience the future of healthcare with our AI-powered platform that connects patients 
            with world-class specialists, ensuring quality care is just a click away.
          </p>
        </div>

        {/* Interactive Feature Showcase */}
        <div className="relative mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Feature Content */}
            <div className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-20 h-20 rounded-2xl ${currentFeatureData.color} flex items-center justify-center relative overflow-hidden group`}>
                  <currentFeatureData.icon className="w-10 h-10 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div>
                  <span className="text-sm font-bold text-shadow-gray uppercase tracking-wider">
                    Feature {currentFeature + 1} of {features.length}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    {features.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          index === currentFeature ? 'w-8 bg-bright-blue' : 'w-3 bg-shadow-gray/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-deep-black leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {currentFeatureData.title}
              </h3>
              
              <p className="text-xl text-shadow-gray leading-relaxed font-medium">
                {currentFeatureData.description}
              </p>

              {/* Feature Details */}
              <div className="space-y-4">
                {currentFeatureData.details.map((detail, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-bright-blue to-teal-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-deep-black font-medium leading-relaxed group-hover:text-bright-blue transition-colors duration-300">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-4 pt-6">
                <Button
                  onClick={prevFeature}
                  variant="outline"
                  size="sm"
                  className="w-12 h-12 rounded-full border-2 border-bright-blue text-bright-blue hover:bg-bright-blue hover:text-white transition-all duration-300 focus:outline-none"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  onClick={nextFeature}
                  variant="outline"
                  size="sm"
                  className="w-12 h-12 rounded-full border-2 border-bright-blue text-bright-blue hover:bg-bright-blue hover:text-white transition-all duration-300 focus:outline-none"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
                <div className="h-8 w-px bg-shadow-gray/30 mx-2"></div>
                <Button
                  onClick={handleLearnMore}
                  className="bg-gradient-to-r from-bright-blue to-teal-blue hover:from-bright-blue/90 hover:to-teal-blue/90 text-white px-8 py-3 rounded-xl transition-all duration-300 hover-lift font-semibold focus:outline-none"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Visual Feature Demo */}
            <div className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <Card className={`${currentFeatureData.bgPattern} border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden`}>
                <CardContent className="p-12 relative" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <div className="text-center space-y-8">
                    {/* Feature Icon */}
                    <div className={`w-32 h-32 mx-auto rounded-3xl ${currentFeatureData.color} flex items-center justify-center relative group cursor-pointer`}>
                      <currentFeatureData.icon className="w-16 h-16 group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {/* Pulsing ring */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-bright-blue/20 to-teal-blue/20 animate-ping"></div>
                    </div>

                    {/* Demo Content */}
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-deep-black">
                        {currentFeatureData.title}
                      </h4>
                      
                      {/* Mock Interface Elements */}
                      <div className="space-y-4">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-semibold text-shadow-gray">Live Processing</span>
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 bg-bright-blue/20 rounded-full overflow-hidden">
                              <div className="h-full bg-bright-blue rounded-full w-3/4 animate-pulse"></div>
                            </div>
                            <div className="h-2 bg-teal-blue/20 rounded-full overflow-hidden">
                              <div className="h-full bg-teal-blue rounded-full w-1/2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                            <div className="text-2xl font-bold text-bright-blue">98%</div>
                            <div className="text-xs text-shadow-gray font-medium">Accuracy</div>
                          </div>
                          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                            <div className="text-2xl font-bold text-teal-blue">24/7</div>
                            <div className="text-xs text-shadow-gray font-medium">Available</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Success Statistics */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const gradientClasses = [
              'from-bright-blue to-bright-blue/80',
              'from-teal-blue to-teal-blue/80',
              'from-medical-red to-medical-red/80',
              'from-accent-red to-accent-red/80'
            ];
            
            return (
              <Card 
                key={index} 
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 group hover-lift cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <div className="space-y-4">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${gradientClasses[index]} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <div className={`text-3xl lg:text-4xl font-bold ${stat.color} mb-2`}>
                        {stat.value}
                      </div>
                      <p className="text-sm text-shadow-gray font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-bright-blue via-teal-blue to-bright-blue text-white border-0 shadow-2xl inline-block relative overflow-hidden">
            <CardContent className="p-12 relative z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <div className="space-y-8">
                <h3 className="text-3xl lg:text-4xl font-bold">
                  Ready to Experience the Future of Healthcare?
                </h3>
                
                <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
                  Join thousands of patients worldwide who have already discovered better health outcomes 
                  through our revolutionary AI-powered platform.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleGetStarted}
                    className="bg-accent-red hover:bg-accent-red/90 text-white px-10 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold text-lg group focus:outline-none"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Get Started Today
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                  <Button 
                    onClick={handleLearnMore}
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-bright-blue px-10 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold text-lg focus:outline-none"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    View Platform Demo
                  </Button>
                </div>
              </div>
            </CardContent>
            
            {/* Background animation */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-40 h-40 rounded-full bg-white animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 2}s`,
                    animationDuration: `${8 + Math.random() * 6}s`
                  }}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}