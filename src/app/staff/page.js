const Staff = () => {
  const staffMembers = [
    {
      name: "Dr. Muhammad Ali Khan",
      position: "Principal",
      qualification: "Ph.D in Education",
      experience: "20 Years",
      subjects: ["Educational Leadership", "Administration"],
      image: "👨‍🎓"
    },
    {
      name: "Prof. Fatima Ahmed",
      position: "Vice Principal",
      qualification: "M.Phil Physics",
      experience: "15 Years",
      subjects: ["Physics", "Mathematics"],
      image: "👩‍🏫"
    },
    {
      name: "Dr. Hassan Raza",
      position: "Head of Science",
      qualification: "Ph.D Chemistry",
      experience: "18 Years",
      subjects: ["Chemistry", "Organic Chemistry"],
      image: "👨‍🔬"
    },
    {
      name: "Ms. Aisha Malik",
      position: "English Teacher",
      qualification: "M.A English",
      experience: "12 Years",
      subjects: ["English Literature", "Grammar"],
      image: "👩‍🏫"
    },
    {
      name: "Mr. Ahmad Hussain",
      position: "Mathematics Teacher",
      qualification: "M.Sc Mathematics",
      experience: "10 Years",
      subjects: ["Mathematics", "Statistics"],
      image: "👨‍🏫"
    },
    {
      name: "Dr. Sara Khan",
      position: "Biology Teacher",
      qualification: "Ph.D Biology",
      experience: "14 Years",
      subjects: ["Biology", "Botany", "Zoology"],
      image: "👩‍🔬"
    },
    {
      name: "Prof. Usman Ali",
      position: "Computer Teacher",
      qualification: "M.Sc Computer Science",
      experience: "8 Years",
      subjects: ["Computer Science", "Programming"],
      image: "👨‍💻"
    },
    {
      name: "Ms. Zainab Fatima",
      position: "Urdu Teacher",
      qualification: "M.A Urdu",
      experience: "11 Years",
      subjects: ["Urdu Literature", "Islamic Studies"],
      image: "👩‍🏫"
    }
  ];

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-900 mb-4">Our Expert Faculty</h1>
          <p className="text-lg text-gray-600">Meet our dedicated and qualified teaching staff</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {staffMembers.map((staff, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="text-6xl mb-4">{staff.image}</div>
              <h3 className="text-lg font-bold text-red-900 mb-2">{staff.name}</h3>
              <div className="text-orange-600 font-semibold mb-2">{staff.position}</div>
              <div className="text-sm text-gray-600 mb-2">{staff.qualification}</div>
              <div className="text-sm text-gray-500 mb-3">Experience: {staff.experience}</div>
              <div className="border-t pt-3">
                <div className="text-xs text-gray-600 font-semibold mb-1">Subjects:</div>
                <div className="flex flex-wrap gap-1">
                  {staff.subjects.map((subject, idx) => (
                    <span key={idx} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-red-900 to-orange-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Our Faculty is the Best</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="text-xl font-semibold mb-2">Highly Qualified</h3>
              <p className="text-sm">All faculty members hold advanced degrees in their respective fields</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-xl font-semibold mb-2">Experienced</h3>
              <p className="text-sm">Average teaching experience of 12+ years with proven track records</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="text-xl font-semibold mb-2">Dedicated</h3>
              <p className="text-sm">Committed to student success and academic excellence</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
