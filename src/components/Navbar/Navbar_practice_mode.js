import React from 'react';
import {Button, Container, Col} from 'react-bootstrap';
import Logo from "../../images/logo-prelogin.svg";
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.css';

//const path = window.location.pathname;

/*const Logo = () => {
    if(path = '/'){

    }
};*/

export default function Navbar_practice_mode(){
    return(
        <Container fluid className="navbar">
            <Col>
                <img className="logo" src={Logo} alt="Logo of a calculator"></img>   
            </Col>
            <Col className="app-name-col">
                <h5 className="navbar-brand">Maths Camp</h5>
            </Col>
            <Col lg={1.5}>
                <div className="btn-toolbar">
                    <Button className="p-2 btn-primary lg home-btn">Home</Button>
                    <Button className="p-2 btn-primary lg logout-btn">Log out</Button>
                </div>
            </Col>
        </Container>       
    );
}
