import React, { useState } from "react";
import { Container, Row, Modal, Button } from "react-bootstrap";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Grid,
  Box,
} from "@mui/material";
import upj from "../img/upj.jpg";
import lithan from "../img/lithan.png";

const educationData = [
  {
    title: "Lithan Academy",
    degree: "Bachelor’s Degree in Software Engineering (BDSE)",
    img: lithan,
    date: "September 2022 – October 2023",
    details: [
      "Focused on full-stack web development.",
      "Frontend: ReactJs, NextJs, Tailwind CSS, HTML, CSS, JavaScript, jQuery, Bootstrap.",
      "Backend: NodeJs, Flask, Spring Boot, Java.",
      "Database: SQL, SQLite",
      "Tools: GitHub, Power BI, AppSheet, Axure, Liferay",
    ],
  },
  {
    title: "Universitas Pembangunan Jaya",
    degree: "S1 Sistem Informasi",
    img: upj,
    date: "September 2022 – Present",
    details: [
      "Focused on project management skills, documentation, and system analysis.",
      "Tools: Vscode, Microsoft word.",
    ],
  },
];

export const Education = () => {
  const [show, setShow] = useState(false);
  const [selectedEdu, setSelectedEdu] = useState(null);

  const handleShow = (edu) => {
    setSelectedEdu(edu);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <Container className="text-white pt-5 col-12">
      <h1 className="display-3 fw-bold primary">Education</h1>
      <hr />
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
          gap: 4,
        }}
      >
        {educationData.map((edu, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <Card
              sx={{ backgroundColor: "#121212", color: "#fff", cursor: "pointer" }}
              onClick={() => handleShow(edu)}
              className="mx-auto"
            >
              <CardMedia
                component="img"
                height="140"
                image={edu.img}
                alt={edu.title}
              />
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {edu.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {edu.degree} | {edu.date}
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
          <Modal.Title>{selectedEdu?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Degree:</strong> {selectedEdu?.degree}</p>
          <p><strong>Duration:</strong> {selectedEdu?.date}</p>
          <ul>
            {selectedEdu?.details.map((item, index) => (
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
