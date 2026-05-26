import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Rafael Richie | Full-Stack Developer & AI Engineer",
  description:
    "Portfolio of Rafael Richie Soaduon Udjulawa — Full-Stack Developer, AI Engineer, and LLM Specialist. Explore projects, skills, certifications, and connect.",
  keywords: [
    "Rafael Richie",
    "Full Stack Developer",
    "AI Developer",
    "LLM Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Rafael Richie" }],
  openGraph: {
    title: "Rafael Richie | Full-Stack Developer & AI Engineer",
    description:
      "Portfolio of Rafael Richie — Full-Stack Developer, AI Engineer, and LLM Specialist.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col relative`}
      >
        {children}
      </body>
    </html>
  );
}
