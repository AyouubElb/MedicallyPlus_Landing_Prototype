import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCircle, Zap, Users, Globe, Brain, Heart, Shield, Star, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function OurPromiseSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPromise, setCurrentPromise] = useState(0);
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

  // Auto-rotate through promises
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentPromise((prev) => (prev + 1) % promises.length);
      }, 4000);
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
    scrollToSection('features');
  };

  const promises = [
    {
      icon: Brain,
      title: "AI-Powered Precision",
      description: "Our advanced AI analyzes symptoms, medical history, and global expertise to match you with the perfect specialist in under 30 seconds.",
      color: "text-bright-blue",
      bgColor: "bg-bright-blue/10",
      gradient: "from-bright-blue to-bright-blue/80"
    },
    {
      icon: Globe,
      title: "Borderless Healthcare",
      description: "Access world-class medical expertise from 50+ countries, breaking down geographical barriers to quality healthcare.",
      color: "text-teal-blue",
      bgColor: "bg-teal-blue/10",
      gradient: "from-teal-blue to-teal-blue/80"
    },
    {
      icon: Heart,
      title: "Personalized Care Journey",
      description: "Every patient receives a dedicated healthcare coordinator who manages your entire medical journey from consultation to recovery.",
      color: "text-medical-red",
      bgColor: "bg-medical-red/10",
      gradient: "from-medical-red to-medical-red/80"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and HIPAA compliance ensure your medical data remains completely private and secure.",
      color: "text-accent-red",
      bgColor: "bg-accent-red/10",
      gradient: "from-accent-red to-accent-red/80"
    }
  ];

  const outcomes = [
    { icon: Users, value: "10x", label: "Faster specialist access", color: "text-bright-blue" },
    { icon: Globe, value: "50+", label: "Countries connected", color: "text-teal-blue" },
    { icon: CheckCircle, value: "98%", label: "Patient satisfaction", color: "text-medical-red" },
    { icon: Star, value: "24/7", label: "Global support", color: "text-accent-red" }
  ];

  const currentPromiseData = promises[currentPromise];

  return (
    <section 
      ref={sectionRef}
      id="our-promise" 
      className="py-20 bg-gradient-to-br from-white via-bright-blue/2 to-teal-blue/3 relative overflow-hidden"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(10)].map((_, i) => {
          const colors = ['bg-bright-blue', 'bg-teal-blue', 'bg-medical-red', 'bg-accent-red'];
          return (
            <div
              key={i}
              className={`absolute w-20 h-20 rounded-full ${colors[i % 4]} animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 1.8}s`,
                animationDuration: `${8 + Math.random() * 6}s`
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
          <div className="inline-flex items-center gap-3 bg-teal-blue/10 px-8 py-4 rounded-full mb-10">
            <Sparkles className="w-6 h-6 text-teal-blue" />
            <span className="text-teal-blue font-bold text-lg">Our Promise</span>
          </div>
          
          <h2 className="text-4xl lg:text-7xl font-bold text-deep-black mb-10 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Revolutionary Healthcare
            <span className="text-teal-blue block bg-gradient-to-r from-teal-blue to-bright-blue bg-clip-text text-transparent">
              That Works
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-shadow-gray max-w-4xl mx-auto leading-relaxed font-medium">
            We're not just connecting doctors and patients – we're revolutionizing global healthcare delivery 
            through cutting-edge AI, seamless coordination, and unwavering commitment to quality care.
          </p>
        </div>

        {/* Interactive Promise Showcase */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Promise Content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-20 h-20 rounded-2xl ${currentPromiseData.bgColor} flex items-center justify-center relative overflow-hidden group`}>
                <currentPromiseData.icon className={`w-10 h-10 ${currentPromiseData.color} relative z-10`} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div>
                <Badge variant="secondary" className={`${currentPromiseData.bgColor} ${currentPromiseData.color} font-semibold`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Promise {currentPromise + 1} of {promises.length}
                </Badge>
                <div className="flex items-center gap-2 mt-2">
                  {promises.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPromise(index)}
                      className={`h-2 rounded-full transition-all duration-500 focus:outline-none ${
                        index === currentPromise ? 'w-8 bg-bright-blue' : 'w-2 bg-shadow-gray/30 hover:bg-shadow-gray/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <h3 className="text-3xl lg:text-4xl font-bold text-deep-black leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {currentPromiseData.title}
            </h3>
            
            <p className="text-xl text-shadow-gray leading-relaxed font-medium">
              {currentPromiseData.description}
            </p>

            {/* Key Benefits */}
            <div className="space-y-4">
              {[
                "Instant AI-powered specialist matching",
                "Global network of verified healthcare providers",
                "End-to-end care coordination and follow-up",
                "Multilingual support and cultural sensitivity"
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-bright-blue to-teal-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-deep-black font-medium leading-relaxed group-hover:text-bright-blue transition-colors duration-300">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-accent-red to-medical-red hover:from-accent-red/90 hover:to-medical-red/90 text-white px-8 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold group focus:outline-none"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                onClick={handleLearnMore}
                variant="outline"
                className="border-2 border-bright-blue text-bright-blue hover:bg-bright-blue hover:text-white px-8 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold focus:outline-none"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Explore Features
              </Button>
            </div>
          </div>

          {/* Visual Promise Demo */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <Card className={`${currentPromiseData.bgColor.replace('/10', '/5')} border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden relative`}>
              <CardContent className="p-12 relative z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <div className="text-center space-y-8">
                  {/* Promise Icon */}
                  <div className={`w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br ${currentPromiseData.gradient} text-white flex items-center justify-center relative group cursor-pointer hover-lift`}>
                    <currentPromiseData.icon className="w-16 h-16" />
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 rounded-3xl bg-white/20 animate-ping"></div>
                  </div>

                  {/* Demo Content */}
                  <div className="space-y-6">
                    <h4 className="text-2xl font-bold text-deep-black">
                      {currentPromiseData.title}
                    </h4>
                    
                    {/* Mock Interface Elements */}
                    <div className="space-y-4">
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover-lift cursor-pointer">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-semibold text-shadow-gray">System Active</span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-bright-blue/20 rounded-full overflow-hidden">
                            <div className="h-full bg-bright-blue rounded-full w-4/5 animate-pulse"></div>
                          </div>
                          <div className="h-2 bg-teal-blue/20 rounded-full overflow-hidden">
                            <div className="h-full bg-teal-blue rounded-full w-3/5 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 hover-lift cursor-pointer">
                          <div className="text-2xl font-bold text-bright-blue">Active</div>
                          <div className="text-xs text-shadow-gray font-medium">Status</div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 hover-lift cursor-pointer">
                          <div className="text-2xl font-bold text-teal-blue">Live</div>
                          <div className="text-xs text-shadow-gray font-medium">System</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Outcome Statistics */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {outcomes.map((outcome, index) => {
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
                      <outcome.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <div className={`text-3xl lg:text-4xl font-bold ${outcome.color} mb-2`}>
                        {outcome.value}
                      </div>
                      <p className="text-sm text-shadow-gray font-medium">
                        {outcome.label}
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
          <Card className="bg-gradient-to-r from-bright-blue via-teal-blue to-bright-blue text-white border-0 shadow-2xl inline-block max-w-4xl relative overflow-hidden">
            <CardContent className="p-12 relative z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <div className="space-y-8">
                <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Zap className="w-10 h-10 text-white animate-pulse" />
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold">
                  Ready to Experience Healthcare Without Borders?
                </h3>
                
                <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
                  Join thousands of patients and healthcare providers who are already experiencing 
                  the future of global healthcare coordination.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleGetStarted}
                    className="bg-accent-red hover:bg-accent-red/90 text-white px-10 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold text-lg group focus:outline-none"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Get Started Now
                    <Heart className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
                  </Button>
                  <Button 
                    onClick={handleLearnMore}
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-bright-blue px-10 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold text-lg focus:outline-none"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>

            {/* Background animation */}
            <div className="absolute inset-0 opacity-5">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-24 h-24 rounded-full bg-white animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 2}s`,
                    animationDuration: `${10 + Math.random() * 8}s`
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