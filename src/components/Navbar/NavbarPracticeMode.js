import React from "react";
import { Button, Container, Col } from "react-bootstrap";
import { DoorOpen, HouseDoor, Gem } from "react-bootstrap-icons";
import { BsMailbox } from "react-icons/bs";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import Parse from "parse";
import Logo from "../../images/Logo/logo-prelogin.svg";
import "./NavbarPracticeMode.css";

export default function NavbarPracticeMode() {
  const [points, setPoints] = useState(0);
  const history = useHistory();

  const resetTimer = async () => {
    const student = Parse.User.current();
    if (student) {
      try {
        student.set("practice_timer_count", 1200);
        await student.save();
      } catch {
        console.log("Timer did not reset");
      }
    }
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    await resetTimer();
    Parse.User.logOut();
    history.push("/");
  };

  const handleHome = (e) => {
    e.preventDefault();
    history.push("/frontpage");
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    history.push("/contact");
  };

  const fetchPoints = () => {
    const user = Parse.User.current();
    if (user) {
      const totalPoints = user.get("total_points");
      setPoints(totalPoints);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  return (
    <Container fluid className="navbar">
      <Col>
        <div className="logo-container">
          <img
            className="logo"
            src={Logo}
            alt="Logo of a calculator"
            onClick={handleHome}
          ></img>
        </div>
      </Col>
      <Col className="app-name-col">
        <h5 className="navbar-brand">
          <Gem size={15} color="#F4C46B" /> {points}
        </h5>
      </Col>
      <Col lg={1.5}>
        <div className="btn-toolbar">
          <Button className="btn-primary lg home-btn" onClick={handleHome}>
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
    </Container>
  );
}
