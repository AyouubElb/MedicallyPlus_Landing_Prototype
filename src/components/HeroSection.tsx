import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Shield, Heart, Clock, Users, ChevronDown, Globe, Play, Star, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import medicallyPlusLogo from "figma:asset/d5dc34f5e125fa90d35bccffbea78e52b2fccf7d.png";

export function HeroSection() {
  const globeRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Enhanced 3D globe animation
    const globe = globeRef.current;
    if (globe) {
      let rotation = 0;
      const animate = () => {
        rotation += 0.3;
        globe.style.transform = `rotateY(${rotation}deg) rotateX(10deg)`;
        requestAnimationFrame(animate);
      };
      animate();
    }

    // Mouse tracking for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  const handleGetAccess = () => {
    scrollToSection('interactive-form');
  };

  const handleWatchDemo = () => {
    scrollToSection('saas-preview');
  };

  const handleScrollToNext = () => {
    scrollToSection('problem-framing');
  };

  const trustMetrics = [
    { icon: Users, value: "200K+", label: "global patients", color: "text-bright-blue" },
    { icon: Globe, value: "50+", label: "countries", color: "text-teal-blue" },
    { icon: Clock, value: "24/7", label: "worldwide", color: "text-medical-red" },
    { icon: Star, value: "98%", label: "satisfaction", color: "text-accent-red" }
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen bg-gradient-to-br from-white via-bright-blue/3 to-teal-blue/5 flex items-center overflow-hidden pt-20" 
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Animated Background Network */}
      <div className="absolute inset-0 opacity-10">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => {
          const colors = ['bg-bright-blue', 'bg-teal-blue', 'bg-medical-red', 'bg-accent-red'];
          return (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-float ${colors[i % 4]}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          );
        })}
        
        {/* Connection lines with parallax */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B67B4" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="#5EAAA5" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#FF3C3C" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          <line 
            x1="10%" y1="20%" x2="90%" y2="30%" 
            stroke="url(#lineGradient)" 
            strokeWidth="1"
            style={{
              transform: `translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.02}px)`
            }}
          />
          <line 
            x1="20%" y1="70%" x2="80%" y2="20%" 
            stroke="url(#lineGradient)" 
            strokeWidth="1"
            style={{
              transform: `translateX(${mousePosition.x * -0.01}px) translateY(${mousePosition.y * 0.01}px)`
            }}
          />
          <line 
            x1="5%" y1="50%" x2="95%" y2="80%" 
            stroke="url(#lineGradient)" 
            strokeWidth="1"
            style={{
              transform: `translateX(${mousePosition.x * 0.015}px) translateY(${mousePosition.y * -0.01}px)`
            }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-8 text-center lg:text-left transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <Badge 
                variant="secondary" 
                className="bg-bright-blue/10 text-bright-blue border-bright-blue/20 hover:bg-bright-blue/20 transition-all duration-300 interactive-scale font-medium" 
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Shield className="w-3 h-3 mr-1" />
                HIPAA Compliant
              </Badge>
              <Badge 
                variant="secondary" 
                className="bg-teal-blue/10 text-teal-blue border-teal-blue/20 hover:bg-teal-blue/20 transition-all duration-300 interactive-scale font-medium" 
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Globe className="w-3 h-3 mr-1" />
                Global Network
              </Badge>
              <Badge 
                variant="secondary" 
                className="bg-medical-red/10 text-medical-red border-medical-red/20 hover:bg-medical-red/20 transition-all duration-300 interactive-scale font-medium" 
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <CheckCircle2 className="w-3 h-3 mr-1" />
                ISO Certified
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <div className="flex justify-center lg:justify-start items-center gap-3 mb-4">
                <img 
                  src={medicallyPlusLogo} 
                  alt="MedicallyPlus" 
                  className="h-10 w-auto"
                />
                <span className="text-lg font-semibold text-shadow-gray" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  MedicallyPlus presents
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-deep-black leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <span className="block mb-2">Healing Beyond</span>
                <span className="text-bright-blue block bg-gradient-to-r from-bright-blue to-teal-blue bg-clip-text text-transparent">
                  Borders
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-shadow-gray leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Revolutionary AI-powered healthcare that connects patients worldwide with the best medical expertise, 
                breaking down geographical barriers to quality care.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                onClick={handleGetAccess}
                className="bg-accent-red hover:bg-accent-red/90 text-white px-12 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift font-semibold group focus:outline-none"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Get Early Access
                <div className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </div>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleWatchDemo}
                className="border-2 border-bright-blue text-bright-blue hover:bg-bright-blue hover:text-white px-12 py-6 text-lg rounded-xl hover-lift font-semibold group focus:outline-none"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {trustMetrics.map((metric, index) => {
                const gradientClasses = [
                  'from-bright-blue to-bright-blue/80',
                  'from-teal-blue to-teal-blue/80',
                  'from-medical-red to-medical-red/80',
                  'from-accent-red to-accent-red/80'
                ];
                
                return (
                  <div 
                    key={index}
                    className="text-center lg:text-left hover-lift group cursor-pointer"
                    style={{ animationDelay: `${index * 0.2}s`, fontFamily: 'Poppins, sans-serif' }}
                  >
                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-1">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradientClasses[index]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <metric.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className={`text-2xl font-bold ${metric.color}`}>
                        {metric.value}
                      </span>
                    </div>
                    <p className="text-sm text-shadow-gray font-medium capitalize">{metric.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Enhanced 3D Globe */}
          <div className={`relative flex justify-center lg:justify-end transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative w-96 h-96">
              {/* 3D Globe Container */}
              <div 
                ref={globeRef}
                className="w-full h-full relative"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: `translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.02}px)`
                }}
              >
                {/* Globe Base with enhanced gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-bright-blue via-teal-blue to-bright-blue shadow-2xl hover-lift">
                  {/* Globe Grid */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/5 to-teal-blue/20">
                    {/* Enhanced latitude lines */}
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={`lat-${i}`}
                        className="absolute left-0 right-0 border-t border-white/30"
                        style={{ top: `${(i + 1) * 11}%` }}
                      />
                    ))}
                    {/* Enhanced longitude lines */}
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={`lng-${i}`}
                        className="absolute top-0 bottom-0 border-l border-white/30"
                        style={{ left: `${(i + 1) * 8}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Connection Points with animations */}
                <div className="absolute top-16 right-20 w-5 h-5 bg-accent-red rounded-full animate-pulse-slow shadow-lg hover-lift cursor-pointer group">
                  <div className="absolute inset-0 bg-accent-red rounded-full animate-ping"></div>
                  <div className="absolute -top-8 -left-6 bg-white px-2 py-1 rounded text-xs font-semibold text-accent-red shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Live Patient
                  </div>
                </div>
                
                <div className="absolute bottom-20 left-16 w-4 h-4 bg-medical-red rounded-full animate-pulse-slow delay-300 shadow-lg hover-lift cursor-pointer group">
                  <div className="absolute inset-0 bg-medical-red rounded-full animate-ping"></div>
                  <div className="absolute -top-8 -left-4 bg-white px-2 py-1 rounded text-xs font-semibold text-medical-red shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Specialist
                  </div>
                </div>
                
                <div className="absolute top-32 left-20 w-4 h-4 bg-teal-blue rounded-full animate-pulse-slow delay-500 shadow-lg hover-lift cursor-pointer group">
                  <div className="absolute inset-0 bg-teal-blue rounded-full animate-ping"></div>
                  <div className="absolute -top-8 -left-3 bg-white px-2 py-1 rounded text-xs font-semibold text-teal-blue shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    AI Match
                  </div>
                </div>
                
                <div className="absolute bottom-32 right-24 w-3 h-3 bg-bright-blue rounded-full animate-pulse-slow delay-700 shadow-lg hover-lift cursor-pointer group">
                  <div className="absolute inset-0 bg-bright-blue rounded-full animate-ping"></div>
                  <div className="absolute -top-8 -left-2 bg-white px-2 py-1 rounded text-xs font-semibold text-bright-blue shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Network
                  </div>
                </div>

                {/* Enhanced Data Flow Lines */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF3C3C" stopOpacity="0.8"/>
                      <stop offset="50%" stopColor="#0B67B4" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#5EAAA5" stopOpacity="0.4"/>
                    </linearGradient>
                    <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E53935" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#0B67B4" stopOpacity="0.4"/>
                    </linearGradient>
                  </defs>
                  <path 
                    d="M 80 100 Q 200 150 320 120" 
                    stroke="url(#flowGradient)" 
                    strokeWidth="3" 
                    fill="none"
                    className="animate-pulse-slow"
                  />
                  <path 
                    d="M 100 300 Q 200 250 300 280" 
                    stroke="url(#flowGradient2)" 
                    strokeWidth="3" 
                    fill="none"
                    className="animate-pulse-slow"
                    style={{ animationDelay: '1s' }}
                  />
                </svg>
              </div>

              {/* Enhanced Floating Info Cards */}
              <div className="absolute -top-8 -left-12 bg-white p-6 rounded-2xl shadow-xl hover-lift cursor-pointer group animate-bounce-slow" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-medical-red group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="font-bold text-deep-black">AI Diagnosis</p>
                    <p className="text-sm text-shadow-gray font-medium">98% Accuracy</p>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-shadow-gray/20"></div>
              </div>

              <div className="absolute -bottom-8 -right-12 bg-white p-6 rounded-2xl shadow-xl hover-lift cursor-pointer group animate-bounce-slow" style={{ animationDelay: '1s', fontFamily: 'Poppins, sans-serif' }}>
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-bright-blue group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="font-bold text-deep-black">Global Reach</p>
                    <p className="text-sm text-shadow-gray font-medium">50+ Countries</p>
                  </div>
                </div>
                <div className="absolute -top-2 right-6 w-4 h-4 bg-white transform rotate-45 border-l border-t border-shadow-gray/20"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Cue */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <button 
            onClick={handleScrollToNext}
            className="flex flex-col items-center gap-3 text-shadow-gray hover:text-bright-blue transition-all duration-300 group hover-lift focus:outline-none"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
              <span className="text-sm font-semibold">Discover the Problem</span>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-bright-blue/30 flex items-center justify-center group-hover:border-bright-blue transition-colors duration-300">
              <ChevronDown className="w-6 h-6 animate-bounce group-hover:text-bright-blue group-hover:scale-110 transition-all duration-300" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}