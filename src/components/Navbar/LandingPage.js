import React from 'react';
import {Navbar, Nav, Button, Container} from 'react-bootstrap';
import Logo from "../../images/logo-prelogin.png";
import "./LandingPage.css";


export default function LandingPage(){

    return(
        <Navbar className="navbar" expand="lg" sticky="top">
            
            <Container>
                <Navbar.Brand className="navbar-brand">Maths Camp</Navbar.Brand>
            </Container>

            <Container>
                <Nav>
                    <img className="logo" src={Logo} alt="Logo of a calculator"></img>   
                </Nav>
            </Container>

            <Container className="btn-container">
                <Nav>
                    <Button className="home-btn">Home</Button>
                    <Button className="logout-btn">Log out</Button>
                </Nav>
            </Container>       
        </Navbar>
    );
}