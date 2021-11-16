import React from "react";
import { useHistory } from "react-router";
import "./Footer.css";
import { Button } from "react-bootstrap";

const Footer = () => {
  const history = useHistory();

  const handleSendEmail = () => {
    history.push("/contact");
  };

  return (
    <div className="footer-c">
      <div className="row-1">
        <Button className="contact-link contact-btn" onClick={handleSendEmail}>
          Contact us
        </Button>
        <Button className="contact-btn">About us</Button>
        <Button className="contact-btn">Join us</Button>
      </div>
      <div className="row-2">
        <div className="rights-c">
          <p className="rights">
            ©2021 All rights reserved. Maths Camp is created by Anne Schjødt and
            Frederikke Drejer in collaboration with IT University of Copenhagen
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
