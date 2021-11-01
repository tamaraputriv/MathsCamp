import React from "react";
import { Button, Container, Col } from "react-bootstrap";
import Logo from "../../images/Logo/logo-prelogin.svg";
import { DoorOpen, HouseDoor, Gem } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import Parse from "parse";
import { useEffect, useState } from "react";
import "./NavbarPracticeMode.css";
import "bootstrap/dist/css/bootstrap.css";

export default function Navbar_practice_mode() {
  const [points, setPoints] = useState(0);

  const history = useHistory();

    const handleLogOut = () => {
      Parse.User.logOut();
      history.push("/");
    };

    const handleHome = () => {
      history.push("/frontpage");
    };

    const fetchPoints = () => {
      const user = Parse.User.current();
      if(user){
        const totalPoints = user.get("total_points");
        setPoints(totalPoints);
      }
    }

    useEffect(() => {
      fetchPoints();
    }, []);

  return (
    <Container fluid className="navbar">
      <Col>
        <div className="logo-container">
          <img className="logo" src={Logo} alt="Logo of a calculator"></img>
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
          <Button className="btn-primary lg logout-btn" onClick={handleLogOut}>
            Log out <DoorOpen size={15} />
          </Button>
        </div>
      </Col>
    </Container>
  );
}
