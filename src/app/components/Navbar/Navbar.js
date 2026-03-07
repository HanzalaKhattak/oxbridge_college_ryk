
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/achievements", label: "Achievements" },
    { href: "/staff", label: "Faculty" },
    { href: "/admission", label: "Admission" },
  ];

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-maroon-950/95 backdrop-blur-md shadow-lg"
          : "bg-maroon-950"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-maroon-950 font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform">
              OC
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-white leading-tight tracking-tight">
                Oxbridge College
              </div>
              <div className="text-[11px] text-gold-400 font-medium -mt-0.5">
                Rahim Yar Khan
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-white/15 text-gold-400"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="w-px h-6 bg-white/20 mx-2" />

            <Link
              href="/login"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/login")
                  ? "bg-white/15 text-gold-400"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="ml-1 px-5 py-2 rounded-lg text-sm font-semibold bg-gold-500 text-maroon-950 hover:bg-gold-400 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign Up
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-white rounded transition-all duration-300 origin-left ${
                  isOpen ? "rotate-45 w-[22px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white rounded transition-all duration-300 ${
                  isOpen ? "opacity-0 -translate-x-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white rounded transition-all duration-300 origin-left ${
                  isOpen ? "-rotate-45 w-[22px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3 space-y-1 bg-maroon-950/98 backdrop-blur-md">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-white/15 text-gold-400"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="h-px bg-white/10 my-2" />

          <Link
            href="/login"
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive("/login")
                ? "bg-white/15 text-gold-400"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-center bg-gold-500 text-maroon-950 hover:bg-gold-400 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
