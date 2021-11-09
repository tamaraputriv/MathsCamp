import { useState } from "react";
import Parse from "parse";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { Tree, Key } from "react-bootstrap-icons";
import "./RequestReset.css";

export default function RequestReset(){
    const [email, setEmail] = useState("");

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const doRequestPasswordReset = async () => {
        // Note that this value come from state variables linked to your text input
        try {
            await Parse.User.requestPasswordReset(email);
            alert(`Success! Please check ${email} to proceed with password reset.`);
            return true;
        } catch(error) {
            // Error can be caused by lack of Internet connection
            alert(`Error! ${error}`);
            return false;
        }
    };

    return (
        <Container className="email-container">
          <div className="text-center">
            <Tree size={30} color="#4D4D4D" />
            <h1>Password recovery</h1>
            <p>Enter your own or a parental email below and click <br/>send to recieve a password recovery email</p>
          </div>
          <Container className="form-container">
            <Row>
              <Col>
                <Form>
                  <Form.Group controlId="formEmail" className="upperform">
                    <Form.Control type="email" placeholder="Enter an email" onChange={updateEmail}/>
                  </Form.Group>
                  <Button className="send-button" variant="primary" onClick={doRequestPasswordReset}>Send <Key size={20} /></Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Container>
    );
}