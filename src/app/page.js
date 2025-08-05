import Hero from "./components/Hero/Hero";
import Link from "next/link";

export default function Home() {
  const programs = [
    {
      name: "Pre-Medical",
      subjects: ["Biology", "Chemistry", "Physics"],
      description: "Prepare for medical colleges with our comprehensive pre-medical program",
      icon: "🩺"
    },
    {
      name: "Pre-Engineering", 
      subjects: ["Mathematics", "Chemistry", "Physics"],
      description: "Build a strong foundation for engineering careers",
      icon: "⚙️"
    },
    {
      name: "Computer Science",
      subjects: ["Mathematics", "Physics", "Computer"],
      description: "Explore the world of technology and programming",
      icon: "💻"
    }
  ];

  const features = [
    {
      title: "Experienced Faculty",
      description: "Learn from highly qualified and experienced teachers",
      icon: "👨‍🏫"
    },
    {
      title: "Modern Labs",
      description: "Well-equipped science and computer laboratories",
      icon: "🔬"
    },
    {
      title: "100% Results",
      description: "Outstanding board examination results every year",
      icon: "📊"
    },
    {
      title: "Co-curricular Activities",
      description: "Sports, debates, and various competitions",
      icon: "🏆"
    }
  ];

  return (
    <div className="bg-white">
      <Hero />
      
      {/* Programs Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-900 mb-4">Our Programs</h2>
            <p className="text-gray-600">Choose from our diverse range of F.Sc programs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4 text-center">{program.icon}</div>
                <h3 className="text-xl font-bold text-red-900 mb-3 text-center">{program.name}</h3>
                <p className="text-gray-600 mb-4 text-center">{program.description}</p>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-700">Subjects:</div>
                  <div className="flex flex-wrap gap-2">
                    {program.subjects.map((subject, idx) => (
                      <span key={idx} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-900 mb-4">Why Choose Oxbridge College?</h2>
            <p className="text-gray-600">Excellence in education since 1990</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-red-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-900 mb-4">Quick Access</h2>
            <p className="text-gray-600">Find what you're looking for</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/admission" className="bg-red-900 text-white p-6 rounded-lg text-center hover:bg-red-800 transition">
              <div className="text-3xl mb-3">📝</div>
              <div className="font-semibold">Apply Now</div>
              <div className="text-sm opacity-90">Submit admission form</div>
            </Link>
            
            <Link href="/achievements" className="bg-orange-600 text-white p-6 rounded-lg text-center hover:bg-orange-700 transition">
              <div className="text-3xl mb-3">🏆</div>
              <div className="font-semibold">Achievements</div>
              <div className="text-sm opacity-90">Our success stories</div>
            </Link>
            
            <Link href="/staff" className="bg-red-700 text-white p-6 rounded-lg text-center hover:bg-red-600 transition">
              <div className="text-3xl mb-3">👥</div>
              <div className="font-semibold">Faculty</div>
              <div className="text-sm opacity-90">Meet our teachers</div>
            </Link>
            
            <Link href="/login" className="bg-orange-700 text-white p-6 rounded-lg text-center hover:bg-orange-800 transition">
              <div className="text-3xl mb-3">🔐</div>
              <div className="font-semibold">Student Portal</div>
              <div className="text-sm opacity-90">Access your account</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-red-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl mb-3">📍</div>
              <div className="font-semibold mb-2">Visit Us</div>
              <div className="text-sm opacity-90">Girls College Road, Canal Avenue<br />Rahim Yar Khan</div>
            </div>
            <div>
              <div className="text-3xl mb-3">📞</div>
              <div className="font-semibold mb-2">Call Us</div>
              <div className="text-sm opacity-90">068-5870925<br />0333-5870925</div>
            </div>
            <div>
              <div className="text-3xl mb-3">✉️</div>
              <div className="font-semibold mb-2">Email Us</div>
              <div className="text-sm opacity-90">info@oxbridgecollege.edu.pk</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
