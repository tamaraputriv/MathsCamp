import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Logo from "../../images/Logo/logo-prelogin.svg";
import "./NavbarPrelogin.css";
import { useHistory } from "react-router";

export default function NavbarPrelogin() {
  const history = useHistory();

  //Redirects the user to the frontpage
  const handleBack = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <Container fluid className="navbar-prelogin" onClick={handleBack}>
      <Row className="row-prelogin">
        <Col>
          <div className="logo-container-prelogin">
            <img
              className="logo-prelogin"
              src={Logo}
              alt="Logo of a calculator"
            ></img>
          </div>
        </Col>
        <Col className="app-name-col-prelogin">
          <h5 className="navbar-brand-prelogin">Maths Camp</h5>
        </Col>
      </Row>
    </Container>
  );
}
