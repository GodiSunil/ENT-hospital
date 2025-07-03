import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendAppointmentConfirmation(
  to: string,
  patientName: string,
  appointmentDetails: {
    date: string;
    time: string;
    doctorName: string;
    appointmentId: string;
  }
) {
  if (!resend) {
    console.warn('Resend API key is missing. Skipping email sending.');
    return false;
  }
  try {
    const { data, error } = await resend.emails.send({
      from: 'no-reply@yourhospital.com', // Replace with your verified domain
      to,
      subject: 'Your Appointment Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Appointment Confirmed</h2>
          <p>Dear ${patientName},</p>
          <p>Your appointment has been confirmed with the following details:</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Doctor:</strong> ${appointmentDetails.doctorName}</p>
            <p><strong>Date:</strong> ${appointmentDetails.date}</p>
            <p><strong>Time:</strong> ${appointmentDetails.time}</p>
            <p><strong>Appointment ID:</strong> ${appointmentDetails.appointmentId}</p>
          </div>
          
          <p>Please arrive 15 minutes before your scheduled time.</p>
          <p>If you need to reschedule or cancel, please call us at (123) 456-7890.</p>
          
          <p>Best regards,<br>Your Hospital Team</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}
