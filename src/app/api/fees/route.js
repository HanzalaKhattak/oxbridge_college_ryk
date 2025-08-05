import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    // Get token from cookies
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get student
    const student = await prisma.student.findFirst({
      where: { userId: decoded.userId }
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Get fee records
    const feeRecords = await prisma.feeRecord.findMany({
      where: { studentId: student.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ feeRecords });

  } catch (error) {
    console.error('Fee records error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create new fee record (for admin use)
export async function POST(request) {
  try {
    const {
      studentId,
      feeType,
      month,
      amount,
      dueDate
    } = await request.json();

    // Validate required fields
    if (!studentId || !feeType || !amount || !dueDate) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      );
    }

    const feeRecord = await prisma.feeRecord.create({
      data: {
        studentId: parseInt(studentId),
        feeType,
        month,
        amount: parseFloat(amount),
        dueDate: new Date(dueDate),
        status: 'PENDING'
      }
    });

    return NextResponse.json({
      message: 'Fee record created successfully',
      feeRecord
    });

  } catch (error) {
    console.error('Create fee record error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
