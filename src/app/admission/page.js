"use client";
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    cnic: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    previousSchool: '',
    obtainedMarks: '',
    totalMarks: '',
    program: '',
    subjects: [],
    studentPhoto: null
  });

  const [showPrintView, setShowPrintView] = useState(false);

  const programs = [
    { value: 'pre-medical', label: 'Pre-Medical (Biology, Chemistry, Physics)' },
    { value: 'pre-engineering', label: 'Pre-Engineering (Mathematics, Chemistry, Physics)' },
    { value: 'computer-science', label: 'Computer Science (Mathematics, Chemistry, Physics, Computer)' },
    { value: 'commerce', label: 'Commerce (Economics, Statistics, Mathematics)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProgramChange = (e) => {
    const program = e.target.value;
    let subjects = [];
    
    switch(program) {
      case 'pre-medical':
        subjects = ['Biology', 'Chemistry', 'Physics', 'English', 'Urdu/Pak Studies'];
        break;
      case 'pre-engineering':
        subjects = ['Mathematics', 'Chemistry', 'Physics', 'English', 'Urdu/Pak Studies'];
        break;
      case 'computer-science':
        subjects = ['Mathematics', 'Chemistry', 'Physics', 'Computer Science', 'English'];
        break;
      case 'commerce':
        subjects = ['Economics', 'Statistics', 'Mathematics', 'English', 'Urdu/Pak Studies'];
        break;
    }
    
    setFormData(prev => ({
      ...prev,
      program,
      subjects
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if photo is uploaded
    if (!formData.studentPhoto) {
      alert('Please upload a student photo before submitting the form.');
      return;
    }
    
    try {
      const response = await fetch('/api/admission/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Admission application submitted successfully!\n\nApplication Number: ${data.applicationNumber}\nStudent ID: ${data.studentId}\nPercentage: ${data.percentage}%\n\nYou will receive a confirmation email shortly.`);
        
        // Reset form
        setFormData({
          studentName: '',
          fatherName: '',
          cnic: '',
          dateOfBirth: '',
          email: '',
          phone: '',
          address: '',
          previousSchool: '',
          obtainedMarks: '',
          totalMarks: '',
          program: '',
          subjects: [],
          studentPhoto: null
        });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('Network error. Please try again.');
      console.error('Submission error:', error);
    }
  };

  const handlePhotoUpload = (result) => {
    console.log('Upload result:', result);
    setFormData(prev => ({
      ...prev,
      studentPhoto: {
        publicId: result.info.public_id,
        url: result.info.secure_url,
        width: result.info.width,
        height: result.info.height
      }
    }));
  };

  const handleUploadError = (error) => {
    console.error('Upload error:', error);
    alert('Photo upload failed. Please check your internet connection and try again.');
  };

  const handlePrint = () => {
    setShowPrintView(true);
    setTimeout(() => {
      window.print();
      setShowPrintView(false);
    }, 100);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">Admissions Open</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-3">Admission Form</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Apply for F.Sc Programs at Oxbridge College, Rahim Yar Khan</p>
        </div>

        {showPrintView && (
          <style jsx>{`
            @media print {
              body * { visibility: hidden; }
              .print-section, .print-section * { visibility: visible; }
              .print-section { position: absolute; left: 0; top: 0; width: 100%; }
              .no-print { display: none !important; }
            }
          `}</style>
        )}

        <div className={`bg-white border border-gray-100 rounded-2xl shadow-sm p-6 sm:p-8 lg:p-10 ${showPrintView ? 'print-section' : ''}`}>
          <div className="text-center mb-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-maroon-900 flex items-center justify-center text-gold-400 font-extrabold text-sm">OC</div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">OXBRIDGE COLLEGE</h2>
                    <p className="text-xs text-gray-500">Girls College Road, Canal Avenue, Rahim Yar Khan</p>
                  </div>
                </div>
              </div>
              {formData.studentPhoto && (
                <div className="ml-4">
                  <img 
                    src={formData.studentPhoto.url} 
                    alt="Student Photo" 
                    className="w-24 h-32 object-cover border-2 border-gray-300 rounded"
                  />
                </div>
              )}
            </div>
            <div className="h-px bg-gray-100 my-6" />
            <h3 className="text-lg font-semibold text-maroon-800">ADMISSION FORM — F.Sc Programs</h3>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Student Photo Upload Section */}
            <div className="mb-10 text-center">
              <label className="block text-sm font-medium text-gray-700 mb-4">Student Photo *</label>
              <div className="flex flex-col items-center">
                {formData.studentPhoto ? (
                  <div className="mb-4">
                    <img 
                      src={formData.studentPhoto.url} 
                      alt="Student Photo" 
                      className="w-32 h-40 object-cover border-2 border-gray-300 rounded-lg shadow-md"
                    />
                    <p className="text-sm text-green-600 mt-2">✓ Photo uploaded successfully</p>
                  </div>
                ) : (
                  <div className="w-32 h-40 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center mb-4 bg-gray-50">
                    <div className="text-center">
                      <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/></svg>
                      <p className="text-xs text-gray-400">No photo</p>
                    </div>
                  </div>
                )}
                
                <CldUploadWidget
                  uploadPreset="ml_default" // You'll need to create this in Cloudinary
                  onSuccess={handlePhotoUpload}
                  onError={handleUploadError}
                  options={{
                    maxFiles: 1,
                    resourceType: "image",
                    clientAllowedFormats: ["jpg", "jpeg", "png"],
                    maxFileSize: 2000000, // 2MB limit
                    folder: "oxbridge_college/student_photos",
                    transformation: [
                      { width: 300, height: 400, crop: "fill", gravity: "face" }
                    ]
                  }}
                >
                  {({ open }) => {
                    return (
                      <button
                        type="button"
                        onClick={() => {
                          if (typeof open === 'function') {
                            open();
                          } else {
                            alert('Upload widget not ready. Please refresh the page and try again.');
                          }
                        }}
                        className="bg-maroon-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-maroon-800 transition-colors"
                      >
                        {formData.studentPhoto ? 'Change Photo' : 'Upload Photo'}
                      </button>
                    );
                  }}
                </CldUploadWidget>
                <p className="text-xs text-gray-500 mt-2">
                  Upload a passport-size photo (JPG, JPEG, PNG - Max 2MB)
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Student Name *</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Father&apos;s Name *</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">CNIC/B-Form *</label>
                <input
                  type="text"
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleInputChange}
                  placeholder="xxxxx-xxxxxxx-x"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="03xx-xxxxxxx"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Complete Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
                required
              ></textarea>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Previous School/College *</label>
                <input
                  type="text"
                  name="previousSchool"
                  value={formData.previousSchool}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Obtained Marks *</label>
                <input
                  type="number"
                  name="obtainedMarks"
                  value={formData.obtainedMarks}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Marks *</label>
                <input
                  type="number"
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Program *</label>
              <select
                name="program"
                value={formData.program}
                onChange={handleProgramChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
                required
              >
                <option value="">Select a program</option>
                {programs.map((program) => (
                  <option key={program.value} value={program.value}>
                    {program.label}
                  </option>
                ))}
              </select>
            </div>

            {formData.subjects.length > 0 && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subjects for Selected Program</label>
                <div className="flex flex-wrap gap-2">
                  {formData.subjects.map((subject, index) => (
                    <span key={index} className="bg-maroon-50 text-maroon-800 px-3 py-1.5 rounded-full text-xs font-medium border border-maroon-100">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <button
                type="submit"
                className="bg-maroon-900 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-maroon-800 transition-colors no-print"
              >
                Submit Application
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-colors no-print"
              >
                Print Form
              </button>
            </div>
          </form>

          <div className="mt-10 border-t border-gray-100 pt-8">
            <h4 className="text-base font-bold text-gray-900 mb-4">Required Documents</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              {["Copy of Matric/O-Level Certificate & Mark Sheet","Copy of CNIC/B-Form","Recent Passport Size Photograph (uploaded digitally)","3 Additional Passport Size Photographs (physical copies)","Character Certificate from Previous Institution","Medical Certificate (if required)"].map((doc, i) => (
                <li key={i} className="flex items-center gap-2"><svg className="w-4 h-4 text-maroon-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>{doc}</li>
              ))}
            </ul>
            
            {formData.studentPhoto && (
              <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-sm text-emerald-700 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/></svg>
                  Student photo has been uploaded and will be attached to this application.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
