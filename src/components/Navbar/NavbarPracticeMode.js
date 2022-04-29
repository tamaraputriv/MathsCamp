import React from "react";
import { Button, Container, Col } from "react-bootstrap";
import { DoorOpen, HouseDoor, Gem, Trophy } from "react-bootstrap-icons";
import { BsMailbox, BsCoin } from "react-icons/bs";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { hotjar } from "react-hotjar";
import Parse from "parse";
import Logo from "../../images/Logo/logo-prelogin.svg";
import "./NavbarPracticeMode.css";

export default function NavbarPracticeMode() {
  const [points, setPoints] = useState(0);
  const [coins, setCoins] = useState(0);
  const history = useHistory();

  const handleLogOut = async (e) => {
    e.preventDefault();
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

  const handleRanking = (e) => {
    e.preventDefault();
    hotjar.event("Ranking clicked");
    history.push("/ranking");
  };

  const fetchPoints = () => {
    const user = Parse.User.current();
    if (user) {
      const totalPoints = user.get("total_points");
      const totalCoins = user.get("coins");
      setPoints(totalPoints);
      setCoins(totalCoins);
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
      <Col lg={1.5}>
        <div className="btn-toolbar">
          <Button
            className="btn-primary lg ranking-btn-postlogin"
            onClick={handleRanking}
          >
            Ranking <Trophy size={15} />
          </Button>
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
