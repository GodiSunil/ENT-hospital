"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Stethoscope,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Heart,
  Shield,
  Award,
  Users
} from 'lucide-react';

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Doctors', href: '/doctors' },
  { name: 'Services', href: '/services' },
  { name: 'Book Appointment', href: '/book-appointment' },
  { name: 'Patient Portal', href: '/patient-portal' },
  { name: 'Contact Us', href: '/contact' },
];

const services = [
  { name: 'Ear Treatments', href: '/services#ear' },
  { name: 'Nose Treatments', href: '/services#nose' },
  { name: 'Throat Treatments', href: '/services#throat' },
  { name: 'Pediatric ENT', href: '/services#pediatric' },
  { name: 'Hearing Solutions', href: '/services#hearing' },
  { name: 'Voice Therapy', href: '/services#voice' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-manrope">ENT Excellence</h3>
                <p className="text-sm text-gray-300">Premier ENT Care</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Leading the way in comprehensive ear, nose, and throat care with 
              state-of-the-art technology and compassionate medical expertise.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-accent">25+</div>
                <div className="text-xs text-gray-300">Years Experience</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-accent">10K+</div>
                <div className="text-xs text-gray-300">Happy Patients</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold font-manrope">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold font-manrope">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-accent transition-colors flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold font-manrope">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">123 Medical Center Drive</p>
                  <p className="text-gray-300">Health City, HC 12345</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-gray-300">(555) 123-4567</p>
                  <p className="text-xs text-gray-400">Main Line</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">(555) 999-HELP</p>
                  <p className="text-xs text-gray-400">Emergency 24/7</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <p className="text-gray-300">info@entexcellence.com</p>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                  <p>Sunday: Emergency Only</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-700"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Shield className="w-8 h-8 text-accent" />
              <p className="text-sm font-medium">HIPAA Compliant</p>
              <p className="text-xs text-gray-400">Your Privacy Protected</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Award className="w-8 h-8 text-accent" />
              <p className="text-sm font-medium">Board Certified</p>
              <p className="text-xs text-gray-400">Expert Specialists</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Heart className="w-8 h-8 text-accent" />
              <p className="text-sm font-medium">Compassionate Care</p>
              <p className="text-xs text-gray-400">Patient-First Approach</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Users className="w-8 h-8 text-accent" />
              <p className="text-sm font-medium">Family-Friendly</p>
              <p className="text-xs text-gray-400">All Ages Welcome</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © 2024 ENT Excellence. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Licensed Healthcare Provider | State License #12345
              </p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-gray-300 hover:text-accent transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}