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

    // Get student data
    const student = await prisma.student.findFirst({
      where: { userId: decoded.userId },
      include: {
        user: {
          select: { email: true, role: true }
        },
        feeRecords: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        results: {
          orderBy: { examDate: 'desc' },
          take: 20
        },
        admissions: {
          orderBy: { submittedAt: 'desc' },
          take: 5
        }
      }
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Get recent announcements
    const announcements = await prisma.announcement.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    return NextResponse.json({
      student: {
        id: student.id,
        studentId: student.studentId,
        name: student.name,
        fatherName: student.fatherName,
        email: student.user.email,
        phone: student.phone,
        program: student.program,
        session: student.session,
        photoUrl: student.photoUrl,
        status: student.status,
        admissionDate: student.admissionDate
      },
      feeRecords: student.feeRecords,
      results: student.results,
      admissions: student.admissions,
      announcements
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
