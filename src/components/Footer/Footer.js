import React from "react";
import { useHistory } from "react-router";
import "./Footer.css";
import { Button } from "react-bootstrap";

const Footer = () => {
  const history = useHistory();

  return (
    <div className="footer-c">
      <p className="rights">
        ©2021 All rights reserved. Maths Camp is created by Anne Schjødt and
        Frederikke Drejer in collaboration with IT University of Copenhagen
      </p>
    </div>
  );
};

export default Footer;
