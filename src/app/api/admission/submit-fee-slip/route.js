import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

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

    const { admissionId, paymentMethod, transactionId, amount, screenshotUrl } = await request.json();

    if (!admissionId || !paymentMethod || !transactionId || !amount) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const validMethods = ['EASYPAISA', 'JAZZCASH', 'BANK_TRANSFER'];
    if (!validMethods.includes(paymentMethod)) {
      return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 });
    }

    // Get student
    const student = await prisma.student.findFirst({
      where: { userId: decoded.userId },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Verify admission belongs to this student
    const admission = await prisma.admission.findFirst({
      where: { id: parseInt(admissionId), studentId: student.id },
    });

    if (!admission) {
      return NextResponse.json({ error: 'Admission not found' }, { status: 404 });
    }

    // Check if fee slip already submitted
    const existingSlip = await prisma.feeSlip.findUnique({
      where: { admissionId: admission.id },
    });

    if (existingSlip) {
      return NextResponse.json(
        { error: 'Fee slip already submitted for this admission', feeSlipId: existingSlip.id },
        { status: 400 }
      );
    }

    const feeSlip = await prisma.feeSlip.create({
      data: {
        admissionId: admission.id,
        studentId: student.id,
        paymentMethod,
        transactionId: transactionId.trim(),
        amount: parseFloat(amount),
        screenshotUrl: screenshotUrl || null,
      },
    });

    return NextResponse.json({
      message: 'Fee slip submitted successfully. Your admission will be reviewed after fee verification.',
      feeSlipId: feeSlip.id,
    });
  } catch (error) {
    console.error('Fee slip submit error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
