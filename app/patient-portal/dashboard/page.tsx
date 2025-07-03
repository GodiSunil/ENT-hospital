'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

type MedicalRecord = {
  id: string;
  date: string;
  doctor: string;
  specialty: string;
  diagnosis: string;
  notes: string;
  medications: string[];
  followUp: string | null;
};

export default function PatientDashboard() {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would verify the token before fetching data
    const token = localStorage.getItem('patientToken');
    if (!token) {
      router.push('/patient-portal');
      return;
    }

    // Fetch patient data
    const fetchData = async () => {
      try {
        // In a real app, you would use the token for authentication
        const [recordsRes, profileRes] = await Promise.all([
          fetch('/api/patient/medical-records'),
          fetch('/api/patient/profile')
        ]);

        if (!recordsRes.ok || !profileRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [recordsData, profileData] = await Promise.all([
          recordsRes.json(),
          profileRes.json()
        ]);

        setMedicalRecords(recordsData);
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('patientToken');
    router.push('/patient-portal');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            {profile && (
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {profile.name}</p>
                <p><span className="font-medium">Date of Birth:</span> {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                <p><span className="font-medium">Email:</span> {profile.email}</p>
                <p><span className="font-medium">Phone:</span> {profile.phone}</p>
                <p><span className="font-medium">Blood Type:</span> {profile.bloodType}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Medical Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {profile && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Allergies</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.allergies && profile.allergies.length > 0 ? (
                      profile.allergies.map((allergy: string, index: number) => (
                        <Badge key={index} variant="outline" className="bg-red-50 text-red-700">
                          {allergy}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No known allergies</p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Current Medications</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {profile.medications && profile.medications.length > 0 ? (
                      profile.medications.map((med: string, index: number) => (
                        <li key={index}>{med}</li>
                      ))
                    ) : (
                      <li className="text-muted-foreground">No current medications</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Conditions</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.conditions && profile.conditions.length > 0 ? (
                      profile.conditions.map((condition: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {condition}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No conditions recorded</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medical Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Follow-up</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicalRecords.length > 0 ? (
                medicalRecords.map((record) => (
                  <TableRow key={record.id} className="cursor-pointer hover:bg-gray-50" onClick={() => {}}>
                    <TableCell>{format(new Date(record.date), 'MMM d, yyyy')}</TableCell>
                    <TableCell>{record.doctor}</TableCell>
                    <TableCell>{record.specialty}</TableCell>
                    <TableCell>{record.diagnosis}</TableCell>
                    <TableCell>
                      {record.followUp ? (
                        format(new Date(record.followUp), 'MMM d, yyyy')
                      ) : (
                        <span className="text-muted-foreground">None</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No medical records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
