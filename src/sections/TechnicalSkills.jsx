import { Button, Col, Container, FloatingLabel, Form, ProgressBar, Row } from "react-bootstrap"


import reactLogo from '../img/reactlogo.png';
import mcp from '../img/mcp.png'
import nodeLogo from '../img/nodejslogo.svg';
import springBootLogo from '../img/springlogo.svg';
import javaLogo from '../img/java.svg';
import sqlLogo from '../img/sql.png';
import githubLogo from '../img/iconmonstr-github-1.svg';
import htmlLogo from '../img/html.svg';
import cssLogo from '../img/css.svg';
import jsLogo from '../img/js.png';
import jqueryLogo from '../img/jquery.svg';
import bootstrapLogo from '../img/bootstrap-logo.svg';
import dbtLogo from '../img/dbt-seeklogo.svg';
import appsheetLogo from '../img/appsheet-vector-logo-2022.svg';
import powerbiLogo from '../img/powerbi.svg';
import liferayLogo from '../img/liferay.svg';
import axureLogo from '../img/axure-2.svg';
import nextjs from '../img/nextjs-icon-svgrepo-com.svg'
import tailwind from '../img/tailwind-svgrepo-com.svg'
import php from '../img/php-logo-svgrepo-com.svg'
import ollama from '../img/ollama.png'
import langchain from '../img/langchain-seeklogo.svg'
import tagui from '../img/Tagui.png'
import sqlite from '../img/sqlite_logo_icon_169724.svg'
import mongo from '../img/mongodb_original_logo_icon_146424.svg'
import couchbase from '../img/couchbase_logo_icon_170319.svg'   
import streamlit from '../img/streamlit-seeklogo.png'   
import flask from '../img/flask.png'   
import { useState } from "react";

export const TechnicalSkills = () => {
    const [selectedCategory, setSelectedCategory] = useState("AI Development");

    const [skillFilter, setSkillFilter] = useState('');


const categorizedSkills = {
  "AI Development": {
    description: "Tools and frameworks for building and deploying AI applications.",
    skills: [
      { image: ollama, name: 'Ollama LLM', rate: 75 },
      { image: langchain, name: 'Langchain', rate: 75 },
      { image: mcp, name: 'Model Context Protocol', rate: 75 },
    ],
  },
  "Frontend": {
    description: "Libraries and tools for building user interfaces and web frontends.",
    skills: [
      { image: reactLogo, name: 'ReactJs', rate: 85 },
      { image: nextjs, name: 'NextJs', rate: 75 },
      { image: tailwind, name: 'Tailwind CSS', rate: 75 },
      { image: htmlLogo, name: 'HTML', rate: 95 },
      { image: cssLogo, name: 'CSS', rate: 92 },
      { image: jsLogo, name: 'JavaScript', rate: 83 },
      { image: jqueryLogo, name: 'jQuery', rate: 80 },
      { image: bootstrapLogo, name: 'Bootstrap', rate: 97 },
      { image: liferayLogo, name: 'Liferay', rate: 75 },
      { image: axureLogo, name: 'Axure', rate: 85 },
    ],
  },
  "Backend": {
    description: "Technologies for developing server-side applications and APIs.",
    skills: [
      { image: nodeLogo, name: 'NodeJs', rate: 75 },
      { image: springBootLogo, name: 'Spring Boot', rate: 85 },
      { image: javaLogo, name: 'Java', rate: 80 },
      { image: flask, name: 'Flask', rate: 75 },
      { image: php, name: 'PHP', rate: 75 },
    ],
  },
  "Database & Pipelines": {
    description: "Tools for data storage, pipelines, and database management.",
    skills: [
      { image: sqlLogo, name: 'SQL', rate: 75 },
      { image: sqlite, name: 'SQLite', rate: 75 },
      { image: mongo, name: 'MongoDB', rate: 75 },
      { image: couchbase, name: 'Couchbase', rate: 75 },
      { image: dbtLogo, name: 'DBT Pipelines', rate: 75 },
    ],
  },
  "Automation & Tools": {
    description: "Automation frameworks, version control, and productivity tools.",
    skills: [
      { image: tagui, name: 'TagUI', rate: 75 },
      { image: githubLogo, name: 'GitHub', rate: 80 },
      { image: streamlit, name: 'Streamlit', rate: 78 },
      { image: appsheetLogo, name: 'AppSheet', rate: 75 },
      { image: powerbiLogo, name: 'Power BI', rate: 80 },
    ],
  }
};

return (
<div className="pt-5">
    <h1 className="primary display-3 fw-bold">
        Skills
    </h1>
    <hr />
  <Container className="col-12">
    <Row>
      {/* Sidebar Kategori */}
      <Col lg={4} sm={12} className="mt-3 pe-5">
        {/* <h3 className="fw-bold text-white mb-3">Categories</h3> */}
        <div
          className="
            categoryContainer
            d-flex
            flex-lg-column
            flex-row flex-nowrap
          "
        >
{Object.keys(categorizedSkills).map((category, idx) => (
  <div
    key={idx}
    className={`mx-lg-0 mx-2 categoryBox ${
      selectedCategory === category ? 'active' : ''
    }`}
    onClick={() => setSelectedCategory(category)}
    style={{ cursor: 'pointer' }}
  >
    <p className="lead mb-0">{category}</p>


  </div>
))}

        </div>
      </Col>

      {/* Konten Skill */}
      <Col lg={8} sm={12} className="mt-3">
        {selectedCategory ? (
          <>
          <div className="d-flex justify-content-between align-items-center">

            <div className="skillCategoryTitle primary mb-3">
              {selectedCategory}
            </div>
            
            <FloatingLabel
            controlId="floatingInput"
            label="Search"
            className="mb-3 text-dark col-6"
            >
            <Form.Control
                type="text"
                placeholder="Filter skill"
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
            />
            </FloatingLabel>
          </div>
          <br />
            <div className="max50 overflowY pe-4">

                    <Row className="skillsets">
                    {categorizedSkills[selectedCategory].skills
                        .filter((skill) =>
                            skill.name.toLowerCase().includes(skillFilter.toLowerCase())
                        )
                        .map((skill, index) => (

                        <Col md={6} sm={12} className="mb-4" key={index}>
                        <div className="skillBox ">
                            <div className="col-4">
                                <img
                                src={skill.image}
                                alt={skill.name}
                                className="skillImage col-12"
                                />
                            </div>
                            <div className="col-8">
                                <div className="skillName mt-2 fw-bold">{skill.name}</div>
                                <ProgressBar
                                now={skill.rate}
                                // label={`${skill.rate}%`}
                                striped
                                animated
                                className="progressBar  mt-3"
                                />
                            </div>
                        </div>
                        </Col>
                    ))}
                    </Row>

            </div>
          </>
        ) : (
          <div className="text-white mt-3">
            Please select a category to view skills.
          </div>
        )}
      </Col>
    </Row>
  </Container>
</div>
);

}