import React from 'react';
import {Button, Container, Col} from 'react-bootstrap';
import Logo from "../../images/Logo/logo-prelogin.svg";
import "./Navbar_prelogin.css";
import 'bootstrap/dist/css/bootstrap.css';

//const path = window.location.pathname;

/*const Logo = () => {
    if(path = '/'){

    }
};*/

export default function Navbar_prelogin(){
    return(
        <Container fluid className="navbar">
            
                <Col>
                <div className="logo-container">

                   
                        <img className="logo" src={Logo} alt="Logo of a calculator"></img>   
                  </div> 
                </Col>
            
            <Col className="app-name-col">
                <h5 className="navbar-brand">Maths Camp</h5>
            </Col>
        </Container>       
    );
}