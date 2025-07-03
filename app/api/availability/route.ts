import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Appointment from '@/lib/models/Appointment';

export async function POST(request: Request) {
  try {
    const { doctorId, date } = await request.json();
    
    if (!doctorId || !date) {
      return NextResponse.json(
        { error: 'Doctor ID and date are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    
    // Get all appointments for the doctor on the given date
    const appointments = await Appointment.find({
      doctorId,
      appointmentDate: {
        $gte: new Date(new Date(date).setHours(0, 0, 0)),
        $lt: new Date(new Date(date).setHours(23, 59, 59))
      },
      status: { $in: ['pending', 'confirmed'] }
    });

    // Extract booked time slots
    const bookedSlots = appointments.map(appt => appt.appointmentTime);

    // Define working hours (9 AM to 5 PM with 30-minute slots)
    const allSlots = [];
    for (let hour = 9; hour < 17; hour++) {
      for (const minutes of ['00', '30']) {
        const time = `${hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
        allSlots.push({
          time,
          available: !bookedSlots.includes(time)
        });
      }
    }

    return NextResponse.json({ availableSlots: allSlots });
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}
