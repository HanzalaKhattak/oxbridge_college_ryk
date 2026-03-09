"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminFeeSlips() {
  const [feeSlips, setFeeSlips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const router = useRouter();

  const fetchFeeSlips = async () => {
    try {
      const res = await fetch("/api/admin/fee-slips");
      if (res.status === 403) { router.push("/admin/login"); return; }
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setFeeSlips(data.feeSlips || []);
    } catch { } finally { setLoading(false); }
  };

  useEffect(() => { fetchFeeSlips(); }, []);

  const handleStatusChange = async (feeSlipId, status) => {
    const remarks = status === "REJECTED" ? prompt("Reason for rejection:") : null;
    if (status === "REJECTED" && remarks === null) return;

    try {
      const res = await fetch("/api/admin/fee-slips", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feeSlipId, status, remarks }),
      });
      if (res.ok) fetchFeeSlips();
    } catch { }
  };

  const filtered = filter === "ALL" ? feeSlips : feeSlips.filter((f) => f.status === filter);

  const statusBadge = (status) => {
    const map = {
      PENDING: "bg-amber-50 text-amber-700",
      VERIFIED: "bg-emerald-50 text-emerald-700",
      REJECTED: "bg-red-50 text-red-700",
    };
    return map[status] || "bg-gray-50 text-gray-600";
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
          <h1 className="text-2xl font-bold text-gray-900">Fee Slips</h1>
          <p className="text-gray-500 text-sm mt-1">{feeSlips.length} total fee slips submitted</p>
        </div>
        <div className="flex gap-2">
          {["ALL", "PENDING", "VERIFIED", "REJECTED"].map((s) => (
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
          <div className="text-center py-16 text-gray-400">No fee slips found</div>
        ) : (
          filtered.map((slip) => (
            <div key={slip.id} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-gray-900">{slip.student?.name || "Unknown"}</h3>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusBadge(slip.status)}`}>
                      {slip.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-gray-400 text-xs">Student ID</span>
                      <div className="font-medium text-gray-700">{slip.student?.studentId}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Application #</span>
                      <div className="font-medium text-gray-700">{slip.admission?.applicationNumber}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Payment Method</span>
                      <div className="font-medium text-gray-700">{slip.paymentMethod}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Transaction ID</span>
                      <div className="font-medium text-gray-700">{slip.transactionId}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Amount</span>
                      <div className="font-bold text-gray-900">Rs. {Number(slip.amount).toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Phone</span>
                      <div className="font-medium text-gray-700">{slip.student?.phone}</div>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Submitted</span>
                      <div className="font-medium text-gray-700">
                        {new Date(slip.submittedAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                    {slip.remarks && (
                      <div>
                        <span className="text-gray-400 text-xs">Remarks</span>
                        <div className="font-medium text-gray-700">{slip.remarks}</div>
                      </div>
                    )}
                  </div>
                  {slip.screenshotUrl && (
                    <div className="mt-3">
                      <a href={slip.screenshotUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-maroon-700 underline hover:text-maroon-900">
                        View Payment Screenshot
                      </a>
                    </div>
                  )}
                </div>

                {slip.status === "PENDING" && (
                  <div className="flex gap-2 sm:flex-col">
                    <button
                      onClick={() => handleStatusChange(slip.id, "VERIFIED")}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleStatusChange(slip.id, "REJECTED")}
                      className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-medium hover:bg-red-700 transition-colors"
                    >
                      Reject
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
