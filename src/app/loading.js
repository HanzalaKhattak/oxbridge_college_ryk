export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
          <div className="w-12 h-12 border-4 border-maroon-200 border-t-maroon-900 rounded-full animate-spin" />
        </div>
        <p className="text-gray-500 text-sm font-medium">Loading…</p>
      </div>
    </div>
  );
}
