import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import Logo from "../images/logo-prelogin.png";
import "./LandingPage.css";


export default function LandingPage(){

    return(
        <Navbar className="navbar" expand="lg" sticky="top">
              <Navbar.Brand className="navbar-brand">Maths Camp</Navbar.Brand>
            <Nav>
                <img className="logo" src={Logo} alt="Logo of a calculator"></img>   
            </Nav>
          
            <Nav className="col-right">
                <Button className="home-btn">Home</Button>
                <Button className="logout-btn">Log out</Button>
            </Nav>       
        </Navbar>
    );
}