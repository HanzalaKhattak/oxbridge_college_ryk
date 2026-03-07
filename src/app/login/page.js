"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-800 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 -left-10 w-72 h-72 rounded-full border border-white/5" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full border border-white/5" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />

        <div className="relative flex flex-col justify-center px-16 py-12 w-full">
          <Link href="/" className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-maroon-950 font-extrabold text-xl shadow-lg">
              OC
            </div>
            <div>
              <div className="font-bold text-xl text-white">Oxbridge College</div>
              <div className="text-xs text-gold-400">Rahim Yar Khan</div>
            </div>
          </Link>

          <h1 className="text-4xl font-extrabold text-white leading-tight mb-6">
            Your Academic
            <br />
            Journey <span className="text-gold-400">Starts Here</span>
          </h1>
          <p className="text-white/50 text-lg max-w-md leading-relaxed mb-12">
            Access your student portal to view results, fee records, and stay
            updated with college announcements.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm">
            {[
              { label: "Results & Grades", icon: "📊" },
              { label: "Fee Records", icon: "💳" },
              { label: "Announcements", icon: "📢" },
              { label: "Admission Status", icon: "📋" },
            ].map((item, i) => (
              <div
                key={i}
                className="glass rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-white/70 text-sm font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-maroon-900 flex items-center justify-center text-gold-400 font-extrabold text-lg">
                OC
              </div>
              <div className="font-bold text-lg text-gray-900">
                Oxbridge College
              </div>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500">
              Sign in to your student account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1.5"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-shadow"
                required
                placeholder="student@oxbridge.edu.pk"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-shadow"
                required
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd"/>
                </svg>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-maroon-900 text-white py-3 rounded-xl font-semibold text-sm hover:bg-maroon-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-maroon-700 font-semibold hover:text-maroon-900 transition-colors"
            >
              Create Account
            </Link>
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;