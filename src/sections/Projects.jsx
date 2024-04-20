import { Container, Row } from "react-bootstrap"
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

export const Projects = () => {

    const inDevelopmentList = [
        {
            image: learning, 
            title:"ABC Learning", 
            desc:"This website is only a front-end. The purpose of this website is for online learning management system or LMS.", 
            tools:"HTML, CSS, JS"
        },
        {
            image: lifecms, 
            title:"Online News Portal CMS", 
            desc:"This website is using Liferay template. Similar to Wordpress. The purpose of this website is to manage news, users, and roles in the news portal.", 
            tools:"HTML, CSS, JS, Liferay"
        },
        {
            image: ytp, 
            title:"Emobuddy", 
            desc:"This website is the project i've worked on, in the last company (Youthopia MY) as a full-stack developer. It's equipped with Stripe integration for subscription plans. The website is made for learning purposes for youths.",
            tools:"ReactJS, NodeJS, SQL, Stripe API"
        },
        {
            image: mow, 
            title:"Meals on Wheels", 
            desc:"This website is the project i'm still developing. The purpose of this website is for online meals and services. It's equipped with free map API service, Leaflet.js.", 
            tools:"ReactJs, Spring Boot, SQL, Leaflet.js"
        },
        {
            image: car, 
            title:"XYZ Cars", 
            desc:"This website is the project i'm still developing. The purpose of this website is for selling second-handed cars. Implemented along with features such as test-drive schedules, car bidding, and admin features. This is the website where i started to learn using ReactJS and Spring technologies.", 
            tools:"ReactJs, Spring Boot, SQL"
        },
        {
            image: kyn, 
            title:"Know Your Neighborhood", 
            desc:"This website is the project i'm still developing. The purpose of this website is for addressing stores around your neighborhood. It's implemented along with admin features that can register and delete stores.", 
            tools:"ReactJs, Spring Boot, SQL"
        },
    ]

    const finishedProjects = [
        {
            image: aj, 
            title:"ABC Jobs", 
            desc:"This project is my favorite. It has social media features such as thread posting, comments, and reply comments. It also has job applying system and admin system to approve the job appliers. In general the purpose of the website is similar to LinkedIn. It's made to find jobs and also works as a social media.", 
            link:"https://github.com/xernomm/abccommunityjob.git", 
            tools:"ReactJs, Spring Boot, SQL"
        },
        {
            image: shop, 
            title:"Shopp", 
            desc:"This project is my also my favorite. Because in this project i learned much on how to make a proper system. This is basically an e-commerce website, implemented with e-commerce features such as adding to cart, checkout, fees like delivery and services, calculated by distance and location coordinates, discounts, admin features, shopp's own virtual account, and it's integrated with PayPal payment API. Also many more features such as adding and auditing product as a supplier, supplier incomes, and review system, etc.", 
            link:"https://github.com/xernomm/ShoppCommerce.git", 
            tools:"ReactJs, Spring Boot, SQL, Leaflet.js"
        },

    ]
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
                    <hr />
                    <p className="mt-5 text-white fw-bold display-5 ">
                                Finished Projects
                            </p>
                    <div className="d-lg-flex justify-content-center">
                    <div className="col-lg-5 col-sm-12">
                            <Lottie animationData={coding1} />

                        </div>
                        <div className="projectSets col-lg-7 col-sm-12">
                            {finishedProjects.map((project, index) => (
                            <div className="project col-12" key={index}>
                                <div className="projectBg">
                                    <img src={project.image} alt={project.title} className="projectImage" />
                                </div>
                                <p className="text-white lead projectName">{project.title}</p>
                                <hr />
                                <div className="projectBody">
                                    
                                    <p className="text-white">{project.desc}</p>
                                    <p className=" text-white">
                                       Developed with: <br />
                                        <span className="fw-bold lead">
                                       {project.tools}
                                        </span> 
                                    </p>
                                </div>
                                <div className="py-4">

                                </div>
                                <div className="projectFooter">
                                    <a type="button" className="get-started-btn" target="_blank" rel="noreferrer" href={project.link}>View on GitHub <I.Github className="mb-1 ms-2" /></a>
                                </div>
                            </div>
                            ))}
                        </div> 
                    </div>
                    <br />
                    <hr />
                    <br />
                    <p className="mt-5 text-white fw-bold display-5">
                                In development
                            </p>
                    <div className="d-lg-flex justify-content-center">
                    <div className="projectSets col-lg-6 col-sm-12">
                            {inDevelopmentList.map((project, index) => (
                            <div className="projectInDev col-12" key={index}>
                                <div className="projectBg">
                                    <img src={project.image} alt={project.title} className="projectImage" />
                                </div>
                                <p className="text-white lead projectName">{project.title}</p>
                                <hr />
                                <div className="projectBody">
                                    <p className="text-white">{project.desc}</p>
                                    <p className=" text-white">
                                       Developed with: <br />
                                        <span className="fw-bold lead">
                                       {project.tools}
                                        </span> 
                                    </p>
                                </div>
                                <div className="projectFooter">
                                    <p className="lead text-white">In Development</p>
                                </div>
                            </div>
                            ))}
                        </div> 
                        <div className="col-lg-6 col-sm-12">
                            <Lottie animationData={development} />
                           
                        </div>
                    </div>

                </div>
            </Row>
        </Container>
        </>
    )
}