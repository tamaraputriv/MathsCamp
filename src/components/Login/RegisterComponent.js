import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { CardList, Tree } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import "./RegisterComponent.css";
import React, { useState } from "react";
import Parse from "parse";

export default function RegisterComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const updateUsername = (e) => {
    setUsername(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  //Signin checks if the username and email are unique. It also checks stores the password securely. 
  const handleRegUser = async (e) => {
    e.preventDefault();
    if (password === "" || username === "") {
      alert("You need to fill out a username and password");
      return;
    }else{
        const student = new Parse.User();
        student.set("username", username);
        student.set("password", password);
        //student.set("email", email);
        //student.set("reward_badge_ids", []);
        //student.set("owned_mascot_ids", []);
        //student.set("parental_email", email);
        //var date = new Date().toLocaleDateString();
        //student.add("active_days", date);
        //student.add("owned_mascot_ids", "arB9fEWmFp");
        try {
          await student.signUp();
          console.log("New user created with objectId: " + student.id);
          history.push("/frontpage");
        } catch (error) {
          alert("Something went wrong while registering you as a user. Please try again!");
          console.log(error);
        }
      }
  }

  return (
    <Container className="login-container">
      <div className="text-center">
        <Tree size={30} color="#4D4D4D" />
        <h1>Welcome!</h1>
        <p>Create a user and play today</p>
      </div>
      <Container className="form-container">
        <Row>
          <Col>
            <Form onSubmit={handleRegUser}>
              <Form.Group controlId="formUserName" className="upperform">
                <Form.Label>Username</Form.Label>
                <Form.Control type="name" placeholder="Enter a username" onChange={updateUsername}/>
              </Form.Group>
              <Form.Group controlId="formPassword" className="upperform">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter a password" onChange={updatePassword}/>
              </Form.Group>
              <Form.Group controlId="formEmail" className="upperform">
                <Form.Label>Parental email (optional)</Form.Label>
                <Form.Control type="email" placeholder="Enter an email" onChange={updateEmail}/>
                <p className="information-text">
                  This email will be used for username and password recovery
                </p>
              </Form.Group>
              <Button className="registerbtn" variant="primary" type="submit">Register <CardList/></Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
