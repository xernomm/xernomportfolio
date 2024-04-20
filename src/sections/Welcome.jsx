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
    const texts = ['Fullstack Web Developer', 'Front-End Engineer', 'Back-End Developer', 'UI/UX Designer', 'Data scientist', 'Content Creator', 'Software Tester'];
 
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
      

    const handleEmailClick = () => {
        const email = 'rafaelrichie03@gmail.com';
        const subject = 'Hello Rafael!'; // You can set a default subject
        const body = 'Hi Rafael,\n We are interested in hiring you!\n'; // You can set a default body
    
        // Construct the mailto URL
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
        // Open the default email client
        window.open(mailtoUrl);
      };


    const handleDownloadClick = () => {
        // Assuming your file path is relative to the public directory
        const filePath = process.env.PUBLIC_URL + '/downloads/RafaelRichie-CV.pdf';
        
        // Create an anchor element
        const anchor = document.createElement('a');
        anchor.href = filePath;
        
        // Set the 'download' attribute to initiate download
        anchor.download = 'RafaelRichie-CV.pdf';
        
        // Programmatically click the anchor element
        anchor.click();
      };

    return(
        <>
        <Container>
            <Row>
                <div className="col-lg-12 d-lg-flex  align-items-center justify-content-center">
                    <div className="col-lg-7 col-sm-12 d-flex justify-content-center align-items-center">
                        {/* <img src={me} alt="" className="contactMeImg col-12" onClick={handleEmailClick} style={{ cursor: 'pointer' }}/> */}
                        <Lottie animationData={developer} />
                    </div>
                    <div className="col-lg-5 col-sm-12 ">

                      <div className="changeTextBox">
                        <h1 className="primary display-3 fw-bold glowing-text">
                          {text} <span className='text-white blink'>|</span>
                          </h1>
                          <hr />
                          <p className="primary lead display-6">
                            

                              <span className='text-white display-6'>And I'm a </span>{texts[textIndex]}
                        </p>
                      </div>
                        
                        <div className="mt-5">
                            <div className="d-lg-flex align-items center">
                                <div className="d-flex justify-content-center col-lg-12 col-sm-12">
                                    <Button className="get-started-btn col-10" onClick={handleDownloadClick}>
                                        Download my CV <I.Download className="ms-1 mb-1"/> 
                                    </Button>
                                
                                </div>
                            </div>
                            <div className="d-lg-flex align-items center mt-2">
                                <div className="d-flex justify-content-center col-lg-12 col-sm-12">
                                    <Button className="secondary-btn col-10" onClick={handleEmailClick}>
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
