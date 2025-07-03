'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface Appointment {
  _id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason: string;
}

export function AppointmentDashboard() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      // In a real app, you would fetch this from your API
      // const response = await fetch('/api/appointments');
      // const data = await response.json();
      // setAppointments(data);
      
      // Mock data for now
      setAppointments([
        {
          _id: '1',
          patientName: 'John Doe',
          doctorName: 'Dr. Smith',
          date: '2025-07-05',
          time: '10:00 AM',
          status: 'scheduled',
          reason: 'Routine Checkup'
        },
        {
          _id: '2',
          patientName: 'Jane Smith',
          doctorName: 'Dr. Johnson',
          date: '2025-07-06',
          time: '02:30 PM',
          status: 'scheduled',
          reason: 'Follow-up'
        },
      ]);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      // In a real app, you would call your API to cancel the appointment
      // const response = await fetch(`/api/appointments/${appointmentId}`, {
      //   method: 'DELETE',
      // });
      // const data = await response.json();
      
      // For now, just update the local state
      setAppointments(prevAppointments =>
        prevAppointments.map(appt =>
          appt._id === appointmentId
            ? { ...appt, status: 'cancelled' as const }
            : appt
        )
      );
      
      toast.success('Appointment cancelled successfully');
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('Failed to cancel appointment');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>A list of your recent appointments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableCell className="font-medium">{appointment.patientName}</TableCell>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>
                  {format(new Date(appointment.date), 'MMM d, yyyy')} at {appointment.time}
                </TableCell>
                <TableCell>{appointment.reason}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      appointment.status === 'scheduled'
                        ? 'default'
                        : appointment.status === 'completed'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {appointment.status === 'scheduled' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelAppointment(appointment._id)}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No appointments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppointmentDashboard;
