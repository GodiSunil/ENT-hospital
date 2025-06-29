"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  CreditCard, 
  HelpCircle, 
  Download, 
  Clock, 
  Shield, 
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Info,
  Users,
  Calendar,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const insuranceProviders = [
  { name: 'Blue Cross Blue Shield', accepted: true },
  { name: 'Aetna', accepted: true },
  { name: 'Cigna', accepted: true },
  { name: 'UnitedHealthcare', accepted: true },
  { name: 'Humana', accepted: true },
  { name: 'Medicare', accepted: true },
  { name: 'Medicaid', accepted: true },
  { name: 'Kaiser Permanente', accepted: false },
];

const forms = [
  {
    name: 'New Patient Registration',
    description: 'Complete patient information and medical history',
    icon: Users,
    downloadUrl: '#'
  },
  {
    name: 'Insurance Verification',
    description: 'Insurance details and authorization forms',
    icon: CreditCard,
    downloadUrl: '#'
  },
  {
    name: 'Medical History',
    description: 'Detailed medical and surgical history questionnaire',
    icon: FileText,
    downloadUrl: '#'
  },
  {
    name: 'Consent Forms',
    description: 'Treatment consent and privacy acknowledgment',
    icon: Shield,
    downloadUrl: '#'
  }
];

const faqs = [
  {
    question: "What should I bring to my first appointment?",
    answer: "Please bring a valid photo ID, insurance card, list of current medications, previous medical records related to your ENT condition, and any referral letters from your primary care physician."
  },
  {
    question: "How early should I arrive for my appointment?",
    answer: "We recommend arriving 15-20 minutes early for your appointment to complete any necessary paperwork and check-in procedures."
  },
  {
    question: "Do you accept my insurance?",
    answer: "We accept most major insurance plans. Please check our insurance section or call our office to verify if your specific plan is accepted."
  },
  {
    question: "What if I need to cancel or reschedule my appointment?",
    answer: "Please call our office at least 24 hours in advance to cancel or reschedule your appointment to avoid any cancellation fees."
  },
  {
    question: "Do you offer emergency services?",
    answer: "Yes, we provide 24/7 emergency ENT services. For life-threatening emergencies, please call 911. For urgent ENT concerns, call our emergency line at (555) 999-HELP."
  },
  {
    question: "How long will my appointment take?",
    answer: "Initial consultations typically take 45-60 minutes, while follow-up appointments usually take 15-30 minutes. Procedure times vary depending on the treatment."
  },
  {
    question: "Do you treat children?",
    answer: "Yes, we have specialized pediatric ENT services for children of all ages, with child-friendly facilities and gentle care approaches."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, credit cards (Visa, MasterCard, American Express), debit cards, and offer payment plans for larger procedures."
  }
];

export default function PatientInfo() {
  const [activeTab, setActiveTab] = useState('forms');

  return (
    <div className="min-h-screen bg-background pt-32">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Info className="w-4 h-4 mr-2 text-primary" />
              <span className="text-primary font-medium">Patient Information</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-manrope text-foreground mb-6">
              Everything You Need
              <span className="text-gradient block">to Know</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find important information about forms, insurance, FAQs, and what to expect 
              during your visit to ENT Excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12">
              <TabsTrigger value="forms">Forms & Documents</TabsTrigger>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="prepare">Prepare for Visit</TabsTrigger>
            </TabsList>

            {/* Forms & Documents */}
            <TabsContent value="forms" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold font-manrope text-foreground mb-4">
                    Patient Forms & Documents
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Download and complete these forms before your visit to save time
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {forms.map((form, index) => (
                    <motion.div
                      key={form.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="hover-lift">
                        <CardHeader>
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                              <form.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{form.name}</CardTitle>
                              <CardDescription>{form.description}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-primary hover:bg-primary/90">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 bg-blue-50 border border-blue-200 p-6 rounded-2xl">
                  <div className="flex items-start space-x-3">
                    <Info className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">Important Notes</h3>
                      <ul className="text-blue-700 space-y-1 text-sm">
                        <li>• Please complete all forms before your appointment</li>
                        <li>• Bring completed forms with you or email them 24 hours in advance</li>
                        <li>• If you have questions about any form, call our office for assistance</li>
                        <li>• Forms can also be completed online through our patient portal</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Insurance */}
            <TabsContent value="insurance" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold font-manrope text-foreground mb-4">
                    Insurance Information
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    We work with most major insurance providers to make care accessible
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Accepted Insurance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-accent" />
                        Accepted Insurance Plans
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {insuranceProviders.map((provider) => (
                          <div key={provider.name} className="flex items-center justify-between">
                            <span className="text-foreground">{provider.name}</span>
                            {provider.accepted ? (
                              <CheckCircle className="w-5 h-5 text-accent" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-red-500" />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Don't see your insurance? Call us at (555) 123-4567 to verify coverage.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Insurance Guidelines */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-2 text-primary" />
                        Insurance Guidelines
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Before Your Visit</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Verify your insurance coverage</li>
                          <li>• Check if you need a referral</li>
                          <li>• Understand your copay/deductible</li>
                          <li>• Bring your insurance card</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Payment Options</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Cash, credit, and debit cards accepted</li>
                          <li>• Payment plans available for procedures</li>
                          <li>• HSA/FSA accounts welcome</li>
                          <li>• Financial assistance programs available</li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button variant="outline" className="w-full">
                          <Phone className="w-4 h-4 mr-2" />
                          Verify Insurance Coverage
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* FAQs */}
            <TabsContent value="faqs" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold font-manrope text-foreground mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Find answers to common questions about our services and procedures
                  </p>
                </div>

                <div className="max-w-4xl mx-auto">
                  <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border">
                        <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                          <span className="font-semibold text-foreground">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                <div className="text-center mt-12">
                  <p className="text-muted-foreground mb-4">Still have questions?</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-primary hover:bg-primary/90">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Us: (555) 123-4567
                    </Button>
                    <Button variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Us
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Prepare for Visit */}
            <TabsContent value="prepare" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold font-manrope text-foreground mb-4">
                    Preparing for Your Visit
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Everything you need to know to make your appointment smooth and efficient
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* What to Bring */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-primary" />
                        What to Bring
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Required Documents</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Valid photo ID (driver's license, passport)</li>
                            <li>• Insurance card and any referral letters</li>
                            <li>• Completed patient forms</li>
                            <li>• List of current medications</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Medical Records</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Previous ENT test results</li>
                            <li>• Hearing test results (if applicable)</li>
                            <li>• CT scans or MRI images</li>
                            <li>• Previous surgical reports</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* What to Expect */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-accent" />
                        What to Expect
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">During Your Visit</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Check-in and insurance verification</li>
                            <li>• Medical history review</li>
                            <li>• Physical examination</li>
                            <li>• Discussion of treatment options</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Appointment Duration</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• New patient consultation: 45-60 minutes</li>
                            <li>• Follow-up visits: 15-30 minutes</li>
                            <li>• Procedures: Varies by treatment</li>
                            <li>• Arrive 15 minutes early</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Special Instructions */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-red-500" />
                        Special Instructions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Before Procedures</h4>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p>• Follow pre-procedure fasting instructions if provided</p>
                            <p>• Arrange transportation if sedation is involved</p>
                            <p>• Stop certain medications as directed</p>
                            <p>• Inform us of any illness or fever</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">For Pediatric Patients</h4>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p>• Bring comfort items (favorite toy, blanket)</p>
                            <p>• Explain the visit in age-appropriate terms</p>
                            <p>• Schedule during your child's best time of day</p>
                            <p>• Both parents/guardians may accompany child</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-manrope">
              Ready for Your Appointment?
            </h2>
            <p className="text-xl opacity-90">
              Our team is here to help make your visit as comfortable and efficient as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 font-semibold">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 font-semibold">
                <Phone className="w-4 h-4 mr-2" />
                Call Us Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}