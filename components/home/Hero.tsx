"use client";

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Phone, MapPin, Users, Award, Clock, Activity, HeartPulse, Stethoscope, Ear, ActivityIcon, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EtherealShadow } from '@/components/ui/ethereal-shadow';

// Type for the icon configuration
interface IconConfig {
  Icon: React.ComponentType<{ className?: string }>;
  size: number;
  color: string;
}

// Props for the FloatingIcon component
interface FloatingIconProps {
  Icon: React.ComponentType<{ className?: string }>;
  delay: number;
  size?: number;
  color?: string;
}

const FloatingIcon = ({ 
  Icon, 
  delay, 
  size = 20, 
  color = "text-primary/10" 
}: FloatingIconProps) => {
  return (
    <motion.div
      initial={{ y: 0, x: 0, opacity: 0.3 }}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 10 + Math.random() * 10,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
      className={`absolute ${color}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <Icon className="w-full h-full" />
    </motion.div>
  );
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setMounted(true);
    controls.start({
      scale: [1, 1.02, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, [controls]);

  type IconType = React.ComponentType<{ className?: string }> | (() => JSX.Element);

  interface StatItem {
    icon: IconType;
    value: string;
    label: string;
    gradient: string;
    iconColor: string;
  }

  const Star = ({ className = '' }: { className?: string }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  const stats: StatItem[] = [
    { 
      icon: Users, 
      value: "10,000+", 
      label: "Happy Patients",
      gradient: "from-blue-500 to-blue-400",
      iconColor: "text-blue-100"
    },
    { 
      icon: Stethoscope, 
      value: "50+", 
      label: "Expert Doctors",
      gradient: "from-green-500 to-emerald-400",
      iconColor: "text-green-100"
    },
    { 
      icon: Clock, 
      value: "24/7", 
      label: "Emergency Care",
      gradient: "from-amber-500 to-orange-500",
      iconColor: "text-amber-100"
    },
    { 
      icon: Star,
      value: "5/5", 
      label: "Rated by 500+ patients",
      gradient: "from-emerald-500 to-teal-400",
      iconColor: "text-emerald-100"
    },
  ];

  const icons: IconConfig[] = [
    { Icon: Activity, size: 24, color: "text-primary/10" },
    { Icon: HeartPulse, size: 28, color: "text-accent/10" },
    { Icon: Stethoscope, size: 32, color: "text-primary/10" },
    { Icon: Ear, size: 20, color: "text-accent/10" },
    { Icon: ActivityIcon, size: 26, color: "text-primary/10" },
  ];

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base Gradient */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(45deg, #e0e7ff, #e0f2fe, #f0f9ff, #e0e7ff)',
            backgroundSize: '400% 400%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* Large Moving Blob */}
        <motion.div 
          className="absolute rounded-full"
          style={{
            width: '1000px',
            height: '1000px',
            left: '50%',
            top: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: ['-30%', '30%', '-30%'],
            y: ['-30%', '30%', '-30%'],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Secondary Blob */}
        <motion.div 
          className="absolute rounded-full"
          style={{
            width: '800px',
            height: '800px',
            right: '10%',
            bottom: '10%',
            background: 'radial-gradient(circle, rgba(165, 180, 252, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: ['0%', '20%', '0%'],
            y: ['0%', '20%', '0%'],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 10
          }}
        />
      </div>
      
      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingIcon
            key={i}
            Icon={icons[i % icons.length].Icon}
            size={icons[i % icons.length].size * (0.8 + Math.random() * 0.8)}
            color={icons[i % icons.length].color}
            delay={i * 0.5}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-foreground space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-primary/5 backdrop-blur-sm rounded-full border border-primary/10"
              >
                <Award className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm font-medium text-foreground">Premier ENT Care Since 1999</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-manrope hero-title leading-tight"
              >
                Excellence in
                <span className="text-gradient block">ENT Healthcare</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed"
              >
                Comprehensive ear, nose, and throat care with cutting-edge technology 
                and compassionate specialists dedicated to your health and comfort.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/book-appointment">
                <Button className="btn-primary bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Book Appointment
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button className="btn-primary bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Call Us Now
                </Button>
              </Link>
            </motion.div>



            {/* Quick Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 pt-4"
            >
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm">123 Medical Center Drive</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.5, 
                      delay: 0.2 + index * 0.1,
                      ease: [0.4, 0, 0.2, 1]
                    } 
                  }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`relative overflow-hidden group bg-gradient-to-br ${stat.gradient} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer`}
                >
                  {/* Animated background elements */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 ${stat.iconColor}`}>
                      {React.isValidElement(stat.icon) ? (
                        stat.icon
                      ) : (
                        <div className="w-6 h-6">
                          {React.createElement(stat.icon as React.ComponentType<{ className?: string }>, { className: 'w-full h-full' })}
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                    <p className="text-white/90 text-sm font-medium">{stat.label}</p>
                  </div>
                  
                  {/* Subtle static dot */}
                  <div className="absolute -right-2 -bottom-2 w-16 h-16 rounded-full bg-white/10 blur-md"></div>
                </motion.div>
              ))}
            </div>

            {/* Trust Badge */}

          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}