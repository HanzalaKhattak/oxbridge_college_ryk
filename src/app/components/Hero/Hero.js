const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-red-900 via-red-700 to-orange-500 text-white py-20 px-4 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Welcome to Oxbridge College, RYK</h1>
        <p className="text-lg md:text-2xl mb-8 font-medium">
          Empowering students since 1990. Discover a world of opportunities, academic excellence, and vibrant campus life. Join us to shape your future!
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <a href="/admission" className="bg-white text-red-900 font-bold px-6 py-3 rounded shadow hover:bg-orange-100 transition">Apply for Admission</a>
          <a href="/achievements" className="bg-orange-600 text-white font-bold px-6 py-3 rounded shadow hover:bg-orange-700 transition">View Achievements</a>
        </div>
        <div className="flex flex-wrap gap-6 justify-center mt-8">
          <div className="bg-white bg-opacity-10 rounded-lg p-6 min-w-[180px]">
            <h2 className="text-2xl font-bold mb-2">5000+</h2>
            <p className="text-sm">Graduates</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 min-w-[180px]">
            <h2 className="text-2xl font-bold mb-2">50+</h2>
            <p className="text-sm">Qualified Staff</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 min-w-[180px]">
            <h2 className="text-2xl font-bold mb-2">35 Years</h2>
            <p className="text-sm">Academic Excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
