import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Play, Monitor, Smartphone, Tablet, Users, BarChart, Calendar, MessageCircle, Settings, Bell, Search, Filter, Download, Share, Eye, ChevronRight, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function SaaSPreviewSection() {
  const [activeView, setActiveView] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState(0);
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

  // Auto-rotate through views
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveView((prev) => (prev + 1) % platforms.length);
      }, 6000);
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

  const handleWatchDemo = () => {
    // Simulate video demo play
    setSelectedDemo((prev) => (prev + 1) % demoScreens.length);
  };

  const handleGetAccess = () => {
    scrollToSection('interactive-form');
  };

  const handleRequestDemo = () => {
    scrollToSection('interactive-form');
  };

  const platforms = [
    {
      icon: Monitor,
      name: "Desktop Dashboard",
      description: "Comprehensive patient and provider management",
      color: "text-bright-blue",
      bgColor: "bg-bright-blue/10"
    },
    {
      icon: Tablet,
      name: "Tablet Interface",
      description: "Optimized for healthcare professionals on-the-go",
      color: "text-teal-blue", 
      bgColor: "bg-teal-blue/10"
    },
    {
      icon: Smartphone,
      name: "Mobile App",
      description: "Patient-focused mobile experience",
      color: "text-medical-red",
      bgColor: "bg-medical-red/10"
    }
  ];

  const demoScreens = [
    {
      title: "Patient Dashboard",
      description: "Comprehensive view of patient health journey",
      features: ["Real-time health metrics", "Upcoming appointments", "Treatment progress", "Communication hub"]
    },
    {
      title: "AI Specialist Matching",
      description: "Advanced matching algorithm in action",
      features: ["Symptom analysis", "Specialist recommendations", "Availability checking", "Instant booking"]
    },
    {
      title: "Provider Network",
      description: "Global healthcare provider ecosystem",
      features: ["Global specialist directory", "Verified credentials", "Patient reviews", "Real-time availability"]
    }
  ];

  const keyFeatures = [
    {
      icon: Users,
      title: "Multi-User Management",
      description: "Support for patients, providers, and administrators with role-based access control."
    },
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description: "Comprehensive health insights and predictive analytics powered by machine learning."
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI-optimized appointment scheduling considering time zones, availability, and urgency."
    },
    {
      icon: MessageCircle,
      title: "Secure Communication",
      description: "HIPAA-compliant messaging system for seamless patient-provider communication."
    },
    {
      icon: Settings,
      title: "Customizable Workflows",
      description: "Adaptable platform that configures to your organization's specific healthcare processes."
    },
    {
      icon: Bell,
      title: "Intelligent Notifications",
      description: "Smart alert system that prioritizes critical information and reduces notification fatigue."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="saas-preview" 
      className="py-20 bg-gradient-to-b from-white via-teal-blue/3 to-bright-blue/3 relative overflow-hidden"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(10)].map((_, i) => {
          const colors = ['bg-bright-blue', 'bg-teal-blue', 'bg-medical-red'];
          return (
            <div
              key={i}
              className={`absolute w-20 h-20 rounded-full ${colors[i % 3]} animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${12 + Math.random() * 8}s`
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
            <Monitor className="w-6 h-6 text-teal-blue" />
            <span className="text-teal-blue font-bold text-lg">Platform Preview</span>
          </div>
          
          <h2 className="text-4xl lg:text-7xl font-bold text-deep-black mb-10 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Experience Our
            <span className="text-teal-blue block bg-gradient-to-r from-teal-blue to-bright-blue bg-clip-text text-transparent">
              Healthcare Platform
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-shadow-gray max-w-4xl mx-auto leading-relaxed mb-12 font-medium">
            Discover how our intuitive, AI-powered platform transforms healthcare delivery 
            across desktop, tablet, and mobile devices with seamless user experiences.
          </p>

          {/* Platform Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-shadow-gray/20">
              <div className="flex gap-2">
                {platforms.map((platform, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveView(index)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 focus:outline-none ${
                      activeView === index 
                        ? `${platform.bgColor} ${platform.color} shadow-lg` 
                        : 'text-shadow-gray hover:text-deep-black hover:bg-gray-50'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <platform.icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-semibold">{platform.name}</div>
                      <div className="text-xs opacity-75">{platform.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Platform Demo */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Demo Video/Screenshot Area */}
          <div className={`relative transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <Card className="bg-gradient-to-br from-bright-blue to-teal-blue border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                {/* Mock Browser/App Interface */}
                <div className="bg-white p-4 border-b border-white/20">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 ml-4">
                      <span className="text-sm text-shadow-gray font-medium">medicallyplus.com/dashboard</span>
                    </div>
                  </div>
                </div>

                {/* Demo Content */}
                <div className="p-8 bg-gradient-to-br from-white to-bright-blue/5 min-h-[400px] relative">
                  {/* Demo Screen Content */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-deep-black" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {demoScreens[selectedDemo].title}
                      </h3>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="w-8 h-8 p-0 focus:outline-none">
                          <Search className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="w-8 h-8 p-0 focus:outline-none">
                          <Filter className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="w-8 h-8 p-0 focus:outline-none">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-shadow-gray font-medium">
                      {demoScreens[selectedDemo].description}
                    </p>

                    {/* Mock Data Visualization */}
                    <div className="grid grid-cols-2 gap-4">
                      {demoScreens[selectedDemo].features.map((feature, index) => {
                        const gradientClasses = [
                          'from-bright-blue to-bright-blue/80',
                          'from-teal-blue to-teal-blue/80',
                          'from-medical-red to-medical-red/80',
                          'from-accent-red to-accent-red/80'
                        ];
                        
                        return (
                          <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover-lift cursor-pointer group">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradientClasses[index % 4]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                              </div>
                              <span className="text-sm font-semibold text-deep-black group-hover:text-bright-blue transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {feature}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Mock Progress Bars */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-shadow-gray">Platform Performance</span>
                        <span className="text-bright-blue font-bold">98.5%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-bright-blue to-teal-blue rounded-full w-[98.5%] animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Video Play Overlay */}
                  <div className="absolute inset-0 bg-bright-blue/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    <Button
                      onClick={handleWatchDemo}
                      className="bg-white/90 hover:bg-white text-bright-blue px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover-lift font-semibold focus:outline-none"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <Play className="w-6 h-6 mr-3" />
                      Watch Full Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform badges */}
            <div className="flex justify-center mt-8 gap-4">
              {['Web', 'iOS', 'Android'].map((platform, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className="bg-white/80 backdrop-blur-sm text-deep-black border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white transition-colors duration-300" 
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {platform}
                </Badge>
              ))}
            </div>
          </div>

          {/* Platform Features */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold text-deep-black leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Powerful Features for
                <span className="text-teal-blue block">Every Healthcare Need</span>
              </h3>
              
              <p className="text-xl text-shadow-gray leading-relaxed font-medium">
                Our comprehensive platform provides everything healthcare providers and patients need 
                for seamless, efficient, and effective care delivery.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid gap-6">
              {keyFeatures.map((feature, index) => {
                const gradientClasses = [
                  'from-bright-blue to-bright-blue/80',
                  'from-teal-blue to-teal-blue/80',
                  'from-medical-red to-medical-red/80',
                  'from-accent-red to-accent-red/80'
                ];
                
                return (
                  <div 
                    key={index} 
                    className="flex items-start gap-6 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/80 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradientClasses[index % 4]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-deep-black mb-2 group-hover:text-bright-blue transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {feature.title}
                      </h4>
                      <p className="text-shadow-gray font-medium leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    <ChevronRight className="w-5 h-5 text-shadow-gray group-hover:text-bright-blue group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                onClick={handleGetAccess}
                className="bg-gradient-to-r from-teal-blue to-bright-blue hover:from-teal-blue/90 hover:to-bright-blue/90 text-white px-8 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold focus:outline-none"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Get Platform Access
                <Zap className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={handleRequestDemo}
                variant="outline"
                className="border-2 border-teal-blue text-teal-blue hover:bg-teal-blue hover:text-white px-8 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold focus:outline-none"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Request Live Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Users, value: "10K+", label: "Active Healthcare Providers", color: "text-bright-blue" },
            { icon: Monitor, value: "99.9%", label: "Platform Uptime", color: "text-teal-blue" },
            { icon: BarChart, value: "500M+", label: "Data Points Processed", color: "text-medical-red" },
            { icon: Bell, value: "24/7", label: "Support & Monitoring", color: "text-accent-red" }
          ].map((stat, index) => {
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
          <Card className="bg-gradient-to-br from-bright-blue via-teal-blue to-bright-blue text-white border-0 shadow-2xl inline-block max-w-4xl relative overflow-hidden">
            <CardContent className="p-12 relative z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <div className="space-y-8">
                <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Monitor className="w-10 h-10 text-white animate-pulse" />
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold">
                  Ready to Transform Your Healthcare Practice?
                </h3>
                
                <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
                  Experience the power of our AI-driven platform with a personalized demo 
                  tailored to your organization's specific needs and workflows.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleRequestDemo}
                    className="bg-accent-red hover:bg-accent-red/90 text-white px-10 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold text-lg group focus:outline-none"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Schedule Your Demo
                    <Calendar className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
                  </Button>
                  <Button 
                    onClick={handleGetAccess}
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-bright-blue px-10 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold text-lg focus:outline-none"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Start Free Trial
                  </Button>
                </div>
              </div>
            </CardContent>

            {/* Background animation */}
            <div className="absolute inset-0 opacity-5">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-32 h-32 rounded-full bg-white animate-float"
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