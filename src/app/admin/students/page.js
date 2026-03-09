"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch("/api/admin/students");
        if (res.status === 403) { router.push("/admin/login"); return; }
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setStudents(data.students || []);
      } catch { } finally { setLoading(false); }
    }
    fetchStudents();
  }, []);

  const statusBadge = (status) => {
    const map = {
      ACTIVE: "bg-emerald-50 text-emerald-700",
      INACTIVE: "bg-gray-100 text-gray-500",
      GRADUATED: "bg-blue-50 text-blue-700",
      DROPPED: "bg-red-50 text-red-700",
    };
    return map[status] || "bg-gray-100 text-gray-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-maroon-200 border-t-maroon-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <p className="text-gray-500 text-sm mt-1">{students.length} total students</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Student ID</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Program</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Session</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Phone</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((stu) => (
                <tr key={stu.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{stu.name}</td>
                  <td className="py-3 px-4 text-gray-600">{stu.studentId}</td>
                  <td className="py-3 px-4 text-gray-600">{stu.program}</td>
                  <td className="py-3 px-4 text-gray-600">{stu.session}</td>
                  <td className="py-3 px-4 text-gray-600">{stu.phone}</td>
                  <td className="py-3 px-4 text-gray-600">{stu.user?.email}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusBadge(stu.status)}`}>
                      {stu.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
