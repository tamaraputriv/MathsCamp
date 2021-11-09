import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Logo from "../../images/Logo/logo-prelogin.svg";
import "./NavbarPrelogin.css";

export default function NavbarPrelogin() {
  return (
    <Container fluid className="navbar-prelogin">
      <Row className="row-prelogin">
        <Col>
          <div className="logo-container-prelogin">
            <img className="logo-prelogin" src={Logo} alt="Logo of a calculator"></img>
          </div>
        </Col>
        <Col className="app-name-col-prelogin">
          <h5 className="navbar-brand-prelogin">Maths Camp</h5>
        </Col>
      </Row>
    </Container>
  );
}
