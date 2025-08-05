const Achievements = () => {
  const achievements = [
    {
      year: "2024",
      title: "Best College Award",
      description: "Recognized as the Best College in RYK for Academic Excellence",
      icon: "🏆"
    },
    {
      year: "2023",
      title: "100% Board Results",
      description: "All students passed with outstanding marks in FSc examinations",
      icon: "📚"
    },
    {
      year: "2023",
      title: "Science Fair Winner",
      description: "Students won multiple awards in inter-college science competition",
      icon: "🔬"
    },
    {
      year: "2022",
      title: "Sports Championship",
      description: "Won district level sports competition in multiple categories",
      icon: "🥇"
    },
    {
      year: "2022",
      title: "Community Service Award",
      description: "Recognized for outstanding community service initiatives",
      icon: "🤝"
    },
    {
      year: "2021",
      title: "Digital Innovation",
      description: "Pioneered online learning platform during pandemic",
      icon: "💻"
    }
  ];

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-900 mb-4">Our Achievements</h1>
          <p className="text-lg text-gray-600">Celebrating Excellence and Success at Oxbridge College</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{achievement.icon}</div>
              <div className="text-orange-600 font-semibold text-sm mb-2">{achievement.year}</div>
              <h3 className="text-xl font-bold text-red-900 mb-3">{achievement.title}</h3>
              <p className="text-gray-600">{achievement.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-red-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Success Statistics</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div>
              <div className="text-3xl font-bold text-orange-300">100%</div>
              <div className="text-sm">Pass Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-300">5000+</div>
              <div className="text-sm">Graduates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-300">50+</div>
              <div className="text-sm">Expert Faculty</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-300">35</div>
              <div className="text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
