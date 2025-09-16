import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import medicallyPlusLogo from "figma:asset/d5dc34f5e125fa90d35bccffbea78e52b2fccf7d.png";
import FormSidebar from "./sidebar/FormSidebar";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      label: "Solutions",
      href: "#features",
      submenu: [
        { label: "AI Specialist Matching", href: "#features" },
        { label: "Global Second Opinions", href: "#features" },
        { label: "Healthcare Concierge", href: "#features" },
        { label: "Provider Dashboard", href: "#saas-preview" },
      ],
    },
    { label: "How It Works", href: "#our-promise" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#interactive-form" },
  ];

  const scrollToSection = (href: string) => {
    try {
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        const headerHeight = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: elementPosition - headerHeight,
          behavior: "smooth",
        });

        setIsMenuOpen(false);
      } else {
        console.warn(`Element with id "${targetId}" not found`);
      }
    } catch (error) {
      console.error("Error scrolling to section:", error);
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-shadow-gray/20"
          : "bg-transparent"
      }`}
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-3 hover-lift group focus:outline-none"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <div className="relative">
                <img
                  src={medicallyPlusLogo}
                  alt="MedicallyPlus"
                  className="h-16 w-auto transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bright-blue/20 to-teal-blue/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                <button
                  onClick={() => item.href && scrollToSection(item.href)}
                  className="flex items-center space-x-1 text-deep-black hover:text-bright-blue transition-all duration-300 font-medium relative py-2 focus:outline-none"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <span>{item.label}</span>
                  {item.submenu && (
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  )}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-bright-blue group-hover:w-full transition-all duration-300"></div>
                </button>

                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl border border-shadow-gray/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-2">
                      {item.submenu.map((subitem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() => scrollToSection(subitem.href)}
                          className="w-full text-left px-4 py-3 text-deep-black hover:text-bright-blue hover:bg-bright-blue/5 rounded-lg transition-all duration-200 font-medium focus:outline-none"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {subitem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("#interactive-form")}
              className="text-deep-black hover:text-bright-blue hover:bg-bright-blue/10 interactive-scale font-medium focus:outline-none"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-bright-blue hover:bg-bright-blue/90 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 interactive-scale font-medium focus:outline-none"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-deep-black hover:text-bright-blue hover:bg-bright-blue/10 interactive-scale focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 bg-white/95 backdrop-blur-md rounded-xl mt-2 shadow-xl border border-shadow-gray/20">
            {navItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => item.href && scrollToSection(item.href)}
                  className="w-full text-left px-4 py-3 text-deep-black hover:text-bright-blue hover:bg-bright-blue/5 transition-all duration-200 font-medium rounded-lg mx-2 focus:outline-none"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {item.label}
                </button>
                {item.submenu && (
                  <div className="pl-6 space-y-1">
                    {item.submenu.map((subitem, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => scrollToSection(subitem.href)}
                        className="w-full text-left px-4 py-2 text-shadow-gray hover:text-bright-blue transition-all duration-200 text-sm rounded-lg focus:outline-none"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {subitem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTA Buttons */}
            <div className="px-4 pt-4 space-y-2 border-t border-shadow-gray/20">
              <Button
                variant="ghost"
                onClick={() => scrollToSection("#interactive-form")}
                className="w-full text-deep-black hover:text-bright-blue hover:bg-bright-blue/10 font-medium focus:outline-none"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Sign In
              </Button>
              <Button
                onClick={() => setIsSidebarOpen(true)}
                className="w-full bg-bright-blue hover:bg-bright-blue/90 text-white rounded-xl shadow-lg font-medium focus:outline-none"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar for Form */}
        <FormSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </nav>
    </header>
  );
}
