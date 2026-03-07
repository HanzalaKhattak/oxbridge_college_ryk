import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "./MainLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Oxbridge College, Rahim Yar Khan",
    template: "%s | Oxbridge College",
  },
  description:
    "Oxbridge College, Rahim Yar Khan — Empowering students with quality F.Sc education since 1990. Pre-Medical, Pre-Engineering, Computer Science & Commerce programs.",
  keywords: [
    "Oxbridge College",
    "Rahim Yar Khan",
    "FSc",
    "Pre-Medical",
    "Pre-Engineering",
    "Computer Science",
    "College RYK",
  ],
  authors: [{ name: "Oxbridge College" }],
  openGraph: {
    title: "Oxbridge College, Rahim Yar Khan",
    description:
      "Empowering students with quality F.Sc education since 1990.",
    type: "website",
    locale: "en_PK",
    siteName: "Oxbridge College",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7b1535",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
