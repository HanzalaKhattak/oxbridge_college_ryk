"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const Hero = () => {
  const stats = [
    { value: 5000, suffix: "+", label: "Graduates" },
    { value: 50, suffix: "+", label: "Expert Faculty" },
    { value: 35, suffix: "", label: "Years of Excellence" },
    { value: 100, suffix: "%", label: "Board Results" },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-800" />

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full border border-white" />
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full border border-white" />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full border border-white" />
      </div>

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/25 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-400 text-sm font-medium">
                Admissions Open 2026
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Shape Your{" "}
              <span className="text-gold-400">Future</span> at
              <br />
              Oxbridge College
            </h1>

            <p className="text-lg text-white/70 max-w-xl mb-8 leading-relaxed">
              Rahim Yar Khan&apos;s premier institution for F.Sc education.
              Empowering students with academic excellence, modern facilities,
              and expert faculty since 1990.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/admission"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-gold-500 text-maroon-950 font-semibold text-sm hover:bg-gold-400 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Apply for Admission
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/achievements"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-200"
              >
                Explore Achievements
              </Link>
            </div>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full">
          <path
            d="M0 60V30C360 0 720 0 1080 30C1260 45 1350 52 1440 60H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

function StatCard({ stat, index }) {
  const { count, ref } = useCountUp(stat.value, 2000);

  return (
    <div
      ref={ref}
      className={`glass rounded-2xl p-6 text-center card-hover ${
        index === 0 ? "lg:translate-y-4" : ""
      } ${index === 3 ? "lg:-translate-y-4" : ""}`}
    >
      <div className="text-3xl sm:text-4xl font-extrabold text-gold-400 mb-1">
        {count}
        {stat.suffix}
      </div>
      <div className="text-white/60 text-sm font-medium">{stat.label}</div>
    </div>
  );
}

export default Hero;
