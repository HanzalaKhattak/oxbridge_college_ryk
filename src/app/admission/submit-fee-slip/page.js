"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SubmitFeeSlipForm() {
  const searchParams = useSearchParams();
  const admissionId = searchParams.get("admissionId");
  const applicationNumber = searchParams.get("applicationNumber");
  const router = useRouter();

  const [form, setForm] = useState({
    paymentMethod: "",
    transactionId: "",
    amount: "15000",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/admission/submit-fee-slip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          admissionId: parseInt(admissionId),
          paymentMethod: form.paymentMethod,
          transactionId: form.transactionId,
          amount: parseFloat(form.amount),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Failed to submit fee slip");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!admissionId) {
    return (
      <div className="bg-gray-50 min-h-screen pt-24 pb-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Missing Admission Details</h1>
          <p className="text-gray-500 mb-6">Please submit your admission form first to get your admission ID.</p>
          <Link href="/admission" className="px-6 py-3 bg-maroon-900 text-white rounded-xl text-sm font-medium hover:bg-maroon-800 transition-colors">
            Go to Admission Form
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-gray-50 min-h-screen pt-24 pb-16">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Fee Slip Submitted!</h2>
            <p className="text-gray-500 mb-2">Your fee slip has been submitted for verification.</p>
            <p className="text-amber-700 text-sm font-medium mb-6">
              You can check your admission status after 3 hours.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/admission/status"
                className="px-6 py-3 bg-maroon-900 text-white rounded-xl text-sm font-medium hover:bg-maroon-800 transition-colors"
              >
                Check Admission Status
              </Link>
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-white text-gray-700 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Submit Fee Slip</h1>
          <p className="text-gray-500 text-sm">
            Application #{applicationNumber || admissionId}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
            <p className="text-amber-800 text-sm">
              Please enter the payment details below. Your admission will be processed after fee verification by the admin.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Payment Method *</label>
              <select
                value={form.paymentMethod}
                onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500"
                required
              >
                <option value="">Select payment method</option>
                <option value="EASYPAISA">Easypaisa</option>
                <option value="JAZZCASH">JazzCash</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Transaction ID / Reference Number *</label>
              <input
                type="text"
                value={form.transactionId}
                onChange={(e) => setForm({ ...form, transactionId: e.target.value })}
                placeholder="e.g. TXN123456789"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                {form.paymentMethod === "EASYPAISA" && "Enter the Easypaisa transaction ID from your confirmation SMS"}
                {form.paymentMethod === "JAZZCASH" && "Enter the JazzCash transaction ID from your confirmation SMS"}
                {form.paymentMethod === "BANK_TRANSFER" && "Enter the bank deposit slip reference number"}
                {!form.paymentMethod && "Select a payment method first"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount Paid (Rs.) *</label>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500"
                required
                min="1"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-maroon-900 text-white py-3 rounded-xl font-semibold text-sm hover:bg-maroon-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Fee Slip"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SubmitFeeSlipPage() {
  return (
    <Suspense fallback={
      <div className="bg-gray-50 min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-maroon-200 border-t-maroon-700 rounded-full animate-spin" />
      </div>
    }>
      <SubmitFeeSlipForm />
    </Suspense>
  );
}
