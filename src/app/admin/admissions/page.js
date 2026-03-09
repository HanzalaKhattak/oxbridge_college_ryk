"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const router = useRouter();

  const fetchAdmissions = async () => {
    try {
      const res = await fetch("/api/admin/admissions");
      if (res.status === 403) { router.push("/admin/login"); return; }
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setAdmissions(data.admissions || []);
    } catch { } finally { setLoading(false); }
  };

  useEffect(() => { fetchAdmissions(); }, []);

  const handleStatusChange = async (admissionId, status) => {
    const remarks = status === "REJECTED" ? prompt("Reason for rejection:") : null;
    if (status === "REJECTED" && remarks === null) return;

    try {
      const res = await fetch("/api/admin/admissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admissionId, status, remarks }),
      });
      if (res.ok) fetchAdmissions();
    } catch { }
  };

  const filtered = filter === "ALL" ? admissions : admissions.filter((a) => a.status === filter);

  const statusBadge = (status) => {
    const map = {
      PENDING: "bg-amber-50 text-amber-700",
      APPROVED: "bg-emerald-50 text-emerald-700",
      REJECTED: "bg-red-50 text-red-700",
      WAITLISTED: "bg-blue-50 text-blue-700",
    };
    return map[status] || "bg-gray-50 text-gray-600";
  };

  const feeSlipBadge = (feeSlip) => {
    if (!feeSlip) return <span className="text-xs text-gray-400">No fee slip</span>;
    const map = {
      PENDING: "bg-amber-50 text-amber-700",
      VERIFIED: "bg-emerald-50 text-emerald-700",
      REJECTED: "bg-red-50 text-red-700",
    };
    return (
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[feeSlip.status]}`}>
        Fee: {feeSlip.status}
      </span>
    );
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admissions</h1>
          <p className="text-gray-500 text-sm mt-1">{admissions.length} total applications</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["ALL", "PENDING", "APPROVED", "REJECTED", "WAITLISTED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === s ? "bg-maroon-900 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No admissions found</div>
        ) : (
          filtered.map((adm) => (
            <div key={adm.id} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{adm.student?.name || "Unknown"}</h3>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusBadge(adm.status)}`}>
                      {adm.status}
                    </span>
                    {feeSlipBadge(adm.feeSlip)}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-gray-400 text-xs">Application #</span>
                      <div className="font-medium text-gray-700">{adm.applicationNumber}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Student ID</span>
                      <div className="font-medium text-gray-700">{adm.student?.studentId}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Program</span>
                      <div className="font-medium text-gray-700">{adm.student?.program}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Percentage</span>
                      <div className="font-medium text-gray-700">{Number(adm.percentage).toFixed(1)}%</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Previous School</span>
                      <div className="font-medium text-gray-700">{adm.previousSchool}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Phone</span>
                      <div className="font-medium text-gray-700">{adm.student?.phone}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Submitted</span>
                      <div className="font-medium text-gray-700">
                        {new Date(adm.submittedAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    </div>
                    {adm.feeSlip && (
                      <div>
                        <span className="text-gray-400 text-xs">Transaction ID</span>
                        <div className="font-medium text-gray-700">{adm.feeSlip.transactionId}</div>
                      </div>
                    )}
                  </div>
                  {adm.feeSlip && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-xl text-sm">
                      <span className="text-gray-400 text-xs block mb-1">Fee Slip Details</span>
                      <div className="flex flex-wrap gap-4">
                        <div><span className="text-gray-500">Method:</span> <span className="font-medium">{adm.feeSlip.paymentMethod}</span></div>
                        <div><span className="text-gray-500">Amount:</span> <span className="font-medium">Rs. {Number(adm.feeSlip.amount).toLocaleString()}</span></div>
                        <div><span className="text-gray-500">TxID:</span> <span className="font-medium">{adm.feeSlip.transactionId}</span></div>
                      </div>
                    </div>
                  )}
                  {adm.remarks && (
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="font-medium">Remarks:</span> {adm.remarks}
                    </div>
                  )}
                </div>

                {adm.status === "PENDING" && (
                  <div className="flex gap-2 sm:flex-col">
                    <button
                      onClick={() => handleStatusChange(adm.id, "APPROVED")}
                      disabled={!adm.feeSlip || adm.feeSlip.status !== "VERIFIED"}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-medium hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      title={!adm.feeSlip ? "Fee slip not submitted yet" : adm.feeSlip.status !== "VERIFIED" ? "Verify fee slip first" : "Approve admission"}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(adm.id, "REJECTED")}
                      className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-medium hover:bg-red-700 transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleStatusChange(adm.id, "WAITLISTED")}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700 transition-colors"
                    >
                      Waitlist
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
