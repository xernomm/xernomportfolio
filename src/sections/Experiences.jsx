import React, { useState } from "react";
import { Container, Row, Modal, Button } from "react-bootstrap";
import { Card, CardMedia, CardContent, Typography, CardActionArea, Grid, Box } from "@mui/material"
import ytp from '../img/youthopia.jpg'
import rpg from '../img/RPG.png'
import pinet from '../img/jne.jpg'



const experienceData = [
  {
    title: "PT Prima Integrasi Network",
    position: "Full Stack Developer",
    img: pinet,
    date: "June 2024 – Present",
    details: [
      "Developed chatbot using Streamlit Python and Ollama LLM",
      "Developed LLM with Model Context Protocol for AI advanced automation tools",
      "Developed chatbot with RAG using Langchain Ollama and ReactJs",
      "Developed a social media super-app using ReactJs and Python Flask",
      "Developed automation process with RPA",
      "Worked with Couchbase, SQLite, MySQL, SinglestoreDB",
      "Secured apps with JWT, 2FA (Google & Microsoft)",
      "Used Bootstrap, TailwindCSS, PrimeReact, and VantaJS",
      "Built conference meeting app using Jitsi Meet",
      "Created the company profile"
    ]
  },
  {
    title: "Youthopia",
    position: "Junior Full-Stack Web Developer",
    img: ytp,
    date: "2024",
    details: [
      "Developed websites front-end to back-end",
      "Used ReactJs, NodeJs, SQL",
      "Successfully implemented view pages",
      "Satisfied employer needs"
    ]
  },
  {
    title: "RPG Ventures",
    position: "Junior Developer / Data Manager",
    img: rpg,
    date: "2023",
    details: [
      "Built DBT pipelines",
      "Created Google Apps Script automation",
      "Optimized BigQuery for performance",
      "Improved report accuracy and reduced manual work"
    ]
  }
];

export const Experiences = () => {
  const [show, setShow] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);

  const handleShow = (exp) => {
    setSelectedExp(exp);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <Container className="text-white pt-5 col-12">
      <h1 className="display-3 fw-bold primary">Experiences</h1>
      <hr />
        <Box 
        sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
            gap: 4,
            }}>

          {experienceData.map((exp, idx) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                              <Card
              key={idx}
              sx={{ backgroundColor: "#121212", color: "#fff", cursor: "pointer" }}
              onClick={() => handleShow(exp)}
              className="mx-auto"
            >
            <CardMedia
                component="img"
                height="140"
                image={exp.img}
                alt={exp.title}
            />
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {exp.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {exp.position} | {exp.date}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
              </Grid>

          ))}
        </Box>

      {/* Modal Bootstrap */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedExp?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Position:</strong> {selectedExp?.position}</p>
          <p><strong>Duration:</strong> {selectedExp?.date}</p>
          <ul>
            {selectedExp?.details.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
