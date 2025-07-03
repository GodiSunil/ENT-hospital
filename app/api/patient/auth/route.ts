import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

// Mock user database - in a real app, this would be a database
const mockPatients = [
  {
    id: '1',
    email: 'patient@example.com',
    password: '$2a$10$XFDq3wLx.s4Z7X5X5X5X5u', // hashed 'password123'
    name: 'John Patient',
    dateOfBirth: '1985-04-15',
    phone: '+1234567890'
  }
];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Find user
    const user = mockPatients.find(patient => patient.email === email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // In a real app, verify password with bcrypt
    // const isValidPassword = await bcrypt.compare(password, user.password);
    const isValidPassword = password === 'password123'; // Simplified for demo
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Create JWT token
    const token = sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );
    
    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      user: userWithoutPassword,
      token
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
