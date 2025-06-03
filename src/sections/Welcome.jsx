import React, { useState, useEffect } from 'react';
import { Button, Container, Row } from "react-bootstrap"
import '../styles/Buttons.css'
import * as I from 'react-bootstrap-icons'
import me from '../img/RafaelRichie2.png'
import Tooltip from '@mui/material/Tooltip';


export const Welcome = ({ scrollToAboutMe }) => {

    const [text, setText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDelaying, setIsDelaying] = useState(false);
    const words = "Hello! I am Rafael Richie.";

    const [textIndex, setTextIndex] = useState(0);
    const texts = ['Fullstack Web Developer', 'Frontend developer', 'Backend developer', 'UI/UX developer', 'LLM developer', 'AI Developer', 'Software Engineer'];
 
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
        <Container className='vh-100 d-flex justify-content-center align-items-center col-12'>
                <div className="col-lg-12 d-lg-flex  align-items-center justify-content-center">

                    <div className="col-lg-6 col-sm-12 d-flex justify-content-center align-items-center">
                        <img src={me} alt="" className="contactMeImg" style={{ cursor: 'pointer' }}/>
                        {/* <Lottie animationData={developer} /> */}
                    </div>

                    <div className="col-lg-6 col-sm-12 d-flex justify-content-center align-items-center my-auto">
                      <div className="col-9">

                        <div className="changeTextBox">
                          <div className='helloContainer'>

                          <h1 className="smTextCenter primary display-3 fw-bold">
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

                          <div className="">
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
                          <div className="d-flex col-12 justify-content-center justify-content-lg-start align-items-center mt-5">
                              <Tooltip title="Rafael's LinkedIn">
                                  <a className="col-1 mx-2 primary" href="https://www.linkedin.com/in/rafael-richie-502360250/" target="_blank" rel="noreferrer">
                                      <I.Linkedin className="lead" />
                                  </a>
                              </Tooltip>

                              <Tooltip title="Rafael's Instagram">
                                  <a className="col-1 mx-2 primary" href="https://www.instagram.com/rfl_rchiee/" target="_blank" rel="noreferrer">
                                      <I.Instagram className="lead" />
                                  </a>
                              </Tooltip>

                              <Tooltip title="Rafael's TikTok">
                                  <a className="col-1 mx-2 primary" href="https://www.tiktok.com/@raf_rchiee?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer">
                                      <I.Tiktok className="lead" />
                                  </a>
                              </Tooltip>

                              <Tooltip title="Rafael's WhatsApp">
                                  <a className="col-1 mx-2 primary" href="https://wa.me/6281284300979" target="_blank" rel="noreferrer">
                                      <I.Whatsapp className="lead" />
                                  </a>
                              </Tooltip>

                              <Tooltip title="Rafael's GitHub">
                                  <a className="col-1 mx-2 primary" href="https://github.com/xernomm" target="_blank" rel="noreferrer">
                                      <I.Github className="lead" />
                                  </a>
                              </Tooltip>
                          </div>

                      </div>
                    </div>

                    
                </div>
        </Container>
        </>
    )
}
