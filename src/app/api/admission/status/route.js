import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const student = await prisma.student.findFirst({
      where: { userId: decoded.userId },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const admissions = await prisma.admission.findMany({
      where: { studentId: student.id },
      orderBy: { submittedAt: 'desc' },
      include: {
        feeSlip: {
          select: { status: true, paymentMethod: true, submittedAt: true },
        },
      },
    });

    // Check if 3 hours have passed since submission for each admission
    const admissionsWithVisibility = admissions.map((adm) => {
      const hoursSinceSubmission = (Date.now() - new Date(adm.submittedAt).getTime()) / (1000 * 60 * 60);
      const canViewStatus = hoursSinceSubmission >= 3;

      return {
        id: adm.id,
        applicationNumber: adm.applicationNumber,
        program: student.program,
        percentage: adm.percentage,
        status: canViewStatus ? adm.status : 'PROCESSING',
        canViewStatus,
        submittedAt: adm.submittedAt,
        processedAt: adm.processedAt,
        remarks: canViewStatus ? adm.remarks : null,
        feeSlip: adm.feeSlip,
      };
    });

    return NextResponse.json({ admissions: admissionsWithVisibility });
  } catch (error) {
    console.error('Admission status error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
