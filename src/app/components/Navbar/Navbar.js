
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-red-900 text-white px-4 py-3 flex items-center justify-between shadow-md">
      <div className="font-bold text-xl">
        <Link href="/">Oxbridge College</Link>
      </div>
      <ul className="flex space-x-6">
        <li><Link className="hover:text-orange-300 transition" href="/">Home</Link></li>
        <li><Link className="hover:text-orange-300 transition" href="/achievements">Achievements</Link></li>
        <li><Link className="hover:text-orange-300 transition" href="/staff">Staff</Link></li>
        <li><Link className="hover:text-orange-300 transition" href="/admission">Admission Form</Link></li>
        <li><Link className="hover:text-orange-300 transition" href="/login">Login</Link></li>
        <li><Link className="hover:text-orange-300 transition" href="/signup">Signup</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
