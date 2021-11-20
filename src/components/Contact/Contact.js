import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Tree } from "react-bootstrap-icons";
import "./Contact.css";
import { hotjar } from "react-hotjar";
export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_sfq75k1",
        "template_6009aok",
        form.current,
        "user_7OclaIRRNbXghSbtXYdJH"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  useEffect(() => {
    hotjar.initialize(2701912);
  }, []);

  return (
    <Container fluid className="contact-container">
      <Row className="justify-content-md-center email-row">
        <Col sx md="8" lg="5" className="email-col">
          <div className="text-center email-text-div">
            <Tree size={30} color="#4D4D4D" />
            <h1 className="welcome-h1">Send us an email</h1>
            <p className="welcome-p">We would love to hear from you</p>
          </div>
          <Form ref={form} action="#" onSubmit={sendEmail}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="user_name"
                placeholder="Your name"
                size="lg"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                name="user_email"
                placeholder="your@email.com"
                size="lg"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                name="message"
                placeholder="Send us a message here :)"
                style={{ height: "150px" }}
              />
            </Form.Group>
            <div className="btn-div">
              <Button
                variant="primary"
                type="submit"
                className="sub-btn email-btn"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
