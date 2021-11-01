import { Key, Tree } from "react-bootstrap-icons";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import "./LoginComponent.css";
import React, { useState } from "react";
import Parse from "parse";

export default function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  
  const updateUsername = (e) => {
    setUsername(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleLogUser = async (e) => {
    e.preventDefault();
    if (password === "" || username === "") {
      alert("You need to fill out a username and password");
      return;
    }
    try{
      const user = await Parse.User.logIn(username, password);
      if(user){
        var active = await user.get("active_days");
        var date = new Date().toLocaleDateString();
        if(!active.find(element => element === date)){
          console.log(!active.find((element) => element === date));
          user.add("active_days", date);
          user.save();
        }
        console.log("Hentede brugeren med id: " + user.id);
        history.push("/frontpage");
      }
    }catch(error){
      alert("The username or password is incorrect!");
    }  
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
            <Form onSubmit={handleLogUser}>
              <Form.Group controlId="formUserName" className="upperform">
                <Form.Label>Username</Form.Label>
                <Form.Control type="name" placeholder="Enter your username" onChange={updateUsername}/>
              </Form.Group>
              
              <Form.Group controlId="formPassword" className="upperform">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" onChange={updatePassword}/>
              </Form.Group>
              
              <Button className="login-button" variant="primary" type="submit">Log in <Key size={20} /></Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
