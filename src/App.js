import logo from './logo.svg';
import './App.css';
import './styles/Images.css'
import './styles/Fonts.css'
import './styles/Buttons.css'
import './styles/Border.css'
import './styles/Background.css'
import { Header } from './sections/Header';
import { Container, Row } from 'react-bootstrap';
import { Welcome } from './sections/Welcome';
import { useRef } from 'react';
import { AboutMe } from './sections/AboutMe';
import { TechnicalSkills } from './sections/TechnicalSkills';
import { Experiences } from './sections/Experiences';
import { Projects } from './sections/Projects';
import { Footer } from './sections/Footer';
import { ContactUs } from './sections/ContactMe';
import Certifications from './sections/Certificates';
import { Education } from './sections/Education';

function App() {

  const aboutMeRef = useRef(null);

  const scrollToAboutMe = () => {
    aboutMeRef.current.scrollIntoView({ behavior: 'smooth' });
  };



  return (
    <>
    <div className='marginBody'>
    <Header />
    <Container >
          <Row id='home'>
            <Welcome scrollToAboutMe={scrollToAboutMe}/>
          </Row>
          <Row className='newRow' id="educations">
            <Education />
          </Row>
          <Row className='newRow' id="experiences">
            <Experiences />
          </Row>
          <Row className='newRow' id="skills">
            <TechnicalSkills />
          </Row>
          <Row className='newRow' id="projects">
            <Projects />
          </Row>
          <Row className='newRow' id="certifications">
            <Certifications />
          </Row>
          <Row className='newRow' id="about">
            <AboutMe />
          </Row>
          <Row className='newRow' id='connect'>
            <ContactUs />
          </Row>
    </Container>
    </div>
    <Footer />
    </>

  );
}

export default App;
