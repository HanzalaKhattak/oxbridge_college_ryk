import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value;
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const admissions = await prisma.admission.findMany({
      orderBy: { submittedAt: 'desc' },
      include: {
        student: {
          select: { name: true, studentId: true, phone: true, program: true, photoUrl: true },
        },
        feeSlip: true,
      },
    });

    return NextResponse.json({ admissions });
  } catch (error) {
    console.error('Admin admissions error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const token = request.cookies.get('token')?.value;
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { admissionId, status, remarks } = await request.json();

    if (!admissionId || !status) {
      return NextResponse.json({ error: 'Admission ID and status are required' }, { status: 400 });
    }

    const validStatuses = ['APPROVED', 'REJECTED', 'WAITLISTED', 'PENDING'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const admission = await prisma.admission.update({
      where: { id: admissionId },
      data: {
        status,
        remarks: remarks || null,
        processedAt: status !== 'PENDING' ? new Date() : null,
      },
    });

    return NextResponse.json({ message: 'Admission updated', admission });
  } catch (error) {
    console.error('Admin admission update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
