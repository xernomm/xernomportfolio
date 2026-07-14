import Header from "@/components/Header";
import Welcome from "@/components/Welcome";
import Featured from "@/components/Featured";
import Education from "@/components/Education";
import Experiences from "@/components/Experiences";
import TechnicalSkills from "@/components/TechnicalSkills";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import EnglishProficiency from "@/components/EnglishProficiency";
import Thesis from "@/components/Thesis";
import AboutMe from "@/components/AboutMe";
import ContactMe from "@/components/ContactMe";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative z-10">
        <Welcome />
        <Featured />
        <Education />
        <Experiences />
        <TechnicalSkills />
        <Projects />
        <Certificates />
        <EnglishProficiency />
        <Thesis />
        <AboutMe />
        <ContactMe />
      </main>
      <Footer />
    </>
  );
}
