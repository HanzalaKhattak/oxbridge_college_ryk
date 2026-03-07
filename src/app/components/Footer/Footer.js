import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-maroon-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-maroon-950 font-extrabold text-lg">
                OC
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">Oxbridge College</div>
                <div className="text-xs text-gold-400">Rahim Yar Khan</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Empowering students with quality F.Sc education and shaping
              future leaders since 1990.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gold-500 hover:text-maroon-950 transition-colors text-white/70">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gold-500 hover:text-maroon-950 transition-colors text-white/70">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 9.71a8.5 8.5 0 00-.91-4.13 2.92 2.92 0 00-1.72-1A78.36 78.36 0 0012 4.27a78.45 78.45 0 00-8.34.3 2.87 2.87 0 00-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 000 6.48 9.55 9.55 0 00.3 2 3.14 3.14 0 00.71 1.36 2.86 2.86 0 001.49.78 45.18 45.18 0 006.5.33c3.5.05 6.57 0 10.2-.46a2.86 2.86 0 001.44-.77 2.8 2.8 0 00.67-1.31 9.73 9.73 0 00.24-2.15c.06-1.18.06-2.37 0-3.55zm-12.41 5.1V9.19l5.59 2.81-5.59 2.81z"/></svg>
              </a>
              <a href="mailto:info@oxbridgecollege.edu.pk" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gold-500 hover:text-maroon-950 transition-colors text-white/70">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gold-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/achievements", label: "Achievements" },
                { href: "/staff", label: "Our Faculty" },
                { href: "/admission", label: "Apply Now" },
                { href: "/login", label: "Student Portal" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold-400 text-sm transition-colors flex items-center gap-2"
                  >
                    <svg className="w-3 h-3 text-gold-500/50" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gold-400 mb-4">
              Programs
            </h3>
            <ul className="space-y-2.5">
              {["Pre-Medical", "Pre-Engineering", "Computer Science", "Commerce"].map(
                (program) => (
                  <li key={program}>
                    <span className="text-white/60 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500/40" />
                      F.Sc {program}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gold-400 mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-gold-500/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span className="text-white/60 text-sm">
                  Girls College Road, Canal Avenue,
                  <br />
                  Rahim Yar Khan, Punjab
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gold-500/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span className="text-white/60 text-sm">
                  068-5870925 / 0333-5870925
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gold-500/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span className="text-white/60 text-sm">
                  info@oxbridgecollege.edu.pk
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} Oxbridge College, Rahim Yar Khan.
            All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/admission" className="text-white/40 hover:text-gold-400 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/admission" className="text-white/40 hover:text-gold-400 text-xs transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
