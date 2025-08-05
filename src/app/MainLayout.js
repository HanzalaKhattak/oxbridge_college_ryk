"use client";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login" || pathname === "/signup";
  
  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}