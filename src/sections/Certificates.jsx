import React, { useState } from "react";
import { Container, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
} from "@mui/material";

const categorizedCertificates = {
  "Business & Entrepreneurship": [
    { name: "Financial Accounting: Foundations", path: "certificate1.pdf" },
    { name: "Entrepreneurship Strategy: From Ideation to Exit", path: "certificate5.pdf" },
    { name: "Identifying Social Entrepreneurship Opportunities", path: "certificate9.pdf" },
    { name: "Intellectual Property for Entrepreneurs", path: "certificate11.pdf" },
  ],
  "Technology & Systems": [
    { name: "Enterprise Systems", path: "certificate4.pdf" },
    { name: "Information Systems Operations and Business Resiliency", path: "certificate10.pdf" },
    { name: "Understanding the Enterprise Systems Environment", path: "certificate16.pdf" },
    { name: "IBM Introduction to Data Engineering", path: "certificate8.pdf" },
  ],
  "Project & Marketing": [
    { name: "Foundations of Project Management", path: "certificate7.pdf" },
    { name: "Project Initiation: Starting a Successful Project", path: "certificate15.pdf" },
    { name: "Foundations of Digital Marketing and E-commerce", path: "certificate6.pdf" },
  ],
  "Creative & Ethics": [
    { name: "Cracking the Creativity Code: Discovering Ideas", path: "certificate3.pdf" },
    { name: "Computing, Ethics, and Society Foundations", path: "certificate2.pdf" },
    { name: "Leading transformations: Manage change", path: "certificate13.pdf" },
  ],
  "Intellectual Skills": [
    { name: "Introduction to Intellectual Property", path: "certificate12.pdf" },
    { name: "Linear Algebra: Linear Systems and Matrix Equations", path: "certificate14.pdf" },
  ],
};

export default function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState("Technology & Systems");
  const [certificateFilter, setCertificateFilter] = useState("");

  return (
    <Container className="col-12 ">
      <h1 className="primary display-3 fw-bold">
        Certificates
      </h1>
      <hr />
      <Row>
        {/* Sidebar Kategori */}
        <Col lg={4} sm={12} className="mt-3">
          <div
            className="
              categoryContainer
              d-flex
              flex-lg-column
              flex-row flex-nowrap
              col-lg-8
              col-sm-12
            "
          >
            {Object.keys(categorizedCertificates).map((category, idx) => (
              <div
                key={idx}
                className={`mx-lg-0 mx-1 categoryBox ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
                style={{ cursor: "pointer" }}
              >
                <p
                  className={`lead px16 mb-0 ${
                    selectedCategory === category ? "fw-bold" : ""
                  }`}
                >
                  {category}
                </p>
              </div>
            ))}
          </div>
        </Col>

        {/* Konten Sertifikat */}
        <Col lg={8} sm={12} className="mt-3">
          {selectedCategory ? (
            <>

              <div className="">
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(min(250px, 100%), 1fr))",
                    gap: 3,
                  }}
                >
                  {categorizedCertificates[selectedCategory]
                    .filter((cert) =>
                      cert.name
                        .toLowerCase()
                        .includes(certificateFilter.toLowerCase())
                    )
                    .map((cert, idx) => (
                      <Card
                        key={idx}
                        sx={{
                          backgroundColor: "#121212",
                          color: "#fff",
                          cursor: "pointer",
                          height: "100%",
                        }}
                        onClick={() =>
                          window.open(`/certificates/${cert.path}`, "_blank")
                        }
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image={`/certificates/previews/${cert.path.replace(
                              ".pdf",
                              "_page-0001.jpg"
                            )}`}
                            alt={cert.name}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                              {cert.name}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    ))}
                </Box>
              </div>
            </>
          ) : (
            <div className="text-white mt-3">
              Please select a category to view certificates.
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
