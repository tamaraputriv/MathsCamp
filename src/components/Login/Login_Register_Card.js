import {Tree} from 'react-bootstrap-icons';
import {Container, Form, Col, Row, Button} from 'react-bootstrap';
import React from "react";

export default function Login_Register_Card(){

    return(
        <Container className="login-container">     
            <div className="text-center">
                <Tree size={30}/>
                <h1>Welcome to <br/>Maths Camp!</h1>
                <p>Where exercising your brain is fun!</p>
            </div>       
        </Container>

        
    );

}