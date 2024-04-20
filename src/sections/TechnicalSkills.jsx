import { Col, Container, ProgressBar, Row } from "react-bootstrap"

import reactLogo from '../img/reactlogo.png';
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
import photoshopLogo from '../img/adobe-photoshop-logo-2021.svg';
import adobeMixLogo from '../img/mix.png';
import kinemasterLogo from '../img/kinemaster.png';
import capcutLogo from '../img/capcut.png';
import axureLogo from '../img/axure-2.svg';
import canvaLogo from '../img/canva.svg';
import nextjs from '../img/nextjs-icon-svgrepo-com.svg'
import tailwind from '../img/tailwind-svgrepo-com.svg'
import php from '../img/php-logo-svgrepo-com.svg'

export const TechnicalSkills = () => {

    const skillSets = [
        { image: reactLogo, name: 'ReactJs', rate:85 },
        { image: nodeLogo, name: 'NodeJs' , rate:55},
        { image: nextjs, name: 'NextJs' , rate:55},
        { image: springBootLogo, name: 'Spring Boot', rate:85 },
        { image: javaLogo, name: 'Java', rate:80 },
        { image: php, name: 'PHP', rate:55 },
        { image: sqlLogo, name: 'SQL', rate:75 },
        { image: githubLogo, name: 'GitHub', rate:65 },
        { image: htmlLogo, name: 'HTML', rate:95 },
        { image: cssLogo, name: 'CSS', rate:92 },
        { image: tailwind, name: 'Tailwind CSS', rate:60 },
        { image: jsLogo, name: 'JavaScript', rate:83 },
        { image: jqueryLogo, name: 'jQuery', rate:65 },
        { image: bootstrapLogo, name: 'Bootstrap', rate:97 },
        { image: dbtLogo, name: 'DBT Pipelines', rate:55 },
        { image: appsheetLogo, name: 'AppSheet' , rate:55},
        { image: powerbiLogo, name: 'Power BI', rate:65 },
        { image: liferayLogo, name: 'Liferay', rate:75 },
        { image: photoshopLogo, name: 'Photoshop', rate:95 },
        { image: adobeMixLogo, name: 'Photoshop Mix', rate:95 },
        { image: kinemasterLogo, name: 'Kinemaster', rate:95 },
        { image: capcutLogo, name: 'CapCut' , rate:95},
        { image: axureLogo, name: 'Axure', rate:85 },
        { image: canvaLogo, name: 'Canva', rate:85 },
      ];

    return (
        <>
        <Container>
            <Row>
                <div>
                    <h1 className="display-3 primary fw-bold ">
                        Skillsets
                    </h1>
                    <hr />
                    <div className="d-lg-flex col-lg-12 justify-content-center mt-5">
                    <div className="skillsets">
                        <div className="px-2">
                            <Row xs={1} lg={3} className="g-3"> {/* Use Row component to manage layout */}
                            {skillSets.map((skill, index) => (
                                <Col key={index}>
                                <div className="skillBox mb-3">
                                    <div className="d-flex align-items-center justify-content-center">
                                    <div className="me-3 col-2">
                                        <img src={skill.image} alt={skill.name} className="skillImage" />
                                    </div>
                                    <div className="col-9">
                                        <p className="">{skill.name}</p>
                                        <ProgressBar now={skill.rate} className=" progressBar" />
                                        <div className="d-flex justify-content-end">
                                            <p className="small mt-2">
                                                {skill.rate}/100
                                            </p>
                                        </div>
                                    </div>
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
        </>
);
}