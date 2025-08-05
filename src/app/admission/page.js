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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if photo is uploaded
    if (!formData.studentPhoto) {
      alert('Please upload a student photo before submitting the form.');
      return;
    }
    
    console.log('Form Data:', formData); // For debugging
    alert('Admission form submitted successfully! You will receive a confirmation email shortly.');
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
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-900 mb-4">Admission Form</h1>
          <p className="text-lg text-gray-600">Apply for F.Sc Programs at Oxbridge College</p>
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

        <div className={`bg-white border rounded-lg shadow-md p-8 ${showPrintView ? 'print-section' : ''}`}>
          <div className="text-center mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-red-900">OXBRIDGE COLLEGE</h2>
                <p className="text-sm text-gray-600">Girls College Road, Canal Avenue, Rahim Yar Khan</p>
                <p className="text-sm text-gray-600">Phone: 068-5870925 | 0333-5870925</p>
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
            <hr className="my-4" />
            <h3 className="text-xl font-semibold text-orange-600">ADMISSION FORM - F.Sc Programs</h3>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Student Photo Upload Section */}
            <div className="mb-8 text-center">
              <label className="block text-sm font-semibold text-gray-700 mb-4">Student Photo *</label>
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
                  <div className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className="text-4xl text-gray-400 mb-2">📷</div>
                      <p className="text-sm text-gray-500">No photo uploaded</p>
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
                    console.log('Upload widget render, open function:', typeof open);
                    return (
                      <button
                        type="button"
                        onClick={() => {
                          console.log('Upload button clicked');
                          if (typeof open === 'function') {
                            open();
                          } else {
                            console.error('Upload widget not properly initialized');
                            alert('Upload widget not ready. Please refresh the page and try again.');
                          }
                        }}
                        className="bg-orange-600 text-white px-6 py-2 rounded font-semibold hover:bg-orange-700 transition"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Student Name *</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Father's Name *</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CNIC/B-Form *</label>
                <input
                  type="text"
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleInputChange}
                  placeholder="xxxxx-xxxxxxx-x"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="03xx-xxxxxxx"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Complete Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
                required
              ></textarea>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Previous School/College *</label>
                <input
                  type="text"
                  name="previousSchool"
                  value={formData.previousSchool}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Obtained Marks *</label>
                <input
                  type="number"
                  name="obtainedMarks"
                  value={formData.obtainedMarks}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Total Marks *</label>
                <input
                  type="number"
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Program *</label>
              <select
                name="program"
                value={formData.program}
                onChange={handleProgramChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-900"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subjects for Selected Program</label>
                <div className="flex flex-wrap gap-2">
                  {formData.subjects.map((subject, index) => (
                    <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <button
                type="submit"
                className="bg-red-900 text-white px-6 py-3 rounded font-semibold hover:bg-red-800 transition no-print"
              >
                Submit Application
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="bg-orange-600 text-white px-6 py-3 rounded font-semibold hover:bg-orange-700 transition no-print"
              >
                Print Form
              </button>
            </div>
          </form>

          <div className="mt-8 border-t pt-6">
            <h4 className="text-lg font-semibold text-red-900 mb-4">Required Documents</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Copy of Matric/O-Level Certificate & Mark Sheet</li>
              <li>• Copy of CNIC/B-Form</li>
              <li>• Recent Passport Size Photograph (uploaded digitally)</li>
              <li>• 3 Additional Passport Size Photographs (physical copies)</li>
              <li>• Character Certificate from Previous Institution</li>
              <li>• Medical Certificate (if required)</li>
            </ul>
            
            {formData.studentPhoto && (
              <div className="mt-4 p-3 bg-green-50 rounded border-l-4 border-green-400">
                <p className="text-sm text-green-700">
                  ✓ Student photo has been uploaded and will be attached to this application.
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
