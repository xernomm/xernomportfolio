import Header from "@/components/Header";
import Welcome from "@/components/Welcome";
import Education from "@/components/Education";
import Experiences from "@/components/Experiences";
import TechnicalSkills from "@/components/TechnicalSkills";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import AboutMe from "@/components/AboutMe";
import ContactMe from "@/components/ContactMe";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative z-10">
        <Welcome />
        <Education />
        <Experiences />
        <TechnicalSkills />
        <Projects />
        <Certificates />
        <AboutMe />
        <ContactMe />
      </main>
      <Footer />
    </>
  );
}
