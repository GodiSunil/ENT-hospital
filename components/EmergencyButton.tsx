'use client';

import { useState } from 'react';
import { AlertTriangle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function EmergencyButton() {
  const [isCalling, setIsCalling] = useState(false);
  const { toast } = useToast();

  const handleEmergencyCall = async () => {
    if (!window.confirm('Are you sure you want to call emergency services?')) {
      return;
    }

    setIsCalling(true);
    
    try {
      const response = await fetch('/api/emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to connect to emergency services');
      }

      toast({
        title: 'Emergency Alert Sent!',
        description: data.message,
        variant: 'destructive',
      });

      // In a real app, you might want to open the phone dialer
      // window.location.href = 'tel:+911234567890';
      
    } catch (error) {
      console.error('Emergency call failed:', error);
      toast({
        title: 'Emergency Call Failed',
        description: 'Could not connect to emergency services. Please try again or dial your local emergency number.',
        variant: 'destructive',
      });
    } finally {
      setIsCalling(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleEmergencyCall}
        disabled={isCalling}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-6 rounded-full shadow-lg transform transition-all hover:scale-105"
      >
        <div className="flex items-center gap-2">
          {isCalling ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calling...
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5 mr-2" />
              <Phone className="h-5 w-5" />
              <span className="ml-2">Emergency</span>
            </>
          )}
        </div>
      </Button>
    </div>
  );
}
