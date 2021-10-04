import React from 'react';
import {Button, Container, Col} from 'react-bootstrap';
import Logo from "../../images/Logo/logo-postlogin.svg";
import "./Navbar_postlogin.css";
import 'bootstrap/dist/css/bootstrap.css';

export default function Navbar_postlogin(){
    return(
        <Container fluid className="navbar">
            <Col>
                <img className="logo" src={Logo} alt="Logo of a calculator"></img>   
            </Col>
            <Col className="app-name-col">
                <h6 className="navbar-brand">Maths Camp</h6>
            </Col>
            <Col lg={1.5}>
                <div className="btn-toolbar">
                    <Button className="btn-primary lg home-btn">Home</Button>
                    <Button className="btn-primary lg logout-btn">Log out</Button>
                </div>
            </Col>
        </Container>       
    );
}