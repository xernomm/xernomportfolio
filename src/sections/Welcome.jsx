import React, { useState, useEffect } from 'react';
import { Button, Container, Row } from "react-bootstrap"
import '../styles/Buttons.css'
import * as I from 'react-bootstrap-icons'
import me from '../img/HomeContact.png'
import Lottie from "lottie-react"
import developer from '../lottie/Animation - 1713494594395.json'
import intro from '../lottie/intro.json'

export const Welcome = ({ scrollToAboutMe }) => {

    const [text, setText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDelaying, setIsDelaying] = useState(false);
    const words = "Hello! I am Rafael Richie.";

    const [textIndex, setTextIndex] = useState(0);
    const texts = ['Fullstack Web Developer', 'Front-End Engineer', 'Back-End Developer', 'UI/UX Designer', 'Data scientist', 'AI Developer', 'Software Tester'];
 
    useEffect(() => {
        const interval = setInterval(() => {
          setTextIndex(prevIndex => (prevIndex + 1) % texts.length);
        }, 2000); 
    
        return () => clearInterval(interval); 
      }, []); 

      useEffect(() => {
        if (!isDelaying) {
          const interval = setInterval(() => {
            setText(words.substring(0, currentIndex + 1));
            setCurrentIndex(prevIndex => {
              if (prevIndex === words.length) {
                setIsDelaying(true);
                setTimeout(() => {
                  setIsDelaying(false);
                  setCurrentIndex(0);
                }, 2000);
              }
              return prevIndex === words.length ? prevIndex : prevIndex + 1;
            });
          }, 100);
          return () => clearInterval(interval);
        }
      }, [currentIndex, isDelaying, words]);
      
      const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };




    const handleDownloadClick = () => {
        // Assuming your file path is relative to the public directory
        const filePath = process.env.PUBLIC_URL + '/downloads/RafaelRichieCurriculumVitae.pdf';
        
        // Create an anchor element
        const anchor = document.createElement('a');
        anchor.href = filePath;
        
        // Set the 'download' attribute to initiate download
        anchor.download = 'RafaelRichieCurriculumVitae.pdf';
        
        // Programmatically click the anchor element
        anchor.click();
      };

    return(
        <>
        <Container>
            <Row>
                <div className="col-lg-12 d-lg-flex  align-items-center justify-content-center">
                    <div className="col-lg-6 col-sm-12 d-flex justify-content-center align-items-center">
                        {/* <img src={me} alt="" className="contactMeImg col-12" onClick={handleEmailClick} style={{ cursor: 'pointer' }}/> */}
                        <Lottie animationData={developer} />
                    </div>
                    <div className="col-lg-5 col-sm-12 my-auto">

                      <div className="changeTextBox">
                        <div className='helloContainer'>

                        <h1 className="smTextCenter primary display-5 fw-bold">
                          {text} <span className='text-white blink'>|</span>
                          </h1>
                        </div>
                          <hr />
                          <p className="primary lead smTextCenter">
                            

                              <span className='text-white lead '>And I'm a </span>
                              <span className="fw-bold">
                               {texts[textIndex]}
                              </span>
                        </p>
                      </div>
                        
                        <div className="mt-1">
                            <div className="d-lg-flex align-items center">
                                <div className="d-flex justify-content-center col-lg-12 col-sm-12">
                                    <Button className="get-started-btn col-12" onClick={handleDownloadClick}>
                                        Download my CV <I.Download className="ms-1 mb-1"/> 
                                    </Button>
                                
                                </div>
                            </div>
                            <div className="d-lg-flex align-items center mt-3">
                                <div className="d-flex justify-content-center col-lg-12 col-sm-12">
                                    <Button className="secondary-btn col-12" onClick={() => scrollToSection('connect')}>
                                        Contact Me <I.EnvelopeFill className="ms-1 mb-1"/> 
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
        </>
    )
}
