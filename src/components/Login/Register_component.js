import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { CardList, Tree } from 'react-bootstrap-icons';
import "./Register_component.css";
import React from "react";

export default function Registercomponent(){

    return(
        <Container className="login-container">     
            <div className="text-center">
                <Tree size={30} color="#4D4D4D"/>
                <h1>Welcome!</h1>
                <p>Create a user and play today</p>
            </div>
            <Container className="form-container">
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="formUserName" className="upperform">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="name" placeholder="Enter a username"/>
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="upperform">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter a password"/>
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="upperform">
                                <Form.Label>Parental email (optional)</Form.Label>
                                <Form.Control type="email" placeholder="Enter an email"/>
                                <p className="information-text">This email will be used for username and password recovery</p>
                            </Form.Group>
                            <Button className="registerbtn" variant="primary" type="submit">
                                Register <CardList/>
                            </Button> 
                        </Form>
                    </Col> 
                </Row>    
            </Container>
        </Container>      
    );
}