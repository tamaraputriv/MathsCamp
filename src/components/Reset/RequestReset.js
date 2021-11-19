import { useState } from "react";
import Parse from "parse";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { Tree, Envelope, ChevronRight } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import "./RequestReset.css";

export default function RequestReset() {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const doRequestPasswordReset = async () => {
    try {
      await Parse.User.requestPasswordReset(email);
      Swal.fire({
        title: "Succes!",
        text: `Please check ${email} to proceed with password reset.`,
        icon: "success",
        confirmButtonText: "OK",
      });
      return true;
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `An error occured while sending the recovery email: ${error.message}. Try again!`,
        icon: "error",
        confirmButtonText: "OK",
      });
      return false;
    }
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div>
      <Container className="email-container">
        <div className="text-center">
          <Tree size={30} color="#4D4D4D" />
          <h1 className="reset-h1">Password recovery</h1>
          <p className="reset-p">
            Enter the email connected to your account below and <br />
            click send to recieve a password recovery email
          </p>
        </div>
        <Container className="form-container">
          <Row>
            <Col>
              <Form>
                <Form.Group controlId="formEmail" className="upperform">
                  <Form.Control
                    type="email"
                    placeholder="Enter an email"
                    onChange={updateEmail}
                  />
                </Form.Group>
                <Button
                  className="send-button"
                  variant="primary"
                  onClick={doRequestPasswordReset}
                >
                  Send <Envelope />
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
      <Button
        className="go-back-button"
        variant="primary"
        onClick={handleGoBack}
      >
        Go back <ChevronRight />
      </Button>
    </div>
  );
}
