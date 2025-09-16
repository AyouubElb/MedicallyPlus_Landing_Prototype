import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Heart, Mail, Phone, MapPin, Globe, Facebook, Twitter, Linkedin, Instagram, Youtube, ArrowRight, Shield, Award, Users, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import medicallyPlusLogo from "figma:asset/d5dc34f5e125fa90d35bccffbea78e52b2fccf7d.png";

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error scrolling to section:', error);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const handleContactClick = () => {
    scrollToSection('interactive-form');
  };

  const handleGetStartedClick = () => {
    scrollToSection('interactive-form');
  };

  const footerLinks = {
    platform: [
      { label: 'How It Works', href: '#our-promise' },
      { label: 'Features', href: '#features' },
      { label: 'Platform Demo', href: '#saas-preview' },
      { label: 'Pricing', href: '#interactive-form' },
      { label: 'API Documentation', href: '#interactive-form' }
    ],
    solutions: [
      { label: 'For Patients', href: '#features' },
      { label: 'For Providers', href: '#features' },
      { label: 'For Hospitals', href: '#saas-preview' },
      { label: 'Global Network', href: '#testimonials' },
      { label: 'AI Matching', href: '#features' }
    ],
    resources: [
      { label: 'Case Studies', href: '#testimonials' },
      { label: 'Medical Blog', href: '#testimonials' },
      { label: 'Research Papers', href: '#testimonials' },
      { label: 'Help Center', href: '#interactive-form' },
      { label: 'Webinars', href: '#interactive-form' }
    ],
    company: [
      { label: 'About Us', href: '#our-promise' },
      { label: 'Careers', href: '#interactive-form' },
      { label: 'Press', href: '#testimonials' },
      { label: 'Partners', href: '#testimonials' },
      { label: 'Contact', href: '#interactive-form' }
    ]
  };

  const trustBadges = [
    { icon: Shield, label: 'HIPAA Compliant', color: 'text-bright-blue' },
    { icon: Award, label: 'ISO 27001 Certified', color: 'text-teal-blue' },
    { icon: Users, label: 'GDPR Compliant', color: 'text-medical-red' },
    { icon: CheckCircle, label: 'SOC 2 Type II', color: 'text-accent-red' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-600' }
  ];

  const languages = [
    'English', 'Español', 'Français', 'Deutsch', '中文', '日本語', 'العربية', 'Português'
  ];

  return (
    <footer className="bg-gradient-to-br from-bright-blue via-bright-blue/90 to-teal-blue text-white relative overflow-hidden" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => {
          const colors = ['bg-white', 'bg-teal-blue', 'bg-medical-red', 'bg-accent-red'];
          return (
            <div
              key={i}
              className={`absolute w-32 h-32 rounded-full ${colors[i % 4]} animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2.5}s`,
                animationDuration: `${20 + Math.random() * 10}s`
              }}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-4 space-y-8">
              {/* Logo and Description */}
              <div className="space-y-6">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="flex items-center gap-3 hover-lift group focus:outline-none"
                >
                  <img 
                    src={medicallyPlusLogo}
                    alt="MedicallyPlus" 
                    className="h-16 w-auto transition-transform duration-300 group-hover:scale-110"
                  />
                </button>
                
                <p className="text-lg text-white/90 leading-relaxed font-medium max-w-md">
                  Revolutionizing global healthcare access through AI-powered specialist matching 
                  and seamless international medical collaboration.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white mb-4">Get in Touch</h4>
                <div className="space-y-3">
                  <button 
                    onClick={handleContactClick}
                    className="flex items-center gap-3 text-white/90 hover:text-white transition-colors duration-300 group"
                  >
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">contact@medicallyplus.com</span>
                  </button>
                  <button 
                    onClick={handleContactClick}
                    className="flex items-center gap-3 text-white/90 hover:text-white transition-colors duration-300 group"
                  >
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">+1 (555) 123-4567</span>
                  </button>
                  <div className="flex items-center gap-3 text-white/90">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">Global Healthcare Network</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white">Security & Compliance</h4>
                <div className="grid grid-cols-2 gap-4">
                  {trustBadges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors duration-300 group cursor-pointer backdrop-blur-sm">
                      <badge.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm font-medium text-white/95">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-6 grid md:grid-cols-4 gap-8">
              {/* Platform */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-white">Platform</h4>
                <ul className="space-y-3">
                  {footerLinks.platform.map((link, index) => (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(link.href.replace('#', ''))}
                        className="text-white/80 hover:text-white transition-colors duration-300 font-medium focus:outline-none"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-white">Solutions</h4>
                <ul className="space-y-3">
                  {footerLinks.solutions.map((link, index) => (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(link.href.replace('#', ''))}
                        className="text-white/80 hover:text-white transition-colors duration-300 font-medium focus:outline-none"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-white">Resources</h4>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(link.href.replace('#', ''))}
                        className="text-white/80 hover:text-white transition-colors duration-300 font-medium focus:outline-none"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-white">Company</h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(link.href.replace('#', ''))}
                        className="text-white/80 hover:text-white transition-colors duration-300 font-medium focus:outline-none"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter & CTA */}
            <div className="lg:col-span-2 space-y-8">
              {/* Newsletter Signup */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">Stay Updated</h4>
                <p className="text-white/90 font-medium">
                  Get the latest healthcare innovations and platform updates.
                </p>
                
                {!isSubscribed ? (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white focus:bg-white/25 rounded-xl focus:outline-none backdrop-blur-sm"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                      required
                    />
                    <Button 
                      type="submit"
                      className="w-full bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300 hover-lift font-semibold group focus:outline-none backdrop-blur-sm border border-white/30"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Subscribe
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </form>
                ) : (
                  <div className="p-6 bg-white/20 rounded-xl border border-white/30 text-center backdrop-blur-sm">
                    <CheckCircle className="w-8 h-8 text-white mx-auto mb-3" />
                    <p className="text-white font-semibold">Successfully subscribed!</p>
                    <p className="text-white/90 text-sm">Thank you for joining our community.</p>
                  </div>
                )}
              </div>

              {/* Language Selector */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Language
                </h4>
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 text-white rounded-xl p-3 focus:border-white focus:bg-white/25 focus:outline-none backdrop-blur-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang} className="bg-bright-blue text-white">
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick CTA */}
              <div className="p-6 bg-white/15 rounded-xl border border-white/30 backdrop-blur-sm">
                <h4 className="text-lg font-bold text-white mb-3">Ready to Get Started?</h4>
                <p className="text-white/90 text-sm mb-4 font-medium">
                  Join thousands of healthcare professionals and patients worldwide.
                </p>
                <Button 
                  onClick={handleGetStartedClick}
                  className="w-full bg-medical-red hover:bg-medical-red/90 text-white rounded-xl transition-all duration-300 hover-lift font-semibold group focus:outline-none"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Get Started Free
                  <Heart className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20" />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-white/80">
              <p className="font-medium">
                © 2024 MedicallyPlus. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <button 
                  onClick={handleContactClick}
                  className="hover:text-white transition-colors duration-300 font-medium focus:outline-none"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={handleContactClick}
                  className="hover:text-white transition-colors duration-300 font-medium focus:outline-none"
                >
                  Terms of Service
                </button>
                <button 
                  onClick={handleContactClick}
                  className="hover:text-white transition-colors duration-300 font-medium focus:outline-none"
                >
                  Cookie Policy
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-white/80 font-medium">Follow us:</span>
              {socialLinks.map((social, index) => (
                <button 
                  key={index}
                  onClick={handleContactClick}
                  className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:bg-white/25 hover:scale-110 focus:outline-none backdrop-blur-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Additional Trust Elements */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center">
              <div className="flex items-center gap-8 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">24/7 Global Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">200K+ Users Worldwide</span>
                </div>
              </div>
              
              <div className="text-sm text-white/70 font-medium">
                Made with <Heart className="w-4 h-4 inline text-medical-red" /> for global healthcare
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}