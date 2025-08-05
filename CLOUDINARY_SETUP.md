# Cloudinary Setup Guide

The photo upload button isn't working because Cloudinary needs to be properly configured. Follow these steps:

## Step 1: Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email

## Step 2: Get Your Credentials
1. Login to your Cloudinary dashboard
2. Go to Dashboard → Account Details
3. Copy these values:
   - **Cloud Name** (e.g., "dxxxxxxxxxxxx")
   - **API Key** (e.g., "123456789012345")
   - **API Secret** (e.g., "abcdefghijklmnopqrstuvwxyz")

## Step 3: Update Environment Variables
Edit your `.env.local` file and replace the placeholder values:

```bash
# Replace with your actual values from Cloudinary dashboard
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

## Step 4: Create Upload Preset
1. In Cloudinary dashboard, go to Settings → Upload
2. Click "Add upload preset"
3. Set these values:
   - **Preset name**: `ml_default`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `oxbridge_college/student_photos`
   - **Allowed formats**: `jpg,jpeg,png`
   - **Max file size**: `2000000` (2MB)
4. Save the preset

## Step 5: Test Upload
1. Restart your development server: `npm run dev`
2. Open the admission form: http://localhost:3000/admission
3. Click "Upload Photo" - it should now open the upload dialog

## Troubleshooting
- Check browser console (F12) for error messages
- Ensure your internet connection is working
- Verify the cloud name is correct (most common issue)
- Make sure the upload preset `ml_default` exists and is set to "Unsigned"

## Current Status
✅ Code is ready and configured
❌ Cloudinary credentials need to be set up
❌ Upload preset needs to be created

Once you complete steps 2-4, the photo upload will work perfectly!
