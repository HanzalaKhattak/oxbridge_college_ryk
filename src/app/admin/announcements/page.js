"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", type: "GENERAL" });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("/api/admin/announcements");
      if (res.status === 403) { router.push("/admin/login"); return; }
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setAnnouncements(data.announcements || []);
    } catch { } finally { setLoading(false); }
  };

  useEffect(() => { fetchAnnouncements(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ title: "", content: "", type: "GENERAL" });
        setShowForm(false);
        fetchAnnouncements();
      }
    } catch { } finally { setSubmitting(false); }
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
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-500 text-sm mt-1">{announcements.length} announcements</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-maroon-900 text-white rounded-xl text-sm font-medium hover:bg-maroon-800 transition-colors self-start"
        >
          {showForm ? "Cancel" : "+ New Announcement"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-500"
              >
                <option value="GENERAL">General</option>
                <option value="URGENT">Urgent</option>
                <option value="EVENT">Event</option>
                <option value="EXAM">Exam</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-maroon-900 text-white rounded-xl text-sm font-medium hover:bg-maroon-800 transition-colors disabled:opacity-50"
            >
              {submitting ? "Publishing..." : "Publish Announcement"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No announcements</div>
        ) : (
          announcements.map((ann) => (
            <div key={ann.id} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-gray-900">{ann.title}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  ann.type === "URGENT" ? "bg-red-50 text-red-700" :
                  ann.type === "EVENT" ? "bg-blue-50 text-blue-700" :
                  ann.type === "EXAM" ? "bg-amber-50 text-amber-700" :
                  "bg-gray-100 text-gray-600"
                }`}>
                  {ann.type}
                </span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ann.isActive ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                  {ann.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-gray-500 text-sm">{ann.content}</p>
              <div className="text-xs text-gray-400 mt-2">
                {new Date(ann.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
