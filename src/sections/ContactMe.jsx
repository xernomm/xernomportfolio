import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import Lottie from 'lottie-react';
import contact from '../lottie/contact.json'
import Swal from 'sweetalert2';

export const ContactUs = () => {
  const form = useRef();
  const [validated, setValidated] = useState(false);

  const serviceId =  "service_hzzmmlu";
  const templateId = "contact_form";
  const publicKey = "uLdq0bm78OWZqxnrd";

  const sendEmail = (e) => {
    e.preventDefault();

    console.log("Service ID: ", serviceId);
    console.log("Template ID: ", templateId);
    console.log("public ID: ", publicKey);

    const contactForm = e.currentTarget;
    
    if (contactForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    if(contactForm.checkValidity() === true) {
      emailjs
      .sendForm( serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Thank you for contacting!",
            text:"I'll check my email and reply you :D",
          }).then((result) => {
            if (result.isConfirmed) {
              form.current.reset(); // Reset the form fields
              setValidated(false); 
            }
          });
        },
        (error) => {
          Swal.fire("Oops!", "Something went wrong..", "error");
          console.log('FAILED...', error);
        },
      );
    }
  };

  return (
    <>
    <Container>
      <Row>
        <div className="pt-5">
        <h1 className="primary display-3 fw-bold">
          Connect Me
         </h1>
          <hr />
        <div className=" d-lg-flex justify-content-center align-items-center">
          <div className="col-lg-5 col-sm-12">
            <Lottie animationData={contact} className='col-12'/>
          </div>
          <div className="col-lg-7 col-sm-12">
            <p className="text-white lead mb-4">
              Feel free to connect me!
              
              <br />

              i'll be waiting for our coorperation.
            </p>
            <Form noValidate validated={validated} className='' ref={form} onSubmit={sendEmail}>
                <FloatingLabel
                controlId="floatingInput"
                label="Your name"
                className="mb-3"
              >
                <Form.Control 
                name="user_name" 
                type="text" 
                placeholder="Your name" 
                controlId="userName" 
                required />
                <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </FloatingLabel>


              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control 
                name="user_email" 
                type="email" 
                placeholder="name@example.com" 
                controlId="email" 
                required 
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />
                <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </FloatingLabel>


              <FloatingLabel controlId="message" label="Message">
                <Form.Control
                  as="textarea"
                  placeholder="Message"
                  style={{ height: '150px' }}
                  name="message"
                  required
                />
                <Form.Control.Feedback type="invalid">Don't you want to say something?</Form.Control.Feedback>
                <Form.Control.Feedback>Allright!</Form.Control.Feedback>
              </FloatingLabel>

              <div className="d-flex justify-content-center align-items-center mt-5">
              <Button type='submit' className='get-started-btn col-lg-5 col-sm-12'>Submit</Button>
              </div>
            </Form>
          </div>
        </div>
        </div>
      </Row>
    </Container>
    </>
  );
};