import React from "react";
import { Button, Container, Col } from "react-bootstrap";
import { DoorOpen, HouseDoor, Gem } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import Parse from "parse";
import Logo from "../../images/Logo/logo-prelogin.svg";
import "./NavbarPracticeMode.css";

export default function NavbarPracticeMode() {
  const [points, setPoints] = useState(0);
  const history = useHistory();

  //Logs out the user and redirects the user to the landingpage
  const handleLogOut = () => {
    Parse.User.logOut();
    history.push("/");
  };

  //Redirects the user to the frontpage
  const handleHome = () => {
    history.push("/frontpage");
  };

  //Fetches the total_points of the current user and saves them in totalPoints state
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
          <img className="logo" src={Logo} alt="Logo of a calculator" onClick={handleHome}></img>
        </div>
      </Col>
      <Col className="app-name-col">
        <h5 className="navbar-brand"><Gem size={15} color="#F4C46B" /> {points}</h5>
      </Col>
      <Col lg={1.5}>
        <div className="btn-toolbar">
          <Button 
            className="btn-primary lg home-btn" onClick={handleHome}>Home <HouseDoor size={15} />
          </Button>
          <Button 
            className="btn-primary lg logout-btn" onClick={handleLogOut}>Log out <DoorOpen size={15} />
          </Button>
        </div>
      </Col>
    </Container>
  );
}
