"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Ear, Zap, Mic, Baby, Volume2, Wind, Flower2, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Ear,
    name: "Ear Treatments",
    description: "Comprehensive ear care including hearing loss treatment, ear infections, and balance disorders.",
    features: ["Hearing Tests", "Ear Cleaning", "Infection Treatment", "Balance Therapy"],
    color: "from-blue-500 to-cyan-500",
    href: "/services#ear"
  },
  {
    icon: Zap,
    name: "Nose Treatments", 
    description: "Advanced nasal and sinus treatments for breathing problems, allergies, and structural issues.",
    features: ["Sinus Surgery", "Septum Repair", "Allergy Testing", "Nasal Polyps"],
    color: "from-green-500 to-emerald-500",
    href: "/services#nose"
  },
  {
    icon: Mic,
    name: "Throat Treatments",
    description: "Expert throat care for voice disorders, swallowing problems, and throat conditions.",
    features: ["Voice Therapy", "Throat Surgery", "Swallowing Tests", "Cancer Screening"],
    color: "from-purple-500 to-pink-500",
    href: "/services#throat"
  },
  {
    icon: Baby,
    name: "Pediatric ENT",
    description: "Specialized care for children's ear, nose, and throat conditions with gentle approach.",
    features: ["Child-Friendly", "Tonsil Surgery", "Ear Tubes", "Speech Therapy"],
    color: "from-orange-500 to-red-500",
    href: "/services#pediatric"
  },
  {
    icon: Volume2,
    name: "Hearing Solutions",
    description: "Complete hearing services from testing to hearing aid fitting and cochlear implants.",
    features: ["Hearing Aids", "Cochlear Implants", "Tinnitus Treatment", "Custom Plugs"],
    color: "from-indigo-500 to-blue-500",
    href: "/services#hearing"
  },
  {
    icon: Wind,
    name: "Voice Therapy",
    description: "Professional voice treatment for singers, speakers, and voice disorder patients.",
    features: ["Voice Analysis", "Vocal Training", "Surgery Options", "Professional Voice"],
    color: "from-teal-500 to-green-500",
    href: "/services#voice"
  }
];

// Helper function to extract color from gradient
const getColor = (gradient: string, opacity: number) => {
  // Extract the first color from the gradient
  const colorMatch = gradient.match(/from-([a-z]+)-(\d+)/);
  if (!colorMatch) return `rgba(74, 108, 247, ${opacity})`; // Default primary color
  
  const colorName = colorMatch[1];
  const colorShade = colorMatch[2];
  
  // Map Tailwind colors to RGB values
  const colorMap: Record<string, Record<string, string>> = {
    blue: { '500': '59, 130, 246' },
    green: { '500': '16, 185, 129' },
    purple: { '500': '139, 92, 246' },
    orange: { '500': '249, 115, 22' },
    indigo: { '500': '99, 102, 241' },
    pink: { '500': '236, 72, 153' },
  };
  
  const rgb = colorMap[colorName]?.[colorShade] || '74, 108, 247';
  return `rgba(${rgb}, ${opacity})`;
};

export default function Services() {
  return (
    <section className="py-20 bg-cyan-100dark:bg-gray-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              background: `radial-gradient(circle, ${getColor('from-blue-500 to-cyan-500', 0.3)}, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
            }}
            transition={{
              duration: 30 + Math.random() * 30,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      
      <style jsx global>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4"
          >
            <Flower2 className="w-4 h-4 mr-2 text-primary" />
            <span className="text-primary font-medium">Our Specialties</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-manrope text-foreground mb-6"
          >
            Comprehensive ENT Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            From routine care to complex procedures, our specialists provide expert treatment 
            for all ear, nose, and throat conditions with the latest medical technology.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl z-10"
              style={{
                background: 'linear-gradient(45deg, #ffffff, #f8f9fa, #ffffff, #f8f9fa)',
                backgroundSize: '300% 300%',
                animation: 'gradientBG 15s ease infinite',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}
            >
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `linear-gradient(45deg, ${getColor(service.color, 0.1)}, ${getColor(service.color, 0.05)}, ${getColor(service.color, 0.1)})`,
                  backgroundSize: '300% 300%',
                  animation: 'gradientBG 15s ease infinite',
                }}
              />

              {/* Card Content */}
              <div className="relative z-10">
                {/* Icon with Floating Animation */}
                <motion.div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 mb-6 mx-auto`}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title & Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold font-manrope text-center text-gray-900 dark:text-white mb-4">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-6">
                    {service.description}
                  </p>
                </motion.div>

                {/* Animated Features */}
                <motion.ul className="mb-6 space-y-3">
                  {service.features.map((feature, i) => (
                    <motion.li 
                      key={feature}
                      className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <motion.span 
                        className="w-2 h-2 rounded-full bg-accent mr-3"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Animated CTA */}
                <motion.div 
                  className="mt-8 text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={service.href}>
                    <Button 
                      className={`px-6 py-2 rounded-full bg-gradient-to-r ${service.color} text-white font-medium hover:shadow-lg transition-all duration-300`}
                    >
                      <span className="flex items-center">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-primary to-accent p-8 rounded-2xl text-white"
        >
          <h3 className="text-2xl font-bold font-manrope mb-4">
            Not Sure Which Service You Need?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Our specialists will help determine the best treatment plan for your specific condition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 font-semibold">
                Schedule Consultation
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="border-white/30 text-black hover:bg-accent/10 px-8 py-3 font-semibold">
                View All Services
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}