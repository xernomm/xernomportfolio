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
import { IntroVid } from './sections/IntroVid';
import { useRef } from 'react';
import { AboutMe } from './sections/AboutMe';
import { TechnicalSkills } from './sections/TechnicalSkills';
import { Experiences } from './sections/Experiences';
import { Projects } from './sections/Projects';
import { Extras } from './sections/Extras';
import { Footer } from './sections/Footer';
import { ContactUs } from './sections/ContactMe';

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
          <Row className='newRow' id="intro">
            <IntroVid ref={aboutMeRef} />
          </Row>
          <Row className='newRow' id="about">
            <AboutMe />
          </Row>
          <Row className='newRow' id="skills">
            <TechnicalSkills />
          </Row>
          <Row className='newRow' id="experiences">
            <Experiences />
          </Row>
          <Row className='newRow' id="projects">
            <Projects />
          </Row>
          <Row className='newRow' id="extras">
            <Extras />
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
