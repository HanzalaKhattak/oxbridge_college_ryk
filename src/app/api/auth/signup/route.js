import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, generateStudentId } from '@/lib/auth';

export async function POST(request) {
  try {
    const { name, email, password, phone, program } = await request.json();

    // Validate required fields
    if (!name || !email || !password || !phone || !program) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate student ID
    const studentId = generateStudentId();

    // Create user and student record in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          role: 'STUDENT'
        }
      });

      const student = await tx.student.create({
        data: {
          userId: user.id,
          studentId,
          name,
          fatherName: '', // Will be updated during admission
          cnic: '',
          dateOfBirth: new Date(), // Placeholder
          phone,
          address: '',
          program,
          session: `${new Date().getFullYear()}-${new Date().getFullYear() + 2}`
        }
      });

      return { user, student };
    });

    return NextResponse.json({
      message: 'Student account created successfully',
      studentId: result.student.studentId
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
