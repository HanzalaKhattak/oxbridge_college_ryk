import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken, generateApplicationNumber } from '@/lib/auth';

export async function POST(request) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const {
      studentName,
      fatherName,
      cnic,
      dateOfBirth,
      phone,
      address,
      previousSchool,
      obtainedMarks,
      totalMarks,
      program,
      subjects,
      studentPhoto,
    } = await request.json();

    // Validate required fields
    if (!studentName || !fatherName || !cnic || !phone || !address || !previousSchool || !obtainedMarks || !totalMarks || !program) {
      return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
    }

    const obtained = parseInt(obtainedMarks);
    const total = parseInt(totalMarks);

    if (isNaN(obtained) || isNaN(total) || total <= 0 || obtained > total) {
      return NextResponse.json({ error: 'Invalid marks entered' }, { status: 400 });
    }

    const percentage = ((obtained / total) * 100).toFixed(2);

    // Get student record tied to this user
    const student = await prisma.student.findFirst({
      where: { userId: decoded.userId },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student profile not found. Please sign up first.' }, { status: 404 });
    }

    // Update student profile with admission details
    await prisma.student.update({
      where: { id: student.id },
      data: {
        name: studentName,
        fatherName,
        cnic,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        phone,
        address,
        photoUrl: studentPhoto?.url || student.photoUrl,
        program,
      },
    });

    // Generate application number
    const applicationNumber = generateApplicationNumber();

    // Check if student already submitted an admission
    const existing = await prisma.admission.findFirst({
      where: { studentId: student.id },
      orderBy: { createdAt: 'desc' },
    });

    if (existing && existing.status === 'PENDING') {
      return NextResponse.json(
        { error: 'You already have a pending admission application.', applicationNumber: existing.applicationNumber },
        { status: 400 }
      );
    }

    // Create admission record
    const admission = await prisma.admission.create({
      data: {
        studentId: student.id,
        applicationNumber,
        previousSchool,
        obtainedMarks: obtained,
        totalMarks: total,
        percentage: parseFloat(percentage),
        subjects: JSON.stringify(subjects || []),
        documents: studentPhoto ? JSON.stringify([studentPhoto.url]) : null,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      message: 'Admission application submitted successfully',
      applicationNumber: admission.applicationNumber,
      studentId: student.studentId,
      percentage,
    });
  } catch (error) {
    console.error('Admission submit error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
