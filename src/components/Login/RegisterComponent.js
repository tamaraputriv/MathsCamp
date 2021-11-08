import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { CardList, Tree } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import React, { useState } from "react";
import Parse from "parse";
import Swal from "sweetalert2";
import "./RegisterComponent.css";

export default function RegisterComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  //Updates the state of the username when the input changes
  const updateUsername = (e) => {
    setUsername(e.target.value);
  }

  //Updates the state of the password when the input changes
  const updatePassword = (e) => {
    setPassword(e.target.value);
  }

  //Updates the state of the parental email when the input changes
  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  /*Signs the user in if there is a password and a username. signUp() checks 
  if the username and email are unique and stores the password securely */
  const handleReg = async (e) => {
    e.preventDefault();
    if (password === "" || username === "") {
      Swal.fire({
        title: "Oops!",
        text: "You need to fill out a username and password",
        icon: "error",
        confirmButtonText: "OK"
      })
      return;
    }else{
        console.log("I am setting the users information");
        const user = new Parse.User();
        user.set("username", username);
        user.set("password", password);
        user.set("email", email);
        user.set("total_points", 800);
        var date = new Date().toLocaleDateString();
        user.add("active_days", date);
        user.add("owned_mascot_ids", "arB9fEWmFp");
        try {
          await user.signUp();
          history.push("/frontpage");
        } catch (error) {
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong while registering you as a user. Please try again!",
            icon: "error",
            confirmButtonText: "OK"
          })
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
            <Form onSubmit={handleReg}>
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
                <p className="information-text">This email will be used for username and password recovery</p>
              </Form.Group>
              <Button className="registerbtn" variant="primary" type="submit">Register <CardList/></Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
