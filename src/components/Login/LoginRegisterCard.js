import React from "react";
import { Tree, CardList, Key } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import { Container, Button, ButtonToolbar } from "react-bootstrap";
import "./LoginRegisterCard.css";
import "bootstrap/dist/css/bootstrap.css";

export default function LoginRegisterCard() {
  const history = useHistory();

  //Redirects the user to the login-page
  const handleLogin = () => {
    history.push("#login");
  };

  //Redirects the user to the register-page
  const handleRegister = () => {
    history.push("#register");
  };

  return (
    <Container className="login-container">
      <div className="text-center">
        <Tree size={30} color="#4D4D4D" />
        <h1 className="login-register-h1">
          Welcome to <br />
          Maths Camp
        </h1>
        <p className="login-register-p">Where exercising your brain is fun.</p>
      </div>
      <ButtonToolbar className="btn-toolbar login-register-toolbar">
        <Button onClick={handleRegister} className="register-btn landing-btn">
          Register
          <br />
          <CardList size={70} />
        </Button>
        <Button onClick={handleLogin} className="login-btn landing-btn">
          Log in
          <br />
          <Key size={70} />
        </Button>
      </ButtonToolbar>
    </Container>
  );
}
