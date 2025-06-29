"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import * as Tabs from '@radix-ui/react-tabs';
import { 
  Ear, 
  Zap, 
  Mic, 
  Baby, 
  Volume2, 
  Wind, 
  ArrowRight, 
  CheckCircle,
  Clock,
  DollarSign,
  ChevronDown,
  X,
  Shield,
  Star,
  Flower2,
  Plus,
  Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    } 
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

type Service = {
  id: string;
  icon: any;
  name: string;
  description: string;
  image: string;
  procedures: string[];
  symptoms: string[];
  duration: string;
  recovery: string;
  cost: string;
  category: string;
};

const services: Service[] = [
  {
    id: 'ear',
    icon: Ear,
    name: "Ear Treatments",
    description: "Comprehensive ear care including hearing loss treatment, ear infections, and balance disorders.",
    image: "https://images.squarespace-cdn.com/content/v1/5beb00a47e3c3abd688e43b4/1571821396873-MG7MQSS1FON62HFBZG1P/hearing+loss+treatment",
    procedures: [
      "Hearing Tests & Audiometry",
      "Ear Cleaning & Wax Removal",
      "Infection Treatment",
      "Balance Disorder Therapy",
      "Tympanoplasty",
      "Mastoidectomy",
      "Cochlear Implants",
      "Hearing Aid Fitting"
    ],
    symptoms: [
      "Hearing loss",
      "Ear pain or discomfort",
      "Ringing in ears (tinnitus)",
      "Dizziness or balance issues",
      "Ear discharge",
      "Feeling of fullness"
    ],
    duration: "30-90 minutes",
    recovery: "1-2 weeks for minor procedures, 4-6 weeks for surgery",
    cost: "$150 - $5,000 depending on treatment",
    category: "ear"
  },
  {
    id: 'nose',
    icon: Zap,
    name: "Nose Treatments",
    description: "Advanced nasal and sinus treatments for breathing problems, allergies, and structural issues.",
    image: "https://www.enthealth.co.in/assets/images/nose-treatment.jpg",
    procedures: [
      "Sinus Surgery (Endoscopic)",
      "Septoplasty",
      "Turbinate Reduction",
      "Nasal Polyp Removal",
      "Rhinoplasty (Functional)",
      "Allergy Testing",
      "Balloon Sinuplasty",
      "Nasal Fracture Repair"
    ],
    symptoms: [
      "Chronic congestion",
      "Sinus pressure/pain",
      "Difficulty breathing",
      "Frequent sinus infections",
      "Loss of smell",
      "Nasal discharge"
    ],
    duration: "45-120 minutes",
    recovery: "1-3 weeks for most procedures",
    cost: "$200 - $8,000 depending on treatment",
    category: "nose"
  },
  {
    id: 'throat',
    icon: Mic,
    name: "Throat Treatments",
    description: "Expert throat care for voice disorders, swallowing problems, and throat conditions.",
    image: "https://media.istockphoto.com/id/1406148527/photo/endocrinologist-examining-throat-of-young-woman-in-clinic-women-with-thyroid-gland-test.jpg?s=612x612&w=0&k=20&c=S3HxAxWob9K0SWybuCju2UAIx6vtcuGb7LFPPgUbZqA=",
    procedures: [
      "Voice Therapy",
      "Laryngoscopy",
      "Throat Surgery",
      "Swallowing Studies",
      "Vocal Cord Surgery",
      "Throat Cancer Screening",
      "Sleep Apnea Treatment",
      "Acid Reflux Management"
    ],
    symptoms: [
      "Hoarseness",
      "Difficulty swallowing",
      "Chronic cough",
      "Throat pain",
      "Voice changes",
      "Breathing difficulties"
    ],
    duration: "30-180 minutes",
    recovery: "Voice rest 1-2 weeks, full recovery 2-6 weeks",
    cost: "$175 - $12,000 depending on treatment",
    category: "throat"
  },
  {
    id: 'pediatric',
    icon: Baby,
    name: "Pediatric ENT",
    description: "Specialized care for children's ear, nose, and throat conditions with gentle approach.",
    image: "https://plus.unsplash.com/premium_photo-1666299880508-bffece864e96?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVkaWF0cmljfGVufDB8fDB8fHww",
    procedures: [
      "Tonsillectomy",
      "Adenoidectomy",
      "Ear Tube Placement",
      "Pediatric Hearing Tests",
      "Speech Therapy",
      "Cleft Palate Repair",
      "Airway Reconstruction",
      "Pediatric Sleep Studies"
    ],
    symptoms: [
      "Frequent ear infections",
      "Snoring/sleep issues",
      "Speech delays",
      "Chronic congestion",
      "Difficulty swallowing",
      "Hearing problems"
    ],
    duration: "30-120 minutes",
    recovery: "1-2 weeks with special pediatric care",
    cost: "$300 - $6,000 depending on treatment",
    category: "pediatric"
  },
  {
    id: 'hearing',
    icon: Volume2,
    name: "Hearing Solutions",
    description: "Complete hearing services from testing to hearing aid fitting and cochlear implants.",
    image: "https://media.istockphoto.com/id/1400617723/photo/close-up-of-hearing-aid-near-senior-patients-ear-at-audiology-clinic-hearing-solutions.jpg?s=612x612&w=0&k=20&c=YBLOxAu-jHJR9CBqGapBtJUztlf1LjgvYlHsOLSx8SE=",
    procedures: [
      "Comprehensive Hearing Tests",
      "Hearing Aid Fitting",
      "Cochlear Implant Surgery",
      "Tinnitus Treatment",
      "Custom Ear Protection",
      "Bone-Anchored Hearing Aids",
      "Auditory Processing Tests",
      "Hearing Conservation"
    ],
    symptoms: [
      "Gradual hearing loss",
      "Difficulty in conversations",
      "Ringing in ears",
      "Asking for repetition",
      "TV volume too loud",
      "Social withdrawal"
    ],
    duration: "60-240 minutes",
    recovery: "Immediate for devices, 4-8 weeks for surgery",
    cost: "$500 - $40,000 depending on solution",
    category: "hearing"
  },
  {
    id: 'voice',
    icon: Wind,
    name: "Voice Therapy",
    description: "Professional voice treatment for singers, speakers, and voice disorder patients.",
    image: "https://kdahweb-static.kokilabenhospital.com/kdah-2019/shop/package/images/1647954468.jpg",
    procedures: [
      "Voice Analysis",
      "Vocal Therapy Sessions",
      "Professional Voice Training",
      "Vocal Cord Injection",
      "Laryngeal Surgery",
      "Breathing Techniques",
      "Performance Voice Care",
      "Voice Rehabilitation"
    ],
    symptoms: [
      "Voice fatigue",
      "Hoarseness",
      "Voice breaks",
      "Reduced vocal range",
      "Throat strain",
      "Professional voice concerns"
    ],
    duration: "45-90 minutes per session",
    recovery: "Gradual improvement over 6-12 weeks",
    cost: "$150 - $3,000 for therapy program",
    category: "voice"
  }
];

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  index: number;
}

const ServiceCard = ({ service, onClick, index }: ServiceCardProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            type: 'spring',
            stiffness: 100
          }
        }
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <motion.div 
          className="relative w-full h-full"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        <motion.div 
          className="absolute top-4 right-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full p-2 shadow-lg"
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <service.icon className="w-6 h-6" />
          </motion.div>
        </motion.div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.h3 
            className="text-xl font-bold text-white"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {service.name}
          </motion.h3>
          <motion.p 
            className="text-sm text-white/90 mt-1 line-clamp-2"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {service.description}
          </motion.p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <motion.div 
            className="bg-primary/10 p-3 rounded-xl group/icon"
            whileHover={{ 
              rotate: [0, 10, -10, 0],
              transition: { duration: 0.6 }
            }}
          >
            <service.icon className="w-8 h-8 text-primary group-hover/icon:text-accent transition-colors duration-300" />
          </motion.div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{service.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{service.cost}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="ghost" 
              className="group relative overflow-hidden bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all duration-300 border border-transparent hover:border-primary/20"
            >
              <span className="relative z-10 flex items-center">
                Learn More
                <motion.span 
                  className="ml-2"
                  initial={{ x: 0 }}
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex -space-x-2"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i} 
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  show: { opacity: 1, x: 0 }
                }}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-white dark:border-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

const ServiceModal = ({ service, onClose }: ServiceModalProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={fadeIn}
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          variants={scaleUp}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-64 md:h-80">
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover"
              priority
            />
            <motion.div 
              className="absolute top-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-2 shadow-lg cursor-pointer hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 group"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-accent transition-colors" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-3xl font-bold text-white">{service.name}</h2>
              <p className="text-white/90 mt-2">{service.description}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
              {['overview', 'procedures', 'symptoms', 'details'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose dark:prose-invert max-w-none"
                >
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Our {service.name.toLowerCase()} services provide comprehensive care and treatment for a wide range of conditions.
                    Our team of specialists is dedicated to providing the highest quality care using the latest techniques and technology.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium">Duration</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{service.duration}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <span className="font-medium">Cost</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{service.cost}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'procedures' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {service.procedures.map((procedure, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-200">{procedure}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'symptoms' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {service.symptoms.map((symptom, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
                    >
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-200">{symptom}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'details' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Recovery Time</h4>
                    <p className="text-gray-700 dark:text-gray-300">{service.recovery}</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">What to Expect</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      During your {service.name.toLowerCase()} consultation, our specialist will conduct a thorough examination and discuss the best treatment options for your specific needs.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">Personalized treatment plan</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">Minimal discomfort</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">Expert care from our specialists</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-white dark:border-gray-800" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p className="font-medium">Our Specialists</p>
                    <p>Ready to help you</p>
                  </div>
                </div>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                  Book an Appointment
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <motion.div 
    className="border-b border-gray-200 dark:border-gray-700 py-4"
    initial={false}
    animate={{ 
      backgroundColor: isOpen ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
      transition: { duration: 0.2 }
    }}
  >
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-left focus:outline-none"
    >
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{question}</h3>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-gray-500 dark:text-gray-400"
      >
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </motion.div>
    </button>
    <motion.div
      initial={false}
      animate={{
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        marginTop: isOpen ? '0.75rem' : 0,
      }}
      className="overflow-hidden"
    >
      <p className="text-gray-600 dark:text-gray-300">{answer}</p>
    </motion.div>
  </motion.div>
);



export default function Services() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(service => service.id === activeTab || service.category === activeTab);
  const router = useRouter();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const faqs = [
    {
      question: 'How do I know if I need to see an ENT specialist?',
      answer: 'You should consider seeing an ENT specialist if you experience persistent ear, nose, or throat issues such as chronic sinus infections, hearing loss, frequent nosebleeds, or difficulty swallowing that last more than a week or are recurring.'
    },
    {
      question: 'What should I expect during my first visit?',
      answer: 'During your first visit, the specialist will review your medical history, discuss your symptoms, and may perform a physical examination of your ears, nose, and throat. Additional tests or imaging may be ordered if needed.'
    },
    {
      question: 'Do you accept insurance?',
      answer: 'Yes, we accept most major insurance plans. Please contact our office with your insurance information, and our staff will verify your coverage and benefits before your appointment.'
    },
    {
      question: 'How long is the recovery time after ENT surgery?',
      answer: 'Recovery time varies depending on the procedure. Minor procedures may require a few days of rest, while more complex surgeries might need several weeks of recovery. Your doctor will provide specific post-operative care instructions.'
    },
    {
      question: 'Are there any non-surgical treatment options available?',
      answer: 'Yes, many ENT conditions can be effectively treated with non-surgical methods such as medications, lifestyle changes, or therapy. Your specialist will discuss all available treatment options with you.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  useEffect(() => {
    // Remove any default padding/margin from the main content
    document.querySelector('main')?.classList.add('pt-0');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Flower2 className="w-4 h-4 mr-2 text-primary" />
              <span className="text-primary font-medium">Our Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-manrope text-foreground mb-6">
              Comprehensive ENT
              <span className="text-gradient block">Healthcare Services</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              From routine care to complex procedures, our specialists provide expert treatment 
              for all ear, nose, and throat conditions with the latest medical technology.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="tabs w-full">
            <motion.div 
              className="tabs-list grid w-full grid-cols-3 lg:grid-cols-7 mb-12 gap-2"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.button 
                onClick={() => setActiveTab('all')} 
                className={`px-4 py-2 rounded-md ${activeTab === 'all' ? 'bg-primary text-white' : 'bg-muted'}`}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All Services
              </motion.button>
              <motion.button 
                onClick={() => setActiveTab('ear')} 
                className={`px-4 py-2 rounded-md ${activeTab === 'ear' ? 'bg-primary text-white' : 'bg-muted'}`}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ear
              </motion.button>
              <motion.button 
                onClick={() => setActiveTab('nose')} 
                className={`px-4 py-2 rounded-md ${activeTab === 'nose' ? 'bg-primary text-white' : 'bg-muted'}`}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Nose
              </motion.button>
              <motion.button 
                onClick={() => setActiveTab('throat')} 
                className={`px-4 py-2 rounded-md ${activeTab === 'throat' ? 'bg-primary text-white' : 'bg-muted'}`}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Throat
              </motion.button>
              <motion.button 
                onClick={() => setActiveTab('pediatric')} 
                className={`px-4 py-2 rounded-md ${activeTab === 'pediatric' ? 'bg-primary text-white' : 'bg-muted'}`}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Pediatric
              </motion.button>
              <motion.button 
                onClick={() => setActiveTab('hearing')} 
                className={`px-4 py-2 rounded-md ${activeTab === 'hearing' ? 'bg-primary text-white' : 'bg-muted'}`}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hearing
              </motion.button>
              <motion.button 
                onClick={() => setActiveTab('voice')} 
                className={`px-4 py-2 rounded-md ${activeTab === 'voice' ? 'bg-primary text-white' : 'bg-muted'}`}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Voice
              </motion.button>
            </motion.div>

            <motion.div 
              className="space-y-12"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl medical-shadow overflow-hidden"
                  id={service.id}
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image with Floating Animation */}
                    <motion.div 
                      className="relative h-64 lg:h-auto overflow-hidden group"
                      initial={{ y: 0 }}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { 
                          duration: 0.5,
                          ease: [0.4, 0, 0.2, 1]
                        } 
                      }}
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.div
                        className="relative w-full h-full"
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.5 }
                        }}
                      >
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          priority={index < 2} // Only preload first 2 images
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
                      <motion.div 
                        className="absolute top-6 left-6"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -5, 5, -5, 0],
                          transition: { 
                            duration: 0.5,
                            ease: "easeInOut"
                          }
                        }}
                      >
                        <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                          {service.icon && (
                            <motion.div
                              whileHover={{ 
                                rotate: 360,
                                transition: { duration: 0.5 }
                              }}
                            >
                              <service.icon className="w-8 h-8 text-primary" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Content */}
                    <div className="p-8 lg:p-12">
                      <div className="mb-6">
                        <h2 className="text-3xl font-bold font-manrope text-foreground mb-4">
                          {service.name}
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Key Info */}
                      <div className="grid sm:grid-cols-3 gap-4 mb-8">
                        <motion.div 
        className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-br from-background to-muted/30 hover:to-muted/50 transition-all duration-300 group"
        whileHover={{ 
          x: 5,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
      >
        <motion.div 
          className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors"
          whileHover={{ rotate: 15, scale: 1.1 }}
        >
          <Clock className="w-5 h-5 text-accent" />
        </motion.div>
        <div>
          <p className="text-sm font-medium text-foreground">Duration</p>
          <p className="text-xs text-muted-foreground">{service.duration}</p>
        </div>
      </motion.div>
                        <motion.div 
        className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-br from-background to-muted/30 hover:to-muted/50 transition-all duration-300 group"
        whileHover={{ 
          x: 5,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
      >
        <motion.div 
          className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors"
          whileHover={{ rotate: 15, scale: 1.1 }}
        >
          <Shield className="w-5 h-5 text-accent" />
        </motion.div>
        <div>
          <p className="text-sm font-medium text-foreground">Recovery</p>
          <p className="text-xs text-muted-foreground">{service.recovery}</p>
        </div>
      </motion.div>
        <motion.div 
        className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-br from-background to-muted/30 hover:to-muted/50 transition-all duration-300 group"
        whileHover={{ 
          x: 5,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
      >
        <motion.div 
          className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors"
          whileHover={{ rotate: 15, scale: 1.1 }}
        >
          <DollarSign className="w-5 h-5 text-accent" />
        </motion.div>
        <div>
          <p className="text-sm font-medium text-foreground">Cost Range</p>
          <p className="text-xs text-muted-foreground">{service.cost}</p>
        </div>
      </motion.div>
                      </div>

                      {/* Procedures & Symptoms */}
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div>
                          <h3 className="font-semibold text-foreground mb-3">Common Procedures</h3>
                          <ul className="space-y-2">
                            {service.procedures.slice(0, 4).map((procedure) => (
                              <li key={procedure} className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                                {procedure}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-3">Symptoms We Treat</h3>
                          <ul className="space-y-2">
                            {service.symptoms.slice(0, 4).map((symptom) => (
                              <li key={symptom} className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Link href="/book-appointment">
                            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 w-full sm:w-auto">
                              Book Consultation
                              <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="inline-flex items-center"
                              >
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </motion.span>
                            </Button>
                          </Link>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Link href="/contact">
                            <Button variant="outline" className="px-6 py-3 w-full sm:w-auto">
                              Ask Questions
                            </Button>
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-manrope">
                Ready to Get Started?
              </h2>
              <p className="text-xl opacity-90">
                Schedule a consultation with our ENT specialists to discuss your specific needs 
                and develop a personalized treatment plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link href="/book-appointment">
                    <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 font-semibold">
                      Book Appointment
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-flex items-center"
                      >
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </motion.span>
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link href="/contact">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 font-semibold">
                      Contact Us
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}