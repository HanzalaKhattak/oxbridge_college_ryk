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

    const feeSlips = await prisma.feeSlip.findMany({
      orderBy: { submittedAt: 'desc' },
      include: {
        student: { select: { name: true, studentId: true, phone: true } },
        admission: { select: { applicationNumber: true, status: true } },
      },
    });

    return NextResponse.json({ feeSlips });
  } catch (error) {
    console.error('Admin fee slips error:', error);
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

    const { feeSlipId, status, remarks } = await request.json();

    if (!feeSlipId || !status) {
      return NextResponse.json({ error: 'Fee slip ID and status are required' }, { status: 400 });
    }

    if (!['VERIFIED', 'REJECTED', 'PENDING'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const feeSlip = await prisma.feeSlip.update({
      where: { id: feeSlipId },
      data: {
        status,
        remarks: remarks || null,
        reviewedAt: status !== 'PENDING' ? new Date() : null,
      },
    });

    return NextResponse.json({ message: 'Fee slip updated', feeSlip });
  } catch (error) {
    console.error('Admin fee slip update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
