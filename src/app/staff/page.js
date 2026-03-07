export const metadata = {
  title: "Faculty",
};

const Staff = () => {
  const staffMembers = [
    {
      name: "Dr. Muhammad Ali Khan",
      position: "Principal",
      qualification: "Ph.D in Education",
      experience: "20 Years",
      subjects: ["Educational Leadership", "Administration"],
      initials: "MAK",
      color: "bg-maroon-900",
    },
    {
      name: "Prof. Fatima Ahmed",
      position: "Vice Principal",
      qualification: "M.Phil Physics",
      experience: "15 Years",
      subjects: ["Physics", "Mathematics"],
      initials: "FA",
      color: "bg-gold-600",
    },
    {
      name: "Dr. Hassan Raza",
      position: "Head of Science",
      qualification: "Ph.D Chemistry",
      experience: "18 Years",
      subjects: ["Chemistry", "Organic Chemistry"],
      initials: "HR",
      color: "bg-blue-700",
    },
    {
      name: "Ms. Aisha Malik",
      position: "English Teacher",
      qualification: "M.A English",
      experience: "12 Years",
      subjects: ["English Literature", "Grammar"],
      initials: "AM",
      color: "bg-emerald-700",
    },
    {
      name: "Mr. Ahmad Hussain",
      position: "Mathematics Teacher",
      qualification: "M.Sc Mathematics",
      experience: "10 Years",
      subjects: ["Mathematics", "Statistics"],
      initials: "AH",
      color: "bg-purple-700",
    },
    {
      name: "Dr. Sara Khan",
      position: "Biology Teacher",
      qualification: "Ph.D Biology",
      experience: "14 Years",
      subjects: ["Biology", "Botany", "Zoology"],
      initials: "SK",
      color: "bg-rose-700",
    },
    {
      name: "Prof. Usman Ali",
      position: "Computer Teacher",
      qualification: "M.Sc Computer Science",
      experience: "8 Years",
      subjects: ["Computer Science", "Programming"],
      initials: "UA",
      color: "bg-cyan-700",
    },
    {
      name: "Ms. Zainab Fatima",
      position: "Urdu Teacher",
      qualification: "M.A Urdu",
      experience: "11 Years",
      subjects: ["Urdu Literature", "Islamic Studies"],
      initials: "ZF",
      color: "bg-amber-700",
    },
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold-600 font-semibold text-sm uppercase tracking-wider">
            Our Team
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Expert Faculty Members
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our dedicated and highly qualified teaching staff brings decades of
            experience and passion for student success.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
          {staffMembers.map((staff, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-6 card-hover text-center"
            >
              {/* Avatar */}
              <div
                className={`w-16 h-16 rounded-2xl ${staff.color} flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 shadow-md`}
              >
                {staff.initials}
              </div>

              <h3 className="text-base font-bold text-gray-900 mb-1">
                {staff.name}
              </h3>
              <div className="text-gold-600 text-sm font-semibold mb-1">
                {staff.position}
              </div>
              <div className="text-gray-400 text-xs mb-1">
                {staff.qualification}
              </div>
              <div className="text-gray-400 text-xs mb-4">
                {staff.experience} Experience
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {staff.subjects.map((subject, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-50 text-gray-600 px-2.5 py-1 rounded-lg text-[11px] font-medium border border-gray-100"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why section */}
        <div className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-800 px-8 py-16 sm:px-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
              Why Our Faculty Stands Out
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Highly Qualified",
                  desc: "All faculty members hold advanced degrees — Ph.D, M.Phil, or Master's — in their respective fields.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/></svg>
                  ),
                },
                {
                  title: "Deeply Experienced",
                  desc: "Average teaching experience of 12+ years with proven track records in board result excellence.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>
                  ),
                },
                {
                  title: "Student-Centered",
                  desc: "Committed to every student's success with personalized attention and mentoring beyond the classroom.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-gold-400 mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
