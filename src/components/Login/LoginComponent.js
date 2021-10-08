import { Key, Tree } from "react-bootstrap-icons";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import "./LoginComponent.css";
import React from "react";

export default function LoginComponent() {
  const history = useHistory();

  //TODO authenticate userens brugernavn og password
  const handleLog = () => {
    history.push("/frontpage");
  };

  return (
    <Container className="login-container">
      <div className="text-center">
        <Tree size={30} color="#4D4D4D" />
        <h1>Welcome back!</h1>
        <p>Log in to play</p>
      </div>
      <Container className="form-container">
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="formUserName" className="upperform">
                <Form.Label>Username</Form.Label>
                <Form.Control type="name" placeholder="Enter your username" />
              </Form.Group>
              <Form.Group controlId="formPassword" className="upperform">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Group>
              <Button
                onClick={handleLog}
                className="loginbtn"
                variant="primary"
                type="submit"
              >
                Log in <Key size={20} />
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
