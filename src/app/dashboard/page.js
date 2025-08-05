"use client";
import { useState } from 'react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Sample student data
  const studentData = {
    name: "Muhammad Ahmed",
    rollNumber: "OC-2024-001",
    class: "F.Sc Pre-Medical",
    session: "2024-2026",
    fatherName: "Muhammad Ali",
    email: "ahmed@student.oxbridge.edu.pk",
    phone: "0300-1234567",
    address: "Street 5, RYK"
  };

  const feeRecord = [
    { month: "January 2024", amount: 5000, status: "Paid", date: "2024-01-05" },
    { month: "February 2024", amount: 5000, status: "Paid", date: "2024-02-03" },
    { month: "March 2024", amount: 5000, status: "Paid", date: "2024-03-01" },
    { month: "April 2024", amount: 5000, status: "Pending", date: "-" },
  ];

  const subjects = [
    { name: "Biology", teacher: "Dr. Sara Khan", marks: 85 },
    { name: "Chemistry", teacher: "Dr. Hassan Raza", marks: 78 },
    { name: "Physics", teacher: "Prof. Ahmad Ali", marks: 82 },
    { name: "English", teacher: "Ms. Aisha Malik", marks: 88 },
    { name: "Urdu", teacher: "Ms. Zainab Fatima", marks: 90 }
  ];

  const announcements = [
    { title: "Mid-Term Exams", date: "2024-04-15", message: "Mid-term examinations will start from April 20th, 2024." },
    { title: "Fee Reminder", date: "2024-04-10", message: "April fee submission deadline is April 30th, 2024." },
    { title: "Science Fair", date: "2024-04-05", message: "Annual science fair will be held on May 15th, 2024." }
  ];

  const printFeeSlip = (fee) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Fee Slip - ${fee.month}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .student-info, .fee-info { margin: 10px 0; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #8B0000; color: white; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>OXBRIDGE COLLEGE</h2>
            <p>Girls College Road, Canal Avenue, Rahim Yar Khan</p>
            <p>Phone: 068-5870925 | 0333-5870925</p>
            <hr>
            <h3>FEE SLIP - ${fee.month}</h3>
          </div>
          <div class="student-info">
            <p><strong>Student Name:</strong> ${studentData.name}</p>
            <p><strong>Roll Number:</strong> ${studentData.rollNumber}</p>
            <p><strong>Class:</strong> ${studentData.class}</p>
            <p><strong>Father Name:</strong> ${studentData.fatherName}</p>
          </div>
          <table>
            <tr><th>Description</th><th>Amount</th></tr>
            <tr><td>Monthly Fee</td><td>Rs. ${fee.amount}</td></tr>
            <tr><td><strong>Total Amount</strong></td><td><strong>Rs. ${fee.amount}</strong></td></tr>
          </table>
          <div class="fee-info">
            <p><strong>Status:</strong> ${fee.status}</p>
            <p><strong>Payment Date:</strong> ${fee.date}</p>
          </div>
          <p style="margin-top: 30px; font-size: 12px;">This is a computer-generated fee slip.</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-red-900 text-white p-6 rounded-lg mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
          <p>Welcome back, {studentData.name}!</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b">
          {[
            { id: 'profile', label: 'Profile', icon: '👤' },
            { id: 'fees', label: 'Fee Record', icon: '💰' },
            { id: 'results', label: 'Results', icon: '📊' },
            { id: 'announcements', label: 'Announcements', icon: '📢' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg font-medium transition ${
                activeTab === tab.id
                  ? 'bg-red-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-900 mb-6">Student Profile</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Student Name</label>
                <p className="bg-gray-50 p-3 rounded border">{studentData.name}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Roll Number</label>
                <p className="bg-gray-50 p-3 rounded border">{studentData.rollNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Class</label>
                <p className="bg-gray-50 p-3 rounded border">{studentData.class}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Session</label>
                <p className="bg-gray-50 p-3 rounded border">{studentData.session}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Father's Name</label>
                <p className="bg-gray-50 p-3 rounded border">{studentData.fatherName}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <p className="bg-gray-50 p-3 rounded border">{studentData.email}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                <p className="bg-gray-50 p-3 rounded border">{studentData.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                <p className="bg-gray-50 p-3 rounded border">{studentData.address}</p>
              </div>
            </div>
          </div>
        )}

        {/* Fee Record Tab */}
        {activeTab === 'fees' && (
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-900 mb-6">Fee Record</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-red-900 text-white">
                    <th className="border border-gray-300 p-3 text-left">Month</th>
                    <th className="border border-gray-300 p-3 text-left">Amount</th>
                    <th className="border border-gray-300 p-3 text-left">Status</th>
                    <th className="border border-gray-300 p-3 text-left">Payment Date</th>
                    <th className="border border-gray-300 p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {feeRecord.map((fee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">{fee.month}</td>
                      <td className="border border-gray-300 p-3">Rs. {fee.amount}</td>
                      <td className="border border-gray-300 p-3">
                        <span className={`px-2 py-1 rounded text-sm ${
                          fee.status === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {fee.status}
                        </span>
                      </td>
                      <td className="border border-gray-300 p-3">{fee.date}</td>
                      <td className="border border-gray-300 p-3">
                        {fee.status === 'Paid' && (
                          <button
                            onClick={() => printFeeSlip(fee)}
                            className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition"
                          >
                            Print Slip
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-900 mb-6">Academic Results</h2>
            <div className="grid gap-4">
              {subjects.map((subject, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg text-red-900">{subject.name}</h3>
                      <p className="text-gray-600 text-sm">Teacher: {subject.teacher}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">{subject.marks}%</div>
                      <div className="text-sm text-gray-500">
                        {subject.marks >= 80 ? 'A' : subject.marks >= 70 ? 'B' : subject.marks >= 60 ? 'C' : 'D'}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${subject.marks}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-red-900">Overall Average:</span>
                <span className="text-2xl font-bold text-red-900">
                  {Math.round(subjects.reduce((sum, subject) => sum + subject.marks, 0) / subjects.length)}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-900 mb-6">Recent Announcements</h2>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={index} className="border-l-4 border-orange-600 pl-4 py-3 bg-orange-50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-red-900">{announcement.title}</h3>
                    <span className="text-sm text-gray-500">{announcement.date}</span>
                  </div>
                  <p className="text-gray-700">{announcement.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
