"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const doctors = [
  { id: '1', name: 'Dr. Sarah Johnson', specialization: 'General ENT, Pediatric ENT' },
  { id: '2', name: 'Dr. Michael Chen', specialization: 'Otology, Audiology' },
  { id: '3', name: 'Dr. Emily Rodriguez', specialization: 'Rhinology, Allergy' },
  { id: '4', name: 'Dr. James Wilson', specialization: 'Head & Neck Surgery' },
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
];

const reasons = [
  'Hearing Problems',
  'Ear Pain/Infection',
  'Sinus Issues',
  'Throat Problems',
  'Voice Disorders',
  'Balance Issues',
  'Allergy Consultation',
  'Follow-up Visit',
  'General Consultation',
  'Other'
];

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    patientAge: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    symptoms: '',
    isFirstVisit: true,
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    insurance: {
      provider: '',
      policyNumber: ''
    },
    preferredLanguage: 'English'
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Appointment booked successfully!');
        setStep(4); // Success step
      } else {
        toast.error(data.error || 'Failed to book appointment');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.patientName && formData.patientEmail && formData.patientPhone && formData.patientAge;
      case 2:
        return formData.doctorId && formData.appointmentDate && formData.appointmentTime;
      case 3:
        return formData.reason;
      default:
        return false;
    }
  };

  if (step === 4) {
    return (
      <div className="min-h-screen bg-background pt-32 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold font-manrope text-foreground mb-4">
            Appointment Confirmed!
          </h1>
          <p className="text-muted-foreground mb-8">
            Your appointment has been successfully booked. You will receive a confirmation email shortly.
          </p>
          <Button onClick={() => window.location.href = '/'} className="bg-primary hover:bg-primary/90">
            Return to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <span className="text-primary font-medium">Book Appointment</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-manrope text-foreground mb-4">
            Schedule Your
            <span className="text-gradient block">Consultation</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Book an appointment with our ENT specialists in just a few simple steps
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= stepNumber 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > stepNumber ? 'bg-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Please provide your basic information for the appointment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Full Name *</Label>
                      <Input
                        id="patientName"
                        value={formData.patientName}
                        onChange={(e) => handleInputChange('patientName', e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientAge">Age *</Label>
                      <Input
                        id="patientAge"
                        type="number"
                        value={formData.patientAge}
                        onChange={(e) => handleInputChange('patientAge', e.target.value)}
                        placeholder="Enter your age"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="patientEmail">Email Address *</Label>
                      <Input
                        id="patientEmail"
                        type="email"
                        value={formData.patientEmail}
                        onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientPhone">Phone Number *</Label>
                      <Input
                        id="patientPhone"
                        type="tel"
                        value={formData.patientPhone}
                        onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="preferredLanguage">Preferred Language</Label>
                      <Select value={formData.preferredLanguage} onValueChange={(value) => handleInputChange('preferredLanguage', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="Mandarin">Mandarin</SelectItem>
                          <SelectItem value="Portuguese">Portuguese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Appointment Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Appointment Details
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred doctor, date, and time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="doctorId">Select Doctor *</Label>
                    <Select value={formData.doctorId} onValueChange={(value) => handleInputChange('doctorId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            <div>
                              <div className="font-medium">{doctor.name}</div>
                              <div className="text-sm text-muted-foreground">{doctor.specialization}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="appointmentDate">Preferred Date *</Label>
                      <Input
                        id="appointmentDate"
                        type="date"
                        value={formData.appointmentDate}
                        onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appointmentTime">Preferred Time *</Label>
                      <Select value={formData.appointmentTime} onValueChange={(value) => handleInputChange('appointmentTime', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Medical Information */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Medical Information
                  </CardTitle>
                  <CardDescription>
                    Help us prepare for your visit with some medical details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Visit *</Label>
                    <Select value={formData.reason} onValueChange={(value) => handleInputChange('reason', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason for visit" />
                      </SelectTrigger>
                      <SelectContent>
                        {reasons.map((reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="symptoms">Symptoms & Additional Details</Label>
                    <Textarea
                      id="symptoms"
                      value={formData.symptoms}
                      onChange={(e) => handleInputChange('symptoms', e.target.value)}
                      placeholder="Please describe your symptoms or any additional information..."
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                      <Input
                        id="insuranceProvider"
                        value={formData.insurance.provider}
                        onChange={(e) => handleInputChange('insurance.provider', e.target.value)}
                        placeholder="e.g., Blue Cross, Aetna"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="policyNumber">Policy Number</Label>
                      <Input
                        id="policyNumber"
                        value={formData.insurance.policyNumber}
                        onChange={(e) => handleInputChange('insurance.policyNumber', e.target.value)}
                        placeholder="Enter policy number"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">Before Your Visit</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Please arrive 15 minutes early and bring a valid ID, insurance card, 
                          and list of current medications.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            {step < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className="bg-primary hover:bg-primary/90"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={loading || !isStepValid()}
                className="bg-primary hover:bg-primary/90"
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}