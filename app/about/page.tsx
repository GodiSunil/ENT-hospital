"use client";

import { motion, useInView, useAnimation, Variants, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

// AnimatedCard component with fade-in and scale animation
interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  hoverY?: number;
  hoverScale?: number;
  borderColor?: string;
  hoverBorderColor?: string;
}

const AnimatedCard = ({
  children,
  delay = 0,
  className = "",
  hoverY = -5,
  hoverScale = 1.03,
  borderColor = "transparent",
  hoverBorderColor = "rgba(139, 92, 246, 0.3)"
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: hoverY,
        scale: hoverScale,
        borderColor: hoverBorderColor,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: delay * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100
      }}
      className={`w-full h-full transition-all duration-300 border-2 ${className}`}
      style={{
        borderColor: borderColor,
      }}
    >
      {children}
    </motion.div>
  );
};
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Award, Users, Clock, Heart, Shield, Star, CheckCircle, Target, Eye, Lightbulb } from 'lucide-react';
import Doctors from '@/components/about/Doctors';
import { EntCarousel } from '@/components/ui/ent-carousel';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Custom hook for scroll animations
const useScrollAnimation = (ref: React.RefObject<HTMLElement>, threshold = 0.2) => {
  const controls = useAnimation();
  const elementInView = useInView(ref, { once: true, amount: threshold });

  useEffect(() => {
    if (elementInView) {
      controls.start('visible');
    }
  }, [controls, elementInView]);

  return [controls, ref];
};

const stats = [
  { 
    icon: Users, 
    value: "10,000+", 
    label: "Patients Treated",
    color: "from-blue-500 to-cyan-400"
  },
  { 
    icon: Award, 
    value: "25+", 
    label: "Years Experience",
    color: "from-purple-500 to-pink-500"
  },
  { 
    icon: Clock, 
    value: "24/7", 
    label: "Emergency Care",
    color: "from-green-500 to-emerald-400"
  },
  { 
    icon: Star, 
    value: "4.9/5", 
    label: "Patient Rating",
    color: "from-amber-400 to-yellow-300"
  },
];

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We treat every patient with empathy, respect, and personalized attention to ensure comfort and healing."
  },
  {
    icon: Shield,
    title: "Excellence & Safety",
    description: "Our commitment to the highest medical standards ensures safe, effective treatments with cutting-edge technology."
  },
  {
    icon: Target,
    title: "Patient-Centered",
    description: "Every decision we make prioritizes our patients' health, comfort, and overall well-being."
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We believe in clear communication, honest pricing, and keeping patients informed throughout their care."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously adopt the latest medical advances to provide the most effective treatments available."
  },
  {
    icon: Users,
    title: "Team Excellence",
    description: "Our multidisciplinary team works collaboratively to deliver comprehensive, coordinated care."
  }
];



export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.2,
                    type: 'spring',
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <motion.div 
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                  >
                    <Award className="w-4 h-4 mr-2 text-primary" />
                  </motion.div>
                  <span className="text-primary font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    About ENT Excellence
                  </span>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  className="space-y-2"
                >
                  <motion.h1 
                    variants={fadeInUp}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold font-manrope bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 leading-tight"
                  >
                    25 Years of
                  </motion.h1>
                  <motion.span 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 100,
                          damping: 10
                        }
                      }
                    }}
                    className="text-gradient block text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
                  >
                    Medical Excellence
                  </motion.span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.8, 
                      delay: 0.5,
                      ease: [0.16, 1, 0.3, 1]
                    } 
                  }}
                  className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
                >
                  <motion.span 
                    className="inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { delay: 0.7 }
                    }}
                  >
                    Since 1999, ENT Excellence has been at the forefront of ear, nose, and throat care, 
                    combining advanced medical technology with compassionate patient care to deliver 
                    exceptional outcomes for our community.
                  </motion.span>
                </motion.p>
              </div>

              {/* Stats */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mt-12 px-6"
              >
                {stats.map((stat, index) => {
                  const colors = [
                    'from-blue-500 via-blue-600 to-blue-700',
                    'from-emerald-500 via-emerald-600 to-emerald-700',
                    'from-amber-500 via-amber-600 to-amber-700',
                    'from-rose-500 via-rose-600 to-rose-700'
                  ][index % 4];
                  
                  const icons = [
                    <Users className="w-8 h-8 mb-3 text-white/90" />,
                    <Award className="w-8 h-8 mb-3 text-white/90" />,
                    <Clock className="w-8 h-8 mb-3 text-white/90" />,
                    <Star className="w-8 h-8 mb-3 text-white/90" />
                  ][index % 4];
                  
                  return (
                    <AnimatedCard key={stat.label} delay={index} className="aspect-square">
                      <motion.div 
                        variants={fadeInUp}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className={`relative h-full w-full p-5 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center 
                        transition-all duration-500 overflow-hidden group`}
                      >
                        {/* Animated background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${colors} opacity-90 group-hover:opacity-100 
                          transition-opacity duration-500`}></div>
                        
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/30 to-white/10 -translate-x-full 
                          group-hover:translate-x-full transition-transform duration-700"></div>
                        
                        <div className="relative z-10 w-full px-2">
                          {/* Icon with subtle float animation */}
                          <motion.div
                            animate={{
                              y: [0, -5, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              repeatType: 'reverse',
                              ease: 'easeInOut'
                            }}
                            className="flex justify-center mb-1 md:mb-2"
                          >
                            {React.cloneElement(icons, { className: 'w-4 h-4 md:w-5 md:h-5 text-white/90' })}
                          </motion.div>
                          
                          {/* Value with counter animation */}
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                            className="mb-1 md:mb-2"
                          >
                            <div className="w-full flex justify-center">
                              <span className="text-xl md:text-2xl font-extrabold text-white drop-shadow-sm leading-none">
                                {stat.value}
                              </span>
                            </div>
                          </motion.div>
                          
                          {/* Label with subtle underline on hover */}
                          <motion.div 
                            className="relative w-full flex justify-center"
                          >
                            <span className="text-[11px] md:text-xs font-medium text-white/90 group-hover:text-white whitespace-nowrap">
                              {stat.label}
                            </span>
                          </motion.div>
                        </div>
                      </motion.div>
                    </AnimatedCard>
                  );
                })}
              </motion.div>

              {/* Original stats mapping preserved */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="hidden"
              >
                {stats.map((stat, index) => (
                  <AnimatedCard key={stat.label} delay={index}>
                    <motion.div 
                      variants={fadeInUp}
                      className="text-center p-6 bg-gradient-to-br from-background/90 to-background/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-border/20 hover:border-primary/30 relative overflow-hidden group h-full"
                      whileHover={{ 
                        y: -5,
                        transition: { 
                          type: 'spring', 
                          stiffness: 300,
                          damping: 10 
                        } 
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10"
                        whileHover={{ 
                          rotate: [0, -5, 5, 0],
                          scale: 1.1,
                          transition: { duration: 0.5 }
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <stat.icon className={`w-7 h-7 ${stat.color} relative z-10`} />
                      </motion.div>
                      <motion.div 
                        className="text-3xl font-bold text-foreground font-manrope mb-1 relative z-10"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + (index * 0.1) }}
                      >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                          {stat.value}
                        </span>
                      </motion.div>
                      <motion.div 
                        className="text-sm font-medium text-muted-foreground mt-1 relative z-10"
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                      >
                        {stat.label}
                      </motion.div>
                    </motion.div>
                  </AnimatedCard>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 2 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                rotate: 0,
                transition: { 
                  duration: 0.8, 
                  delay: 0.4,
                  type: 'spring',
                  stiffness: 60,
                  damping: 12
                } 
              }}
              whileHover={{ 
                y: -10,
                transition: { 
                  type: 'spring',
                  stiffness: 300,
                  damping: 10
                } 
              }}
              className="relative z-10"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:shadow-3xl">
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 10,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }}
                >
                  <Image
                    src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop"
                    alt="Modern medical facility"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover"
                    priority
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/10 to-transparent" />
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-xl backdrop-blur-sm border border-accent/30"
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                <motion.div 
                  className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full backdrop-blur-sm border border-primary/30"
                  animate={{
                    y: [0, 15, 0],
                  }}
                  transition={{
                    duration: 5,
                    delay: 1,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-background to-white/50 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-primary/20 to-accent/20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <motion.div 
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-accent/20 to-primary/20"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
            delay: 2
          }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-primary/30 to-accent/30"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              y: [0, Math.random() * 100 - 50, 0],
              x: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse' as const,
              ease: 'easeInOut'
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  } 
                }
              }}
              className="relative overflow-hidden group bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-500"
              whileHover={{ 
                y: -8,
                scale: 1.01,
                transition: { 
                  type: 'spring', 
                  stiffness: 300,
                  damping: 10 
                } 
              }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-200/30 rounded-full blur-3xl"></div>
              
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-6"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              >
                <Target className="w-8 h-8 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold font-manrope bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
                Our Mission
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6 relative z-10">
                To provide exceptional ear, nose, and throat care through innovative treatments, 
                compassionate service, and a commitment to improving the quality of life for every 
                patient we serve.
              </p>
              
              <div className="space-y-3 relative z-10">
                {[
                  "Deliver personalized, patient-centered care",
                  "Utilize cutting-edge medical technology",
                  "Maintain the highest safety standards",
                  "Foster a culture of continuous improvement"
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-3 group-hover:bg-white/50 p-2 rounded-lg transition-all duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: 0.1 * index,
                        duration: 0.5 
                      } 
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="p-1"
                    >
                      <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    </motion.div>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200/50 transition-all duration-700 pointer-events-none"></div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1]
                  } 
                }
              }}
              className="relative overflow-hidden group bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-500"
              whileHover={{ 
                y: -8,
                scale: 1.01,
                transition: { 
                  type: 'spring', 
                  stiffness: 300,
                  damping: 10 
                } 
              }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-3xl"></div>
              
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mb-6"
                animate={{
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 6,
                  delay: 0.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              >
                <Eye className="w-8 h-8 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold font-manrope bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
                Our Vision
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6 relative z-10">
                To be the leading center for ENT care, setting new standards in medical excellence, 
                patient experience, and innovative treatments. We envision a future where every individual 
                has access to world-class ENT healthcare that enhances their quality of life.
              </p>
              
              <div className="space-y-3 relative z-10">
                {[
                  "Pioneer advanced ENT treatments",
                  "Expand access to specialized care",
                  "Foster medical innovation and research",
                  "Build healthier communities"
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-3 group-hover:bg-white/50 p-2 rounded-lg transition-all duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: 0.1 * index + 0.2,
                        duration: 0.5 
                      } 
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="p-1"
                    >
                      <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    </motion.div>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-200/50 transition-all duration-700 pointer-events-none"></div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <AnimatedCard 
            className="mt-12"
            delay={0.4}
            hoverY={-5}
            hoverScale={1.01}
            borderColor="rgba(99, 102, 241, 0.2)"
            hoverBorderColor="rgba(99, 102, 241, 0.4)"
          >
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 rounded-xl">
              <h3 className="text-2xl font-bold font-manrope text-foreground mb-4">Looking Forward</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We continue to invest in advanced technologies, expand our services, and train 
                our team to ensure we remain at the forefront of ENT medicine, always putting 
                our patients first.
              </p>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                width: Math.random() * 300 + 100 + 'px',
                height: Math.random() * 300 + 100 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                background: `radial-gradient(circle, ${
                  [
                    'rgba(99, 102, 241, 0.4)',
                    'rgba(168, 85, 247, 0.4)',
                    'rgba(59, 130, 246, 0.4)',
                    'rgba(14, 165, 233, 0.4)'
                  ][Math.floor(Math.random() * 4)]
                }, transparent 70%)`
              }}
              animate={{
                y: [0, Math.random() * 100 - 50, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                repeatType: 'reverse' as const,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold font-manrope bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4"
            >
              Our Core Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              These fundamental principles guide everything we do and shape our commitment to excellence
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              // Define color variants for cards
              const colorVariants = [
                'from-blue-500 via-blue-600 to-blue-700',
                'from-purple-500 via-purple-600 to-purple-700',
                'from-pink-500 via-pink-600 to-pink-700',
                'from-emerald-500 via-emerald-600 to-emerald-700',
                'from-amber-500 via-amber-600 to-amber-700',
                'from-indigo-500 via-indigo-600 to-indigo-700'
              ];
              
              const gradient = colorVariants[index % colorVariants.length];
              
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    } 
                  }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { 
                      type: 'spring', 
                      stiffness: 300,
                      damping: 10 
                    } 
                  }}
                  className="relative overflow-hidden group bg-background rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-500"
                >
                  {/* Animated gradient border */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative p-6 h-full bg-background/95 backdrop-blur-sm group-hover:bg-background/80 transition-all duration-500">
                    <motion.div 
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${gradient} shadow-lg`}
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: 'reverse' as const,
                        ease: 'easeInOut',
                        delay: index * 0.5
                      }}
                    >
                      <value.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold font-manrope bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 mb-3 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-500">
                      {value.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors duration-500">
                      {value.description}
                    </p>
                    
                    {/* Animated underline */}
                    <motion.div 
                      className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent w-0 group-hover:w-full mt-4 transition-all duration-500"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <Doctors />

      {/* 3D Carousel Gallery */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold font-manrope text-foreground mb-4"
            >
              Our World of ENT Care
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              Exploring the latest in ear, nose, and throat healthcare
            </motion.p>
          </div>

          {/* 3D Carousel Component */}
          <div className="relative h-[600px] w-full flex items-center justify-center">
            <EntCarousel />
          </div>

          <div className="mt-16 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              Our state-of-the-art facilities and expert team provide comprehensive care for all ear, nose, and throat conditions.
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}