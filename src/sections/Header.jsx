import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import xernom from '../img/xernomm.png'
import * as I from 'react-bootstrap-icons'
import '../styles/Images.css'
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useRef } from 'react';

export const Header = () => {

    const inputRef = useRef(null);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <>
            <header className='fixed-top'>
                <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                    <Container >
                        <Navbar.Brand onClick={() => scrollToSection('home')}>
                            <img src={xernom} alt="" className='navbarImg'/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse  id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link onClick={() => scrollToSection('home')}>Home</Nav.Link>
                                <Nav.Link onClick={() => scrollToSection('educations')}>Education</Nav.Link>
                                <Nav.Link onClick={() => scrollToSection('experiences')}>Experiences</Nav.Link>
                                <Nav.Link onClick={() => scrollToSection('skills')}>Skills</Nav.Link>
                                <Nav.Link onClick={() => scrollToSection('projects')}>Projects</Nav.Link>
                                <Nav.Link onClick={() => scrollToSection('certifications')}>Certificates</Nav.Link>
                                <Nav.Link onClick={() => scrollToSection('about')}>Rafael-AI</Nav.Link>
                                <Nav.Link onClick={() => scrollToSection('connect')}>Connect Me</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}