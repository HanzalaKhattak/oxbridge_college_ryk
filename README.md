# Oxbridge College — Management System

A full-stack college management web application built with **Next.js (App Router)**, **MySQL**, **Prisma ORM**, and **Tailwind CSS**.

---

## Features

### Student Portal
- **Signup / Login** — JWT-based authentication with HTTP-only cookies
- **Student Dashboard** — View profile, enrolled program, session, and fee status
- **Online Admission Form** — Submit application with photo upload (Cloudinary)
- **Fee Slip Submission** — After admission, submit payment proof (Easypaisa / JazzCash / Bank Transfer) with transaction ID
- **Admission Status** — Check application status (results shown after a 3-hour processing window)
- **Achievements** — Browse college achievements and awards
- **Announcements** — View latest college news and notices

### Admin Portal (separate login at `/admin/login`)
- **Admin Dashboard** — Overview stats: total students, admissions, revenue, pending fee records
- **Admissions Management** — View all applications, approve or reject (approval gated on verified fee slip)
- **Fee Slip Verification** — Verify or reject submitted fee slips before admission approval
- **Students List** — Browse all enrolled students
- **Announcements Management** — Create and manage announcements

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Database | MySQL 8 |
| ORM | Prisma |
| Auth | JWT + bcrypt, HTTP-only cookies |
| Styling | Tailwind CSS (maroon/gold theme) |
| File Uploads | Cloudinary (`next-cloudinary`) |
| Language | JavaScript (ES Modules) |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL 8 running locally
- A Cloudinary account

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="mysql://root:password@localhost:3306/oxbridge_db"
JWT_SECRET="your-secret-key"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### 3. Set up the database

```bash
npx prisma db push
```

### 4. Seed sample data

```bash
npm run seed
```

This creates an admin user and sample announcements/achievements.

**Default admin credentials:**
- Email: `admin@oxbridge.edu.pk`
- Password: `admin123`

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── admin/              # Admin portal (login, dashboard, admissions, fee-slips, students, announcements)
│   ├── admission/          # Student admission form, fee slip submission, status check
│   ├── api/
│   │   ├── admin/          # Admin API routes (dashboard, admissions, fee-slips, students, announcements)
│   │   ├── admission/      # Admission submit, fee slip submit, status
│   │   └── auth/           # Login, logout, signup, admin-login
│   ├── dashboard/          # Student dashboard
│   ├── login/              # Student login
│   └── signup/             # Student signup
├── lib/
│   ├── auth.js             # JWT helpers, password hashing
│   ├── db.js               # Prisma client singleton
│   └── cloudinary.js       # Cloudinary config
prisma/
├── schema.prisma           # Database schema
└── seed.js                 # Seed script
middleware.js               # Route protection (JWT checks)
```

---

## Admission Workflow

1. Student fills out and submits the online admission form
2. After submission, bank/payment details are displayed (Rs. 15,000 admission fee)
3. Student pays via Bank Transfer, Easypaisa, or JazzCash
4. Student submits fee slip with transaction ID at `/admission/submit-fee-slip`
5. Admin logs in at `/admin/login`, verifies the fee slip under **Fee Slips**
6. Admin approves the admission under **Admissions** (approval blocked until fee is verified)
7. Student checks status at `/admission/status` (processing window of 3 hours applies)

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run seed` | Seed the database with sample data |
| `npx prisma db push` | Sync schema to database |
| `npx prisma studio` | Open Prisma Studio (database GUI) |
