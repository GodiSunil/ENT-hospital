'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Users, Stethoscope, Clock3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppointmentDashboard } from '@/components/appointment/AppointmentDashboard';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
};

function StatsCard({ title, value, icon, description }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 rounded-md bg-primary/10">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    totalDoctors: 0,
    averageWaitTime: '15 min',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      // Fetch dashboard stats
      fetchDashboardStats();
    }
  }, [status, router]);

  const fetchDashboardStats = async () => {
    try {
      // In a real app, you would fetch these from your API
      // const response = await fetch('/api/dashboard/stats');
      // const data = await response.json();
      // setStats(data);
      
      // Mock data for now
      setStats({
        totalAppointments: 1245,
        todayAppointments: 24,
        totalDoctors: 8,
        averageWaitTime: '15 min',
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session?.user?.name || 'User'}!
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm text-muted-foreground">
            Last login: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Appointments"
          value={stats.totalAppointments.toLocaleString()}
          icon={<Calendar className="h-4 w-4 text-primary" />}
          description="+12% from last month"
        />
        <StatsCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          icon={<Clock className="h-4 w-4 text-primary" />}
          description="+2 from yesterday"
        />
        <StatsCard
          title="Total Doctors"
          value={stats.totalDoctors}
          icon={<Stethoscope className="h-4 w-4 text-primary" />}
          description="4 available today"
        />
        <StatsCard
          title="Average Wait Time"
          value={stats.averageWaitTime}
          icon={<Clock3 className="h-4 w-4 text-primary" />}
          description="-2 min from last week"
        />
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <AppointmentDashboard />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
