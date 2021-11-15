import React from "react";
import { animateScroll as scroll } from "react-scroll";
import { useHistory } from "react-router";
import Logo from "../../images/Logo/logo-prelogin.svg";
import { Link } from "react-router-dom";
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
  const ButtonMailto = ({ mailto, label }) => {
    return (
      <Button
        className="contact-link contact-btn"
        to="#"
        onClick={(e) => {
          window.location = mailto;
          e.preventDefault();
        }}
      >
        {label}
      </Button>
    );
  };

  return (
    <div className="footer-c">
      <div className="row-1">
        <ButtonMailto label="Contact us" mailto="mailto:fdtbdt5@gmail.com" />
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
