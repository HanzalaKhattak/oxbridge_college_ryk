# MySQL Database Setup Guide

Follow these steps to set up MySQL database for Oxbridge College website:

## Prerequisites
- MySQL Server 8.0+ installed
- Access to MySQL command line or phpMyAdmin

## Step 1: Create Database
```sql
CREATE DATABASE oxbridge_college_db;
USE oxbridge_college_db;
```

## Step 2: Create MySQL User (Optional but recommended)
```sql
CREATE USER 'oxbridge_user'@'localhost' IDENTIFIED BY 'secure_password_123';
GRANT ALL PRIVILEGES ON oxbridge_college_db.* TO 'oxbridge_user'@'localhost';
FLUSH PRIVILEGES;
```

## Step 3: Update Environment Variables
Edit `.env.local` file with your MySQL credentials:

```env
# Replace with your actual MySQL configuration
DATABASE_URL="mysql://oxbridge_user:secure_password_123@localhost:3306/oxbridge_college_db"

# Or if using root user:
# DATABASE_URL="mysql://root:your_root_password@localhost:3306/oxbridge_college_db"
```

## Step 4: Run Database Migration
Execute these commands in your project directory:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push

# Optional: Open Prisma Studio to view database
npx prisma studio
```

## Step 5: Seed Initial Data (Optional)
Create sample data for testing:

```bash
# This will be available after running the commands above
npm run seed
```

## Database Schema Overview

### Tables Created:
- **users** - Authentication and user roles
- **students** - Student profiles and information
- **staff** - Staff/teacher information
- **admissions** - Admission applications
- **fee_records** - Fee payments and dues
- **results** - Academic results and grades
- **achievements** - College achievements showcase
- **announcements** - College announcements

### Key Features:
- ✅ User authentication with JWT
- ✅ Student registration and login
- ✅ Admission form with photo upload
- ✅ Fee management system
- ✅ Academic results tracking
- ✅ Announcements system

## Troubleshooting

### Common Issues:

1. **Connection Error**: 
   - Check MySQL is running: `mysql --version`
   - Verify credentials in DATABASE_URL

2. **Permission Denied**:
   - Ensure MySQL user has proper permissions
   - Check firewall settings

3. **Port Already in Use**:
   - Default MySQL port is 3306
   - Change port in DATABASE_URL if needed

4. **Schema Sync Issues**:
   - Run: `npx prisma db push --force-reset` (⚠️ Deletes all data)

## Next Steps
1. Update DATABASE_URL in `.env.local`
2. Run `npx prisma db push`
3. Start development server: `npm run dev`
4. Test login/signup functionality
5. Submit admission forms to populate database

## Database Management
- View data: `npx prisma studio` (opens at http://localhost:5555)
- Reset database: `npx prisma db push --force-reset`
- Generate new migration: `npx prisma migrate dev --name migration_name`

Your MySQL backend is now ready! 🚀
