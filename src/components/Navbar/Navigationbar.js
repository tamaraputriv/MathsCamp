import React from 'react';
import {Button, Container, Col} from 'react-bootstrap';
import Logo from "../../images/logo-prelogin.png";
import "./Navigationbar.css";
import 'bootstrap/dist/css/bootstrap.css';


export default function LandingPage(){

    return(
        <Container className="navbar">
            <Col>
                <img className="logo" src={Logo} alt="Logo of a calculator"></img>   
            </Col>
            <Col className="app-name-container">
                <h5 className="navbar-brand">Maths Camp</h5>
            </Col>
            <Col lg={2} className="btn-container">
                <div className="btn-toolbar">
                    <Button className="p-2 btn-primary lg home-btn">Home</Button>
                    <Button className="p-2 btn-primary lg logout-btn">Log out</Button>
                </div>
            </Col>
        </Container>       
    );
}