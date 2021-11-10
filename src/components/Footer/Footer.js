import React from "react";
import { animateScroll as scroll } from "react-scroll";
import { useHistory } from "react-router";
import Logo from "../../images/Logo/logo-prelogin.svg";
import "./Footer.css";
import {
  Container,
  Row,
  Form,
  Col,
  Button,
  Card,
  Image,
} from "react-bootstrap";

const Footer = () => {
  const history = useHistory();
  //Redirects the user to the frontpage
  const handleHome = () => {
    history.push("/frontpage");
  };
  const toggleHome = () => {
    scroll.scrollToTop();
  };
  return (
    <div className="footer-c">
      <div className="logo-c">
        <img
          className="footer-logo"
          src={Logo}
          alt="Logo of a calculator"
          onClick={handleHome}
        ></img>
        <h6 className="logo-name">Maths Camp</h6>
      </div>
      <div className="rights-c">
        <p className="rights">
          ©2021 All rights reserved. Maths Camp is created by Anne Schjødt and
          Frederikke Drejer in collaboration with IT University of Copenhagen.
        </p>
      </div>
      <div className="contact-c">
        <h6 className="logo-name">Contact us</h6>
        <a href="mailto:someone@example.com">
          <p className="email-link">example@itu.dk</p>
        </a>
      </div>
    </div>
  );
};

export default Footer;
