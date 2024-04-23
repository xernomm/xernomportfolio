import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import learning from '../img/abclearning.png'
import car from '../img/abccar.png'
import aj from '../img/aj.png'
import shop from '../img/shopp.png'
import kyn from '../img/kyn.png'
import mow from '../img/mow.png'
import lifecms from '../img/lifecms.png'
import ytp from '../img/ytpProject.png'
import * as I from 'react-bootstrap-icons'
import Lottie from "lottie-react"
import coding1 from '../lottie/codingblonde.json'
import development from '../lottie/development.json'
import { useState } from "react"

export const Projects = () => {

    const projects = [
        {
            image: aj, 
            title:"ABC Jobs", 
            desc:"This project is my favorite. It has social media features such as thread posting, comments, and reply comments. It also has job applying system and admin system to approve the job appliers. In general the purpose of the website is similar to LinkedIn. It's made to find jobs and also works as a social media.", 
            link:"https://github.com/xernomm/abccommunityjob.git", 
            tools:"ReactJs, Spring Boot, SQL",
            status: "Finished"

        },
        {
            image: shop, 
            title:"Shopp", 
            desc:"This project is my also my favorite. Because in this project i learned much on how to make a proper system. This is basically an e-commerce website, implemented with e-commerce features such as adding to cart, checkout, fees like delivery and services, calculated by distance and location coordinates, discounts, admin features, shopp's own virtual account, and it's integrated with PayPal payment API. Also many more features such as adding and auditing product as a supplier, supplier incomes, and review system, etc.", 
            link:"https://github.com/xernomm/ShoppCommerce.git", 
            tools:"ReactJs, Spring Boot, SQL, Leaflet.js",
            status: "Finished"

        },
        {
            image: learning, 
            title:"ABC Learning", 
            desc:"This website is only a front-end. The purpose of this website is for online learning management system or LMS.", 
            tools:"HTML, CSS, JS",
            status: "In development"
        },
        {
            image: lifecms, 
            title:"News Portal CMS", 
            desc:"This website is using Liferay template. Similar to Wordpress. The purpose of this website is to manage news, users, and roles in the news portal.", 
            tools:"HTML, CSS, JS, Liferay",
            status: "In development"

        },
        {
            image: ytp, 
            title:"Emobuddy", 
            desc:"This website is the project i've worked on, in the last company (Youthopia MY) as a full-stack developer. It's equipped with Stripe integration for subscription plans. The website is made for learning purposes for youths.",
            tools:"ReactJS, NodeJS, SQL, Stripe API",
            status: "In development"

        },
        {
            image: mow, 
            title:"Meals on Wheels", 
            desc:"This website is the project i'm still developing. The purpose of this website is for online meals and services. It's equipped with free map API service, Leaflet.js.", 
            tools:"ReactJs, Spring Boot, SQL, Leaflet.js",
            status: "In development"

        },
        {
            image: car, 
            title:"XYZ Cars", 
            desc:"This website is the project i'm still developing. The purpose of this website is for selling second-handed cars. Implemented along with features such as test-drive schedules, car bidding, and admin features. This is the website where i started to learn using ReactJS and Spring technologies.", 
            tools:"ReactJs, Spring Boot, SQL",
            status: "In development"

        },
        {
            image: kyn, 
            title:"Know Your Neighborhood", 
            desc:"This website is the project i'm still developing. The purpose of this website is for addressing stores around your neighborhood. It's implemented along with admin features that can register and delete stores.", 
            tools:"ReactJs, Spring Boot, SQL",
            status: "In development"

        },
    ]

    const [selectedProject, setSelectedProject] = useState(null);
    const [show, setShow] = useState(false);
  
    function handleShow(project) {
      setSelectedProject(project);
      setShow(true);
    }

    return (
        <>
        <Container>
            <Row>
                <div className="pt-5">
                    <h1 className="primary display-3 fw-bold">
                        Projects
                    </h1>
                    <br />
                    <p className="lead text-white">
                        These are a few projects i've been working on alone as a full-stack web-developer, and a few projects are still in development. 
                    </p>
                    <br />
                    <hr />
                    <br />

                    <div className="d-lg-flex col-lg-12 justify-content-center">
                        <div className="projectSets">
                            <div className="px-2">
                                <Row xs={1} lg={3} className="g-3"> 
                                    {projects.map((project, index) => (
                                        <Col key={index}>
                                            <div className="projectBox " onClick={() => handleShow(project)}>
                                                <div className="projectImgBox mb-2">
                                                    <img src={project.image} alt="" className="projectImage"/>
                                                </div>
                                                <div className="projectBody px-3">
                                                    <h1 className="primary px30">
                                                        {project.title}
                                                    </h1>
                                                    <hr />
                                                    <p className="">Developed with: <span className="fw-bold">{project.tools}</span> </p>
                                                </div>
                                                <div className="px-3">
                                                    {project.status === "Finished" && (
                                                        <a type="button" className="get-started-btn" target="_blank" rel="noreferrer" href={project.link}>View on GitHub <I.Github className="mb-1 ms-2" /></a>
                                                    )}
                                                    {project.status === "In development" && (
                                                        <a type="button" className="btn btn-secondary" target="_blank" rel="noreferrer" href={project.link}>In development <I.LockFill className="mb-1 ms-2" /></a>
                                                    )}
                                                </div>
                                            </div>
                                            
                                        </Col>
                                        
                                    ))}
                                </Row>
                            </div>
                        </div>
                    </div>

                </div>
            </Row>
        </Container>

        <Modal 
      show={show} 
      onHide={() => setShow(false)}
      backdrop="static"
      aria-labelledby="example-custom-modal-styling-title"
      size="xl"
      centered={true}
      className="backdrop"
    >
      {selectedProject && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProject.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-lg-flex justify-content-center aligm-items-center">
              <div className="col-lg-6 col-sm-12 d-flex justify-content-center align-items-center px-3">
                <img src={selectedProject.image} alt="" className="col-12 projectImage"/>
              </div>
              <div className="col-lg-6 col-sm-12 px-3">
                <p className="display-6 fw-bold">{selectedProject.title}</p>
                <div className="d-flex align-items-center">
                <p className="lead">{selectedProject.desc}</p>
                </div>
                <hr className="border border-dark"/>
                <p className="lead mb-5">Developed with: <span className="fw-bold">{selectedProject.tools}</span> </p>
                {selectedProject.status === "Finished" && (
                   <a type="button" className="get-started-btn col-12 text-center" target="_blank" rel="noreferrer" href={selectedProject.link}>View on GitHub <I.Github className="mb-1 ms-2" /></a>
                )}
                {selectedProject.status === "In development" && (
                    <a type="button" className="btn btn-secondary col-12 text-center" target="_blank" rel="noreferrer" href={selectedProject.link}>In development <I.LockFill className="mb-1 ms-2" /></a>
                )}
              </div>
            </div>
          </Modal.Body>
        </>
      )}
    </Modal>

        </>
    )
}