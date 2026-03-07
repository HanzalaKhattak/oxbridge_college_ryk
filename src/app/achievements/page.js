export const metadata = {
  title: "Achievements",
};

const Achievements = () => {
  const achievements = [
    {
      year: "2024",
      title: "Best College Award",
      description:
        "Recognized as the Best College in Rahim Yar Khan for Academic Excellence by the Board of Education.",
      color: "bg-gold-50 text-gold-700 border-gold-200",
    },
    {
      year: "2023",
      title: "100% Board Results",
      description:
        "All students passed with outstanding marks in FSc board examinations, with multiple top-10 positions.",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      year: "2023",
      title: "Science Fair Winner",
      description:
        "Students won multiple awards including gold medals in the inter-college science competition.",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      year: "2022",
      title: "Sports Championship",
      description:
        "Won district-level sports competition in cricket, athletics, and table tennis categories.",
      color: "bg-maroon-50 text-maroon-700 border-maroon-200",
    },
    {
      year: "2022",
      title: "Community Service Award",
      description:
        "Recognized for outstanding community service initiatives including blood donation drives.",
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      year: "2021",
      title: "Digital Innovation",
      description:
        "Pioneered online learning platform during the pandemic, ensuring uninterrupted education.",
      color: "bg-cyan-50 text-cyan-700 border-cyan-200",
    },
  ];

  const stats = [
    { value: "100%", label: "Board Pass Rate" },
    { value: "5,000+", label: "Successful Graduates" },
    { value: "50+", label: "Expert Faculty" },
    { value: "35+", label: "Years of Excellence" },
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">
            Our Track Record
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Achievements & Milestones
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            A legacy of academic excellence, competitive success, and holistic
            student development at Oxbridge College.
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 stagger-children">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-7 card-hover"
            >
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${achievement.color}`}
              >
                {achievement.year}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {achievement.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-800 px-8 py-16 sm:px-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
              Our Success in Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-gold-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
