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

    const scrollToElement = (element) => {
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const searchText = inputRef.current.value.trim().toLowerCase();
        const elements = document.querySelectorAll("*");
        elements.forEach(element => {
            if (element.textContent.toLowerCase().includes(searchText)) {
                scrollToElement(element);
            }
        });
        inputRef.current.value = ''; // Clear input field after search
    };

    return(
        <>
            <header className='fixed-top'>
                <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand onClick={() => scrollToSection('home')}>
                            <img src={xernom} alt="" className='navbarImg'/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link onClick={() => scrollToSection('home')}>Home</Nav.Link>
                                <Nav.Link onClick={() => scrollToSection('intro')}>Introduction</Nav.Link>
                                <Nav.Link onClick={() => scrollToSection('about')}>About</Nav.Link>
                                <Nav.Link onClick={() => scrollToSection('skills')}>Skills</Nav.Link>
                                <Nav.Link onClick={() => scrollToSection('experiences')}>Experiences</Nav.Link>
                                <Nav.Link onClick={() => scrollToSection('projects')}>Projects</Nav.Link>
                                <Nav.Link onClick={() => scrollToSection('extras')}>Extras</Nav.Link>
                                <Nav.Link onClick={() => scrollToSection('connect')}>Connect Me</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                                                        <Form onSubmit={handleSearch}>
                                <div className="d-flex justify-content-center align-items-center searchForm">
                                    <FloatingLabel controlId="floatingInput" label="Search.." className="text-muted ">
                                        <Form.Control ref={inputRef} type="text" placeholder="Search" style={{ width: "135%", position: "relative", zIndex: "2" }} />
                                    </FloatingLabel>
                                    <Button type='submit' className='get-started-btn searchBtn' style={{ position: "relative", zIndex: "4" }}>
                                        <I.Search className='lead'/>
                                    </Button>
                                </div>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}