import { Card, CardContent } from "./ui/card";
import { AlertCircle, Clock, DollarSign, MapPin, Users, TrendingUp, Activity } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";

export function ProblemFramingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Enhanced animated counter with easing
  const useCounter = (end: number, duration: number = 2000, isVisible: boolean) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!isVisible) return;
      
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOutCubic * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, [end, duration, isVisible]);
    
    return count;
  };

  // Enhanced intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
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

  const handleDiscoverSolution = () => {
    scrollToSection('our-promise');
  };

  const painStats = [
    {
      icon: Clock,
      value: useCounter(73, 2500, isVisible),
      suffix: "%",
      label: "of patients wait weeks for specialist appointments",
      color: "text-medical-red",
      bgColor: "bg-medical-red/10",
      borderColor: "border-medical-red/20",
      description: "Average wait time for specialist care globally"
    },
    {
      icon: DollarSign,
      value: useCounter(4100, 3000, isVisible),
      prefix: "$",
      label: "average cost of unnecessary medical procedures annually",
      color: "text-accent-red",
      bgColor: "bg-accent-red/10",
      borderColor: "border-accent-red/20",
      description: "Wasted spending due to delayed or incorrect diagnosis"
    },
    {
      icon: MapPin,
      value: useCounter(2.3, 2500, isVisible),
      suffix: "B",
      label: "people worldwide lack access to quality healthcare",
      color: "text-deep-black",
      bgColor: "bg-deep-black/10",
      borderColor: "border-deep-black/20",
      description: "Global healthcare accessibility crisis"
    }
  ];

  const painPoints = [
    {
      category: "Patient Pain Points",
      icon: Users,
      color: "bg-medical-red/5 border-medical-red/20 hover:bg-medical-red/10",
      iconColor: "text-medical-red",
      accentColor: "bg-medical-red",
      points: [
        "Long wait times for specialist consultations",
        "Lack of access to quality healthcare in remote areas", 
        "Difficulty getting second opinions on complex diagnoses",
        "Language barriers when seeking international expertise",
        "High costs of medical travel and consultation fees"
      ]
    },
    {
      category: "Provider Pain Points", 
      icon: TrendingUp,
      color: "bg-accent-red/5 border-accent-red/20 hover:bg-accent-red/10",
      iconColor: "text-accent-red",
      accentColor: "bg-accent-red",
      points: [
        "Limited time for thorough patient consultations",
        "Difficulty collaborating with international specialists",
        "Inefficient patient management and follow-up systems",
        "Challenges in accessing global medical knowledge",
        "Administrative burden reducing patient care time"
      ]
    },
    {
      category: "System Pain Points",
      icon: AlertCircle, 
      color: "bg-bright-blue/5 border-bright-blue/20 hover:bg-bright-blue/10",
      iconColor: "text-bright-blue",
      accentColor: "bg-bright-blue",
      points: [
        "Fragmented healthcare systems across countries",
        "Lack of standardized medical record sharing",
        "Inconsistent quality of care across regions",
        "Limited integration of AI and modern technology",
        "Poor coordination between healthcare providers"
      ]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="problem-framing" 
      className="py-20 bg-gradient-to-b from-white to-bright-blue/3"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-medical-red/10 px-6 py-3 rounded-full mb-8">
            <Activity className="w-5 h-5 text-medical-red" />
            <span className="text-medical-red font-semibold">Healthcare Crisis</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-deep-black mb-8 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
            The Global Healthcare
            <span className="text-medical-red block">Crisis</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-shadow-gray max-w-4xl mx-auto leading-relaxed font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Despite incredible medical advances, billions still lack access to quality healthcare. 
            Geographic barriers, systemic inefficiencies, and fragmented care create unnecessary suffering.
          </p>
        </div>

        {/* Enhanced Animated Pain Statistics */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {painStats.map((stat, index) => (
            <Card 
              key={index} 
              className={`border-2 ${stat.borderColor} shadow-lg hover:shadow-2xl transition-all duration-500 group hover-lift cursor-pointer overflow-hidden relative`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center relative z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <div className="space-y-6">
                  <div className={`w-20 h-20 mx-auto rounded-2xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-all duration-300 relative`}>
                    <stat.icon className={`w-10 h-10 ${stat.color}`} />
                    <div className={`absolute inset-0 rounded-2xl ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`}></div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className={`text-5xl lg:text-6xl font-bold ${stat.color} transition-all duration-300`}>
                      {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
                    </div>
                    <p className="text-deep-black leading-relaxed font-medium text-lg">
                      {stat.label}
                    </p>
                    <p className="text-shadow-gray text-sm font-medium">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </CardContent>
              
              {/* Animated background effect */}
              <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
            </Card>
          ))}
        </div>

        {/* Enhanced Pain Point Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {painPoints.map((category, index) => (
            <Card 
              key={index} 
              className={`border-2 ${category.color} hover:shadow-2xl transition-all duration-500 group hover-lift cursor-pointer relative overflow-hidden`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${(index + 3) * 0.2}s` }}
            >
              <CardContent className="p-8 relative z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <div className="space-y-8">
                  {/* Enhanced Header */}
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 relative`}>
                      <category.icon className={`w-8 h-8 ${category.iconColor}`} />
                      {hoveredCard === index && (
                        <div className={`absolute inset-0 rounded-2xl ${category.accentColor} opacity-10 animate-pulse`}></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-deep-black group-hover:text-bright-blue transition-colors duration-300">
                        {category.category}
                      </h3>
                      <div className={`h-1 w-12 ${category.accentColor} rounded-full mt-2 group-hover:w-20 transition-all duration-500`}></div>
                    </div>
                  </div>

                  {/* Enhanced Pain Points List */}
                  <ul className="space-y-4">
                    {category.points.map((point, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-4 group/item hover:translate-x-2 transition-transform duration-300"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div className={`w-3 h-3 rounded-full ${category.accentColor} mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300`} />
                        <span className="text-deep-black leading-relaxed font-medium group-hover/item:text-bright-blue transition-colors duration-300">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              
              {/* Hover effect background */}
              <div className={`absolute top-0 left-0 h-full w-1 ${category.accentColor} transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top`}></div>
            </Card>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className={`text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-bright-blue via-teal-blue to-bright-blue text-white relative overflow-hidden">
            <CardContent className="p-12 relative z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <div className="space-y-8">
                <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Activity className="w-10 h-10 text-white animate-pulse" />
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                  What if we could solve this?
                </h3>
                
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
                  Imagine a world where quality healthcare knows no borders, where AI connects patients 
                  with the best specialists instantly, and where everyone has access to world-class medical care.
                </p>
                
                <Button 
                  onClick={handleDiscoverSolution}
                  className="bg-accent-red hover:bg-accent-red/90 text-white px-12 py-4 rounded-xl transition-all duration-300 hover-lift font-semibold text-lg group focus:outline-none"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Discover Our Solution
                  <div className="ml-2 inline-block group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </div>
                </Button>
              </div>
            </CardContent>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-32 h-32 rounded-full bg-white animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 1.5}s`,
                    animationDuration: `${6 + Math.random() * 4}s`
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