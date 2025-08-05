import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create sample achievements
  const achievements = await prisma.achievement.createMany({
    data: [
      {
        title: "Inter-College Debate Championship 2024",
        description: "Our students won the first position in the inter-college debate championship organized by Punjab College Board.",
        category: "ACADEMIC",
        date: new Date('2024-03-15'),
        isActive: true
      },
      {
        title: "Science Fair Excellence Award",
        description: "Oxbridge College received the Excellence Award at the District Science Fair for innovative projects in Physics and Chemistry.",
        category: "ACADEMIC", 
        date: new Date('2024-02-20'),
        isActive: true
      },
      {
        title: "Sports Week Champions",
        description: "Our students dominated the annual sports week, winning trophies in cricket, football, and badminton.",
        category: "SPORTS",
        date: new Date('2024-01-10'),
        isActive: true
      }
    ]
  });

  // Create sample announcements
  const announcements = await prisma.announcement.createMany({
    data: [
      {
        title: "Mid-Term Examinations Schedule",
        content: "Mid-term examinations for F.Sc Part-I and Part-II will commence from March 25th, 2024. Students are advised to prepare accordingly and check the detailed schedule on the notice board.",
        type: "EXAM",
        isActive: true
      },
      {
        title: "New Library Books Available",
        content: "We have added 500+ new books to our library including latest editions of Physics, Chemistry, Biology, and Mathematics. Students can issue books from Monday to Friday, 8 AM to 4 PM.",
        type: "GENERAL",
        isActive: true
      },
      {
        title: "Fee Payment Deadline Extended",
        content: "Due to recent circumstances, the monthly fee payment deadline has been extended to the 15th of each month. Late fee charges will apply after this date.",
        type: "URGENT",
        isActive: true
      }
    ]
  });

  // Create sample admin user
  const adminPassword = await hashPassword('admin123');
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@oxbridge.edu.pk',
      password: adminPassword,
      role: 'ADMIN'
    }
  });

  // Create sample student user
  const studentPassword = await hashPassword('student123');
  const studentUser = await prisma.user.create({
    data: {
      email: 'student@oxbridge.edu.pk',
      password: studentPassword,
      role: 'STUDENT'
    }
  });

  // Create sample student profile
  const student = await prisma.student.create({
    data: {
      userId: studentUser.id,
      studentId: 'OXB20240001',
      name: 'Ahmad Ali Khan',
      fatherName: 'Muhammad Khan',
      cnic: '12345-6789012-3',
      dateOfBirth: new Date('2006-05-15'),
      phone: '0321-9876543',
      address: 'House No. 123, Street 5, Model Town, Rahim Yar Khan',
      program: 'pre-medical',
      session: '2024-2026',
      status: 'ACTIVE'
    }
  });

  // Create sample fee records
  const feeRecords = await prisma.feeRecord.createMany({
    data: [
      {
        studentId: student.id,
        feeType: 'MONTHLY',
        month: '2024-01',
        amount: 15000,
        dueDate: new Date('2024-01-10'),
        paidDate: new Date('2024-01-08'),
        status: 'PAID',
        paymentMethod: 'CASH',
        receiptNumber: 'REC001'
      },
      {
        studentId: student.id,
        feeType: 'MONTHLY', 
        month: '2024-02',
        amount: 15000,
        dueDate: new Date('2024-02-10'),
        paidDate: new Date('2024-02-12'),
        status: 'PAID',
        paymentMethod: 'BANK',
        receiptNumber: 'REC002'
      },
      {
        studentId: student.id,
        feeType: 'MONTHLY',
        month: '2024-03',
        amount: 15000,
        dueDate: new Date('2024-03-10'),
        status: 'PENDING'
      }
    ]
  });

  // Create sample results
  const results = await prisma.result.createMany({
    data: [
      {
        studentId: student.id,
        examType: 'MONTHLY',
        subject: 'Physics',
        maxMarks: 100,
        obtMarks: 85,
        grade: 'A',
        examDate: new Date('2024-02-15'),
        session: '2024-2026'
      },
      {
        studentId: student.id,
        examType: 'MONTHLY',
        subject: 'Chemistry',
        maxMarks: 100,
        obtMarks: 78,
        grade: 'B+',
        examDate: new Date('2024-02-16'),
        session: '2024-2026'
      },
      {
        studentId: student.id,
        examType: 'MONTHLY',
        subject: 'Biology',
        maxMarks: 100,
        obtMarks: 92,
        grade: 'A+',
        examDate: new Date('2024-02-17'),
        session: '2024-2026'
      }
    ]
  });

  console.log('✅ Database seeding completed successfully!');
  console.log('📝 Sample data created:');
  console.log(`   • ${achievements.count} achievements`);
  console.log(`   • ${announcements.count} announcements`);
  console.log(`   • 1 admin user (admin@oxbridge.edu.pk / admin123)`);
  console.log(`   • 1 student user (student@oxbridge.edu.pk / student123)`);
  console.log(`   • 1 student profile (Ahmad Ali Khan - OXB20240001)`);
  console.log(`   • ${feeRecords.count} fee records`);
  console.log(`   • ${results.count} academic results`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
