"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Baby, 
  Heart, 
  Shield, 
  Star, 
  Calendar, 
  Users, 
  Stethoscope,
  Smile,
  Award,
  CheckCircle,
  Phone,
  Clock,
  MapPin,
  Gamepad2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: Baby,
    name: "Ear Tube Surgery",
    description: "Gentle ear tube placement for chronic ear infections and hearing issues.",
    ageRange: "6 months - 12 years",
    duration: "15-20 minutes",
    recovery: "Same day"
  },
  {
    icon: Smile,
    name: "Tonsil & Adenoid Surgery",
    description: "Safe removal of enlarged tonsils and adenoids to improve breathing and sleep.",
    ageRange: "2 - 18 years",
    duration: "30-45 minutes",
    recovery: "1-2 weeks"
  },
  {
    icon: Stethoscope,
    name: "Hearing Evaluations",
    description: "Comprehensive hearing tests designed specifically for children of all ages.",
    ageRange: "Newborn - 18 years",
    duration: "30-60 minutes",
    recovery: "None required"
  },
  {
    icon: Heart,
    name: "Speech & Language Support",
    description: "Evaluation and treatment for speech delays related to hearing or structural issues.",
    ageRange: "1 - 18 years",
    duration: "45-60 minutes",
    recovery: "Ongoing therapy"
  }
];

const conditions = [
  {
    name: "Chronic Ear Infections",
    symptoms: ["Frequent ear pain", "Hearing difficulties", "Fluid drainage", "Fever"],
    treatment: "Ear tubes, antibiotics, or surgical intervention"
  },
  {
    name: "Enlarged Tonsils/Adenoids",
    symptoms: ["Snoring", "Sleep apnea", "Difficulty swallowing", "Mouth breathing"],
    treatment: "Tonsillectomy, adenoidectomy, or both"
  },
  {
    name: "Hearing Loss",
    symptoms: ["Not responding to sounds", "Speech delays", "Loud TV/music", "Academic struggles"],
    treatment: "Hearing aids, cochlear implants, or medical management"
  },
  {
    name: "Sinus Problems",
    symptoms: ["Chronic congestion", "Facial pain", "Bad breath", "Thick nasal discharge"],
    treatment: "Medications, nasal irrigation, or minimally invasive surgery"
  }
];

const stats = [
  { icon: Users, value: "2,500+", label: "Children Treated" },
  { icon: Star, value: "4.9/5", label: "Parent Rating" },
  { icon: Award, value: "15+", label: "Years Pediatric Experience" },
  { icon: Heart, value: "99%", label: "Parent Satisfaction" },
];

const tips = [
  {
    title: "Preparing Your Child",
    content: "Explain the visit in simple, age-appropriate terms. Bring comfort items like a favorite toy or blanket."
  },
  {
    title: "What to Expect",
    content: "Our child-friendly environment includes colorful decorations, toys, and staff trained in pediatric care."
  },
  {
    title: "After the Visit",
    content: "We provide clear instructions and are always available for questions about your child's care."
  }
];

export default function PediatricENT() {
  return (
    <div className="min-h-screen bg-background pt-32">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full"
                >
                  <Baby className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-blue-600 font-medium">Pediatric ENT Specialists</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl md:text-5xl font-bold font-manrope text-foreground leading-tight"
                >
                  Gentle Care for
                  <span className="text-gradient block">Little Ears, Noses & Throats</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-xl text-muted-foreground leading-relaxed"
                >
                  Specialized ENT care designed just for children, with a gentle approach, 
                  child-friendly environment, and parents who trust us with their most precious patients.
                </motion.p>
              </div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="grid grid-cols-2 gap-4"
              >
                {stats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-white/80 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <stat.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-foreground font-manrope">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/book-appointment">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Pediatric Appointment
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="px-8 py-3 text-lg font-semibold">
                    <Phone className="w-5 h-5 mr-2" />
                    Ask Questions
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden medical-shadow">
                <Image
                  src="https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Child-friendly medical environment"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
                
                {/* Floating Elements */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Gamepad2 className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-foreground">Child-Friendly</span>
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-3 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-foreground">Safe & Gentle</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold font-manrope text-foreground mb-4"
            >
              Specialized Pediatric Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Comprehensive ENT care tailored specifically for children&apos;s unique needs
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover-lift">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.name}</CardTitle>
                        <CardDescription className="text-blue-600 font-medium">
                          Ages: {service.ageRange}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-foreground">Duration:</span>
                        <p className="text-muted-foreground">{service.duration}</p>
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Recovery:</span>
                        <p className="text-muted-foreground">{service.recovery}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Conditions */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold font-manrope text-foreground mb-4"
            >
              Common Pediatric ENT Conditions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              Conditions we commonly treat in children
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {conditions.map((condition, index) => (
              <motion.div
                key={condition.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl medical-shadow"
              >
                <h3 className="text-xl font-bold font-manrope text-foreground mb-4">
                  {condition.name}
                </h3>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Common Symptoms:</h4>
                  <ul className="space-y-1">
                    {condition.symptoms.map((symptom) => (
                      <li key={symptom} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-1">Treatment Approach:</h4>
                  <p className="text-blue-700 text-sm">{condition.treatment}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold font-manrope text-foreground mb-4"
            >
              Why Parents Choose Us
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-foreground font-manrope mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Tips */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold font-manrope text-foreground mb-4"
            >
              Tips for Parents
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              Making your child&apos;s visit comfortable and stress-free
            </motion.p>
          </div>

          <div className="space-y-6">
            {tips.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl medical-shadow"
              >
                <h3 className="text-lg font-bold font-manrope text-foreground mb-3">
                  {tip.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {tip.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-manrope">
                Ready to Schedule Your Child&apos;s Visit?
              </h2>
              <p className="text-xl opacity-90">
                Our pediatric ENT specialists are here to provide gentle, expert care for your little one.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Mon-Fri: 8AM-6PM</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Pediatric Wing</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="/book-appointment">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 font-semibold">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 font-semibold">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Us Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}