import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import Lottie from "lottie-react"
import developer from '../lottie/Animation - 1713494594395.json'
import intro from '../lottie/intro.json'
import * as I from 'react-bootstrap-icons'

// https://www.youtube.com/embed/MAMQ9DTyHTw?si=AQbtWgNZXQgvId34

export const IntroVid = React.forwardRef((props, ref) =>
{

    const handleDownloadClick = () => {
        // Assuming your file path is relative to the public directory
        const filePath = process.env.PUBLIC_URL + '/downloads/newIntro.mp4';
        
        // Create an anchor element
        const anchor = document.createElement('a');
        anchor.href = filePath;
        
        // Set the 'download' attribute to initiate download
        anchor.download = 'newIntro.mp4';
        
        // Programmatically click the anchor element
        anchor.click();
      };


    return (
        <div className="px-0" ref={ref}>
        <Container>
            <Row>
                <div className="d-lg-flex justify-content-center align-items-center">
                    
                    <div className="col-lg-5 col-sm-12 d-lg-flex justify-content-center align-items-center">
                        <div className="px-0">
                        <h1 className="primary fw-bold display-4 mb-0">
                                My Introduction <br />
                                Video.
                            </h1>
                            <hr />
                            <Button href="https://www.youtube.com/embed/MAMQ9DTyHTw?si=AQbtWgNZXQgvId34" target="_blank" className="get-started-btn mt-2 col-12">
                                View on YouTube <I.Youtube className="lead ms-1 mb-1"/>
                            </Button>
                            <Button onClick={handleDownloadClick} className="secondary-btn mt-2 col-12">
                                Download my introduction video <I.Download className="lead ms-1 mb-1"/>
                            </Button>
                        </div>
                    </div>

                    <div className="col-lg-7 col-sm-12 d-flex justify-content-center align-items-center">
                       <Lottie animationData={intro} className="mt-0"/>

                    </div>


                </div>
            </Row>
        </Container>
        </div>
    )
})