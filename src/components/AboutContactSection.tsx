import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Users, Target, Award } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutContactSection() {
  const teamValues = [
    {
      icon: Users,
      title: "Patient-Centered Care",
      description: "Every decision we make prioritizes patient outcomes and experiences."
    },
    {
      icon: Target,
      title: "Innovation & Excellence",
      description: "We leverage cutting-edge AI technology to deliver exceptional healthcare."
    },
    {
      icon: Award,
      title: "Trust & Transparency",
      description: "We maintain the highest standards of security, privacy, and ethical practice."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl text-gray-900 mb-6">
                About MedicallyPlus
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                We're revolutionizing healthcare by making quality medical care accessible, affordable, and personalized for everyone. 
                Our AI-powered platform connects patients with board-certified doctors, providing instant health insights and comprehensive care.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Founded by healthcare professionals and technology experts, MedicallyPlus bridges the gap between traditional healthcare 
                and modern digital solutions. We believe that everyone deserves access to quality healthcare, regardless of location or time constraints.
              </p>
            </div>

            {/* Mission Values */}
            <div className="space-y-6">
              <h3 className="text-2xl text-gray-900">Our Values</h3>
              <div className="space-y-4">
                {teamValues.map((value, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg text-gray-900 mb-2">{value.title}</h4>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Team Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
                alt="Medical team collaborating with technology"
                className="w-full h-full object-cover"
              />
              {/* Overlay Stats */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl text-primary">50K+</p>
                      <p className="text-sm text-gray-600">Patients</p>
                    </div>
                    <div>
                      <p className="text-2xl text-primary">500+</p>
                      <p className="text-sm text-gray-600">Doctors</p>
                    </div>
                    <div>
                      <p className="text-2xl text-primary">98%</p>
                      <p className="text-sm text-gray-600">Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-xl text-gray-600 mb-8">
                Have questions about our services? Our team is here to help you get started with your healthcare journey.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-gray-900">Email</p>
                  <p className="text-gray-600">support@medicallyplus.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-gray-900">Phone</p>
                  <p className="text-gray-600">1-800-MEDPLUS (1-800-633-7587)</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-gray-900">Address</p>
                  <p className="text-gray-600">123 Health Tech Blvd, San Francisco, CA 94105</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <p className="text-gray-900 mb-4">Follow Us</p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="p-2">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="sm" className="p-2">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="sm" className="p-2">
                  <Facebook className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Legal Links */}
            <div className="pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-6 text-sm">
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  HIPAA Notice
                </a>
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  Accessibility
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Subject</label>
                  <Input placeholder="How can we help you?" />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <Textarea 
                    placeholder="Tell us about your inquiry..."
                    className="min-h-32"
                  />
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}