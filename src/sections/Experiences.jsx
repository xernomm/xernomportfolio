import { Button, Container, Row } from "react-bootstrap"
import Lottie from "lottie-react"
import experience from '../lottie/experience.json'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export const Experiences = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
    return (
        <>
         <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <div id="expcontent" className=" col-12">
                            <div className="text-white col-lg-12 col-sm-12">
                            <p className="lead fw-bold">1. RPG VENTURES <span className="lead fw-bold"> (2023)</span></p>
                            <ul>
                                
                                <li>
                                <p className=""><span className="fw-bold">Position: </span> Junior Developer/Data Manager</p>
                                </li>
                                <li>
                                <p><span className="fw-bold">Description: </span>At RPG Ventures, I played a key role in leveraging modern data tools and technologies to streamline and enhance data processes. My responsibilities included:</p>
                                <ul>
                                    <li>
                                    <small className="fw-bold">DBT Pipelines</small> <br />
                                    </li>
                                    <li>
                                    <small className="fw-bold">Google Apps Script</small> <br />
                                    </li>
                                    <li>
                                    <small className="fw-bold">BigQuery</small> <br />
                                    </li>
                                </ul>
                                </li>
                            </ul>
                            </div>
                            <div className="col-12 text-white">
                            <ul>
                                <li className="">
                                <p><span className="fw-bold">Key Achievements: </span></p>
                                <ul>
                                    <li>
                                    <small className="fw-bold">Successfully implemented a series of dbt models, improving the accuracy and reliability of analytical reports.</small>
                                    </li>
                                    <li>
                                    <small className="fw-bold">Developed and deployed Google Apps Script solutions, resulting in a significant reduction in manual data entry and processing time.</small>
                                    </li>
                                    <li>
                                    <small className="fw-bold">Optimized BigQuery queries, leading to faster data retrieval and improved overall system performance.</small>
                                    </li>
                                </ul>
                                </li>
                            </ul>
                            </div>
                            </div>
      </Carousel.Item>
      <Carousel.Item>
      <div id="expcontent2" className=" col-12 mt-5">
                        <div className="text-white col-12">
                        <p className="lead fw-bold">2. Youthopia <span className="lead fw-bold"> (2024)</span></p>
                        <ul>
                            <li>
                            <p className=""><span className="fw-bold">Position: </span> Junior Full-Stack Web Developer</p>
                            </li>
                            <li>
                            <p><span className="fw-bold">Description: </span>At Youthopia, I played a key role in building websites starting from front-end to back-end. My responsibilities included:</p>
                            <ul>
                                <li>
                                <small className="fw-bold">ReactJs</small> <br />
                                </li>
                                <li>
                                <small className="fw-bold">NodeJs</small> <br />
                                </li>
                                <li>
                                <small className="fw-bold">SQL</small> <br />
                                </li>
                            </ul>
                            </li>
                        </ul>
                        </div>
                        <div className="col-12 text-white">
                        <ul>
                            <li className="">
                            <p><span className="fw-bold">Key Achievements: </span></p>
                            <ul>
                                <li>
                                <small className="fw-bold">Successfully implemented view pages using ReactJS and NodeJs</small>
                                </li>
                                <li>
                                <small className="fw-bold">Fulfilling and pleased employer's needs</small>
                                </li>
                            </ul>
                            </li>
                        </ul>
                        </div>
                    </div>
      </Carousel.Item>
      <Carousel.Item>
      <div id="expcontent3" className="col-12 mt-5">
    <div className="text-white col-12">
        <p className="lead fw-bold">3. PT Prima Integrasi Network <span className="lead fw-bold">(June 2024 - Present)</span></p>
        <ul>
            <li>
                <p><span className="fw-bold">Position: </span> Full Stack Developer</p>
            </li>
            <li>
                <p><span className="fw-bold">Description: </span>At PT Prima Integrasi Network, I have contributed to various projects and tasks, including:</p>
                <ul>
                    <li><small className="fw-bold">Developed chatbot using Streamlit Python and Ollama LLM</small></li>
                    <li><small className="fw-bold">Implemented chatbot with RAG (retrieval-augmented generation) using Langchain Ollama and ReactJs</small></li>
                    <li><small className="fw-bold">Developed a social media super-app using ReactJs and Python Flask</small></li>
                    <li><small className="fw-bold">Automated processes with RPA (robotic-process automation)</small></li>
                    <li><small className="fw-bold">Worked with various databases, including Couchbase, SQLite, MySQL, and SingleStoreDB</small></li>
                    <li><small className="fw-bold">Enhanced application security with JWT tokens and 2FA Authentication (Google and Microsoft)</small></li>
                    <li><small className="fw-bold">Designed applications using Bootstrap, TailwindCSS, and JavaScript frameworks such as PrimeReact and VantaJS</small></li>
                    <li><small className="fw-bold">Developed a conference meeting app using Jitsi Meet</small></li>
                    <li><small className="fw-bold">Created the company profile</small></li>
                </ul>
            </li>
        </ul>
    </div>
    <div className="col-12 text-white">
        <ul>
            <li>
                <p><span className="fw-bold">Key Achievements: </span></p>
                <ul>
                    <li><small className="fw-bold">Successfully developed and deployed a chatbot integrating advanced LLM technologies</small></li>
                    <li><small className="fw-bold">Delivered a highly functional social media super-app meeting client requirements</small></li>
                    <li><small className="fw-bold">Automated manual processes, significantly improving efficiency</small></li>
                    <li><small className="fw-bold">Implemented robust application security with modern authentication methods</small></li>
                </ul>
            </li>
        </ul>
    </div>
</div>

      </Carousel.Item>
    </Carousel>
        <Container>
            <Row>
                <div className="pt-5">
                    <h1 className="display-3 fw-bold primary ">
                        Experiences
                    </h1>
                    <hr />
                    <div className="d-lg-flex col-12 justify-content-center mt-5">
                        <div className="col-lg-5 col-sm-12">



                    
       

                        </div>
                        <div className="col-lg-7 col-sm-12">
                            <Lottie animationData={experience} />
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
        </>
    )
}