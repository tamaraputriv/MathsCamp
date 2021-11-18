import React from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { DoorOpen, HouseDoor } from "react-bootstrap-icons";
import { BsMailbox } from "react-icons/bs";
import Logo from "../../images/Logo/logo-postlogin.svg";
import Parse from "parse";
import "./NavbarPostlogin.css";

export default function NavbarPostlogin() {
  const history = useHistory();

  const resetTimer = async () => {
    const student = Parse.User.current();
    if (student) {
      try {
        student.set("practice_timer_count", 2100);
        await student.save();
      } catch {
        console.log("timer did not reset");
      }
    }
  };

  //Logs out the user and redirects the user to the landingpage
  const handleLogOut = () => {
    Parse.User.logOut();
    resetTimer();
    history.push("#");
  };

  //Redirects the user to the frontpage
  const handleHome = () => {
    history.push("#frontpage");
  };

  const handleSendEmail = () => {
    history.push("#contact");
  };

  return (
    <Container fluid className="navbar-postlogin">
      <Row>
        <Col>
          <img
            className="logo-postlogin"
            src={Logo}
            alt="Logo of a calculator"
            onClick={handleHome}
          ></img>
        </Col>
        <Col className="app-name-col-postlogin">
          <h6 className="navbar-brand-postlogin">Maths Camp</h6>
        </Col>
        <Col>
          <div className="btn-toolbar postlogin-toolbar">
            <Button
              className="btn-primary lg home-btn-postlogin"
              onClick={handleHome}
            >
              Home <HouseDoor size={15} />
            </Button>
            <Button
              className="contact-link contact-btn"
              onClick={handleSendEmail}
            >
              Contact <BsMailbox size={15} />
            </Button>
            <Button
              className="btn-primary lg logout-btn-postlogin"
              onClick={handleLogOut}
            >
              Log out <DoorOpen size={15} />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
