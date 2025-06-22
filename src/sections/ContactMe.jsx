import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button, Container, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap';
import Lottie from 'lottie-react';
import contact from '../lottie/contact.json';
import Swal from 'sweetalert2';

export const ContactUs = () => {
  const form = useRef();
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false); // ⬅️ Tambahkan state loading

  const serviceId = "service_hzzmmlu";
  const templateId = "contact_form";
  const publicKey = "uLdq0bm78OWZqxnrd";

const sendEmail = (e) => {
  e.preventDefault();
  const contactForm = e.currentTarget;

  if (contactForm.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);
    return;
  }

  setValidated(true);

  // Show SweetAlert loading
  Swal.fire({
    title: 'Reaching Rafael!',
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  emailjs
    .sendForm(serviceId, templateId, form.current, {
      publicKey: publicKey,
    })
    .then(() => {
      Swal.close(); // Close the loading Swal

      Swal.fire({
        icon: 'success',
        title: 'Thank you for contacting!',
        text: "I'll check my email and reply you :D",
      }).then((result) => {
        if (result.isConfirmed) {
          form.current.reset();
          setValidated(false);
        }
      });
    })
    .catch((error) => {
      Swal.close();
      Swal.fire('Oops!', 'Something went wrong..', 'error');
      console.error('FAILED...', error);
    });
};


  return (
    <>
      <Container className='mb-5'>
        <Row>
          <div className="pt-5">
            <h1 className="primary display-3 fw-bold">Connect Me</h1>
            <hr />
            <div className="d-lg-flex justify-content-center align-items-center">
              <div className="col-lg-5 col-sm-12">
                <Lottie animationData={contact} className='col-12' />
              </div>
              <div className="col-lg-7 col-sm-12">
                <p className="text-white lead mb-4">
                  <span className='primary'>Feel free to connect me!</span>
                  <br />
                  i'll be waiting for our coorperation.
                </p>
                <Form noValidate validated={validated} ref={form} onSubmit={sendEmail}>
                  <FloatingLabel controlId="floatingInput" label="Your name" className="mb-3">
                    <Form.Control
                      name="user_name"
                      type="text"
                      placeholder="Your name"
                      required
                    />
                    <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel controlId="email" label="Email address" className="mb-3">
                    <Form.Control
                      name="user_email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                    <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
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
                  </FloatingLabel>

                  <div className="d-flex justify-content-center align-items-center mt-5">
                    <Button
                      type='submit'
                      className='get-started-btn col-lg-5 col-sm-12'
                      disabled={loading} // ⬅️ Nonaktifkan saat loading
                    >
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                          {" Sending..."}
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
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
