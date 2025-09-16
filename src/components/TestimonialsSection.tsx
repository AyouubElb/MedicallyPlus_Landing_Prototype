import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ChevronLeft, ChevronRight, Star, Quote, MapPin, Users, Heart, Award, CheckCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
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

  // Auto-rotate testimonials
  useEffect(() => {
    if (isVisible && isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [isVisible, isAutoPlay]);

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

  const handleJoinCommunity = () => {
    scrollToSection('interactive-form');
  };

  const handleShareStory = () => {
    scrollToSection('interactive-form');
  };

  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Chief of Cardiology",
      organization: "Singapore General Hospital",
      location: "Singapore",
      avatar: "SC",
      rating: 5,
      quote: "MedicallyPlus has revolutionized how we connect with specialists worldwide. The AI matching system helped us get a second opinion for a complex case in under 30 minutes, potentially saving our patient's life.",
      impact: "Reduced consultation time by 85%",
      specialty: "Cardiology",
      experience: "15+ years",
      cases: "2,500+ patients treated",
      gradient: "from-bright-blue to-teal-blue"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      role: "Patient",
      organization: "Rare Disease Survivor",
      location: "Barcelona, Spain",
      avatar: "MR",
      rating: 5,
      quote: "After years of misdiagnoses, MedicallyPlus connected me with a specialist in Boston who identified my rare condition immediately. The platform gave me my life back and access to treatments I never knew existed.",
      impact: "Correct diagnosis in 3 days",
      specialty: "Rare Diseases",
      experience: "Patient journey",
      cases: "Life-changing outcome",
      gradient: "from-medical-red to-accent-red"
    },
    {
      id: 3,
      name: "Dr. James Mitchell",
      role: "Oncology Specialist",
      organization: "MD Anderson Cancer Center",
      location: "Houston, Texas",
      avatar: "JM",
      rating: 5,
      quote: "The global collaboration features have transformed our tumor board meetings. We now regularly consult with oncologists from 12 different countries, providing our patients with truly world-class care.",
      impact: "40% improvement in treatment outcomes",
      specialty: "Oncology",
      experience: "20+ years",
      cases: "5,000+ cancer patients",
      gradient: "from-teal-blue to-bright-blue"
    },
    {
      id: 4,
      name: "Dr. Amara Okafor",
      role: "Pediatric Surgeon",
      organization: "Lagos University Teaching Hospital",
      location: "Lagos, Nigeria",
      avatar: "AO",
      rating: 5,
      quote: "As a surgeon in a resource-limited setting, MedicallyPlus has been invaluable. The platform connects me with pediatric specialists globally, helping me provide the best possible care for children who previously had limited options.",
      impact: "Expanded access to specialized care",
      specialty: "Pediatric Surgery",
      experience: "12+ years",
      cases: "1,800+ surgeries performed",
      gradient: "from-accent-red to-medical-red"
    },
    {
      id: 5,
      name: "Jennifer Thompson",
      role: "Mother & Patient Advocate",
      organization: "Family Caregiver",
      location: "Toronto, Canada",
      avatar: "JT",
      rating: 5,
      quote: "When my son was diagnosed with a complex neurological condition, MedicallyPlus helped us connect with the world's leading pediatric neurologists. The coordinated care approach meant we got consistent, expert guidance every step of the way.",
      impact: "Coordinated care across 4 specialists",
      specialty: "Pediatric Neurology",
      experience: "Caregiver journey",
      cases: "Family-centered care",
      gradient: "from-teal-blue to-medical-red"
    }
  ];

  const impactStats = [
    { icon: Users, value: "200K+", label: "Lives Transformed", color: "text-bright-blue" },
    { icon: Heart, value: "98%", label: "Patient Satisfaction", color: "text-medical-red" },
    { icon: Award, value: "50+", label: "Countries Connected", color: "text-teal-blue" },
    { icon: CheckCircle, value: "24/7", label: "Global Support", color: "text-accent-red" }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000); // Resume autoplay after 10 seconds
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000); // Resume autoplay after 10 seconds
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000); // Resume autoplay after 10 seconds
  };

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="py-20 bg-gradient-to-br from-white via-bright-blue/3 to-teal-blue/5 relative overflow-hidden"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(8)].map((_, i) => {
          const colors = ['bg-bright-blue', 'bg-teal-blue', 'bg-medical-red', 'bg-accent-red'];
          return (
            <div
              key={i}
              className={`absolute w-24 h-24 rounded-full ${colors[i % 4]} animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + Math.random() * 10}s`
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
          <div className="inline-flex items-center gap-3 bg-medical-red/10 px-8 py-4 rounded-full mb-10">
            <Heart className="w-6 h-6 text-medical-red" />
            <span className="text-medical-red font-bold text-lg">Patient Stories</span>
          </div>
          
          <h2 className="text-4xl lg:text-7xl font-bold text-deep-black mb-10 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Transforming Lives
            <span className="text-medical-red block bg-gradient-to-r from-medical-red to-accent-red bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-shadow-gray max-w-4xl mx-auto leading-relaxed font-medium">
            Hear from healthcare providers and patients whose lives have been transformed 
            through our global healthcare platform. Real stories, real impact.
          </p>
        </div>

        {/* Main Testimonial Showcase */}
        <div className="grid lg:grid-cols-3 gap-12 items-center mb-20">
          {/* Testimonial Content */}
          <div className={`lg:col-span-2 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <Card className={`bg-gradient-to-br ${currentTestimonialData.gradient} text-white border-0 shadow-2xl relative overflow-hidden`}>
              <CardContent className="p-12 relative z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <div className="space-y-8">
                  {/* Quote Icon */}
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Quote className="w-10 h-10 text-white" />
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-2xl lg:text-3xl leading-relaxed font-medium">
                    "{currentTestimonialData.quote}"
                  </blockquote>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    {[...Array(currentTestimonialData.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-300 fill-current" />
                    ))}
                  </div>

                  {/* Impact Metric */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 inline-block">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-8 h-8 text-white" />
                      <div>
                        <div className="text-lg font-bold">Key Impact</div>
                        <div className="text-white/90">{currentTestimonialData.impact}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-32 h-32 rounded-full bg-white animate-float"
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

          {/* Profile Info */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {/* Profile Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <div className="space-y-6">
                  {/* Avatar */}
                  <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${currentTestimonialData.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {currentTestimonialData.avatar}
                  </div>

                  {/* Profile Info */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-deep-black">
                      {currentTestimonialData.name}
                    </h3>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="bg-bright-blue/10 text-bright-blue font-semibold">
                        {currentTestimonialData.role}
                      </Badge>
                      <p className="text-shadow-gray font-medium">
                        {currentTestimonialData.organization}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-shadow-gray">
                        <MapPin className="w-4 h-4" />
                        {currentTestimonialData.location}
                      </div>
                    </div>
                  </div>

                  {/* Professional Details */}
                  <div className="grid grid-cols-1 gap-4 pt-6 border-t border-shadow-gray/20">
                    <div className="text-center">
                      <div className="text-lg font-bold text-bright-blue">{currentTestimonialData.specialty}</div>
                      <div className="text-sm text-shadow-gray">Specialty</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-teal-blue">{currentTestimonialData.experience}</div>
                      <div className="text-sm text-shadow-gray">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-medical-red">{currentTestimonialData.cases}</div>
                      <div className="text-sm text-shadow-gray">Impact</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={prevTestimonial}
                variant="outline"
                size="sm"
                className="w-12 h-12 rounded-full border-2 border-bright-blue text-bright-blue hover:bg-bright-blue hover:text-white transition-all duration-300 focus:outline-none"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                      currentTestimonial === index 
                        ? 'bg-bright-blue scale-125' 
                        : 'bg-shadow-gray/30 hover:bg-shadow-gray/50'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextTestimonial}
                variant="outline"
                size="sm"
                className="w-12 h-12 rounded-full border-2 border-bright-blue text-bright-blue hover:bg-bright-blue hover:text-white transition-all duration-300 focus:outline-none"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {impactStats.map((stat, index) => {
            const gradientClasses = [
              'from-bright-blue to-bright-blue/80',
              'from-medical-red to-medical-red/80',
              'from-teal-blue to-teal-blue/80',
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
          <Card className="bg-gradient-to-r from-bright-blue via-teal-blue to-bright-blue text-white border-0 shadow-2xl inline-block max-w-4xl relative overflow-hidden">
            <CardContent className="p-12 relative z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <div className="space-y-8">
                <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-10 h-10 text-white animate-pulse" />
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold">
                  Join Our Global Healthcare Community
                </h3>
                
                <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
                  Become part of a revolutionary movement that's transforming healthcare delivery 
                  and improving patient outcomes worldwide.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={handleJoinCommunity}
                    className="bg-medical-red hover:bg-medical-red/90 text-white px-10 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold text-lg group focus:outline-none"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Join the Community
                    <Heart className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
                  </Button>
                  <Button 
                    onClick={handleShareStory}
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-bright-blue px-10 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold text-lg focus:outline-none"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Share Your Story
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
                    animationDelay: `${i * 1.8}s`,
                    animationDuration: `${12 + Math.random() * 8}s`
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