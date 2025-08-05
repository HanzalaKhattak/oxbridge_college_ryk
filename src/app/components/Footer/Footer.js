const Footer = () => {
  return (
    <footer className="bg-red-900 text-white py-6 px-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="font-bold text-lg">Oxbridge College</h2>
          <p className="text-sm">Empowering students since 1990</p>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="font-semibold">Contact Us</h3>
          <p className="text-sm">Girls College Road, Canal Avenue, Rahim Yar Khan</p>
          <p className="text-sm">Phone: 068-5870925 | 0333-5870925</p>
          <p className="text-sm">Email: info@oxbridgecollege.edu.pk</p>
        </div>
        <div>
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="text-sm space-y-1">
            <li><a href="/admission" className="hover:text-orange-300 transition">Admission Form</a></li>
            <li><a href="/achievements" className="hover:text-orange-300 transition">Achievements</a></li>
            <li><a href="/staff" className="hover:text-orange-300 transition">Staff</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs mt-6 border-t border-red-800 pt-4">
        &copy; {new Date().getFullYear()} Oxbridge College. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
