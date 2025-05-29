import { Container, Modal } from "react-bootstrap"
import { Card, CardMedia, CardContent, Typography, CardActionArea, Grid } from "@mui/material"
import Box from '@mui/material/Box';
import learning from '../img/abclearning.png'
import car from '../img/abccar.png'
import aj from '../img/aj.png'
import shop from '../img/shopp.png'
import kyn from '../img/kyn.png'
import mow from '../img/mow.png'
import lifecms from '../img/lifecms.png'
import ytp from '../img/ytpProject.png'
import vankaai from '../img/vankaai.jpg'
import whatsappai from '../img/whatsappai.jpg'
import whatsappmcp from '../img/whatsappmcp.jpg'
import * as I from 'react-bootstrap-icons'
import { useState } from "react"

export const Projects = () => {
    const projects = [
        {
            image: whatsappmcp,
            title: "MCP WhatsApp AI",
            desc: "AI Agent connected to MCP server and integrated to whatsapp chat.",
            tools: "MCP, Ollama, OracleDB, Typescript baileys, Flask.",
            status: "In development"
        },
        {
            image: whatsappai,
            title: "RAG LLM WhatsApp AI",
            desc: "RAG based chatbot connected to whatsapp chat.",
            link: "https://github.com/xernomm/whatsappai.git",
            tools: "Ollama, Flask, ChromaDB, Typescript baileys.",
            status: "Finished"
        },
        {
            image: vankaai,
            title: "Vanka AI Assistant",
            desc: "Customer Service AI Assistant",
            link: "https://github.com/xernomm/askrindo.git",
            tools: "Ollama, Flask, OracleDB, ReactJs",
            status: "Finished"
        },
        {
            image: aj,
            title: "ABC Jobs",
            desc: "Social media job platform with posting, comments, job application and admin approval system.",
            link: "https://github.com/xernomm/abccommunityjob.git",
            tools: "ReactJs, Spring Boot, SQL",
            status: "Finished"
        },
        {
            image: shop,
            title: "Shopp",
            desc: "E-commerce system with cart, checkout, payment integration, supplier audit, etc.",
            link: "https://github.com/xernomm/ShoppCommerce.git",
            tools: "ReactJs, Spring Boot, SQL, Leaflet.js",
            status: "Finished"
        },
        {
            image: learning,
            title: "ABC Learning",
            desc: "Front-end for online LMS (Learning Management System).",
            tools: "HTML, CSS, JS",
            status: "In development"
        },
        {
            image: lifecms,
            title: "News Portal CMS",
            desc: "Built using Liferay template. Manage users, roles, and news like WordPress.",
            tools: "HTML, CSS, JS, Liferay",
            status: "In development"
        },
        {
            image: ytp,
            title: "Emobuddy",
            desc: "Youth learning portal with Stripe subscriptions. Built while working at Youthopia MY.",
            tools: "ReactJS, NodeJS, SQL, Stripe API",
            status: "In development"
        },
        {
            image: mow,
            title: "Meals on Wheels",
            desc: "Online meal service with map API (Leaflet.js) and location-based delivery.",
            tools: "ReactJs, Spring Boot, SQL, Leaflet.js",
            status: "In development"
        },
        {
            image: car,
            title: "XYZ Cars",
            desc: "Used car marketplace with test drive, bidding, admin panel, etc.",
            tools: "ReactJs, Spring Boot, SQL",
            status: "In development"
        },
        {
            image: kyn,
            title: "Know Your Neighborhood",
            desc: "Neighborhood-based store listing with admin registration system.",
            tools: "ReactJs, Spring Boot, SQL",
            status: "In development"
        }
    ]

    const [selectedProject, setSelectedProject] = useState(null);
    const [show, setShow] = useState(false);

    function handleShow(project) {
        setSelectedProject(project);
        setShow(true);
    }

    return (
        <>
            <Container className="pt-5">
            <h1 className="display-3 fw-bold primary">Projects</h1>
            <hr />
                <Typography variant="subtitle1" className="text-white mb-4">
                    These are a few projects I've been working on as a full-stack web developer. Some are still in development.
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                        gap: 4,
                    }}
                >
                    {projects.map((project, idx) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                            <Card
                                sx={{
                                    backgroundColor: "#121212",
                                    color: "#fff",
                                    height: "100%",
                                    cursor: "pointer"
                                }}
                                onClick={() => handleShow(project)}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={project.image}
                                        alt={project.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {project.title}
                                        </Typography>
                                        <Typography variant="body2" color="gray">
                                            {project.tools}
                                        </Typography>
                                        <Typography variant="body2" className="mt-2" color="#bbb">
                                            {project.status === "Finished" ? "✅ Finished" : "🛠 In Development"}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Box>
            </Container>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                backdrop="static"
                size="xl"
                centered
                className="backdrop"
            >
                {selectedProject && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedProject.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-lg-flex justify-content-center align-items-top">
                                <div className="col-lg-6 col-sm-12 d-flex justify-content-center px-3">
                                    <img src={selectedProject.image} alt="" className="col-12 projectImage" />
                                </div>
                                <div className="col-lg-6 col-sm-12 px-3">
                                    <Typography variant="h5" gutterBottom>{selectedProject.title}</Typography>
                                    <Typography variant="body1" paragraph>{selectedProject.desc}</Typography>
                                    <hr className="border border-dark" />
                                    <Typography variant="body1">
                                        <strong>Developed with:</strong> {selectedProject.tools}
                                    </Typography>
                                    <div className="mt-4">
                                        {selectedProject.link && selectedProject.status === "Finished" && (
                                            <a
                                                type="button"
                                                className="get-started-btn-fill col-12 text-center"
                                                target="_blank"
                                                rel="noreferrer"
                                                href={selectedProject.link}
                                            >
                                                View on GitHub <I.Github className="mb-1 ms-2" />
                                            </a>
                                        )}
                                        {selectedProject.link && selectedProject.status === "In development" && (
                                            <a
                                                type="button"
                                                className="btn btn-secondary col-12 text-center"
                                                target="_blank"
                                                rel="noreferrer"
                                                href={selectedProject.link}
                                            >
                                                In development <I.LockFill className="mb-1 ms-2" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </>
    )
}
