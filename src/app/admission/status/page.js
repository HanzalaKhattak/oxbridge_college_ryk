"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdmissionStatus() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/admission/status");
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to load admission status");
        const data = await res.json();
        setAdmissions(data.admissions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, [router]);

  const statusInfo = (status) => {
    const map = {
      PROCESSING: { color: "bg-gray-100 text-gray-600", label: "Processing", desc: "Your application is being reviewed. Status will be visible after 3 hours." },
      PENDING: { color: "bg-amber-50 text-amber-700", label: "Pending", desc: "Your application is pending admin review." },
      APPROVED: { color: "bg-emerald-50 text-emerald-700", label: "Approved", desc: "Congratulations! Your admission has been approved." },
      REJECTED: { color: "bg-red-50 text-red-700", label: "Rejected", desc: "Unfortunately, your admission application has been rejected." },
      WAITLISTED: { color: "bg-blue-50 text-blue-700", label: "Waitlisted", desc: "You have been placed on the waitlist." },
    };
    return map[status] || map.PROCESSING;
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-maroon-200 border-t-maroon-700 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Checking admission status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admission Status</h1>
          <p className="text-gray-500 text-sm">Track the status of your admission application(s)</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 text-center">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {admissions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m3 0h-3m3 3H9.75M3.375 4.5h17.25M3.375 4.5c-.621 0-1.125.504-1.125 1.125v15.75c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No Applications Found</h3>
            <p className="text-gray-500 text-sm mb-4">You haven&#39;t submitted any admission application yet.</p>
            <Link href="/admission" className="px-6 py-3 bg-maroon-900 text-white rounded-xl text-sm font-medium hover:bg-maroon-800 transition-colors inline-block">
              Apply Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {admissions.map((adm) => {
              const info = statusInfo(adm.status);
              return (
                <div key={adm.id} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Application #{adm.applicationNumber}</div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        Submitted {new Date(adm.submittedAt).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${info.color}`}>
                      {info.label}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-600">{info.desc}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-400">Program:</span> <span className="font-medium text-gray-700">{adm.program}</span></div>
                    <div><span className="text-gray-400">Percentage:</span> <span className="font-medium text-gray-700">{Number(adm.percentage).toFixed(1)}%</span></div>
                    {adm.feeSlip && (
                      <>
                        <div><span className="text-gray-400">Fee Slip:</span> <span className={`font-medium ${adm.feeSlip.status === "VERIFIED" ? "text-emerald-700" : adm.feeSlip.status === "REJECTED" ? "text-red-700" : "text-amber-700"}`}>{adm.feeSlip.status}</span></div>
                        <div><span className="text-gray-400">Payment:</span> <span className="font-medium text-gray-700">{adm.feeSlip.paymentMethod}</span></div>
                      </>
                    )}
                    {adm.remarks && (
                      <div className="sm:col-span-2"><span className="text-gray-400">Remarks:</span> <span className="font-medium text-gray-700">{adm.remarks}</span></div>
                    )}
                  </div>

                  {!adm.feeSlip && adm.status !== "APPROVED" && adm.status !== "REJECTED" && (
                    <div className="mt-4">
                      <Link
                        href={`/admission/submit-fee-slip?admissionId=${adm.id}&applicationNumber=${adm.applicationNumber}`}
                        className="px-4 py-2 bg-maroon-900 text-white rounded-xl text-xs font-medium hover:bg-maroon-800 transition-colors inline-block"
                      >
                        Submit Fee Slip
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
