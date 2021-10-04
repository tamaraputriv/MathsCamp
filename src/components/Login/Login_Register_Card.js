import {Tree} from 'react-bootstrap-icons';
import { CardList } from 'react-bootstrap-icons';
import { Key } from 'react-bootstrap-icons';
import { useHistory } from 'react-router';
import {Container, Button, ButtonToolbar} from 'react-bootstrap';
import React from "react";
import "./Login_Register_Card.css";

export default function Login_Register_Card(){

    const history = useHistory();

    const handleLogin = () =>{
        history.push("/login");
    }

    const handleRegister = () =>{
        history.push("/register");
    }

    return(
        <Container className="login-container">     
            <div className="text-center">
                <Tree size={30}/>
                <h1>Welcome to <br/>Maths Camp!</h1>
                <p>Where exercising your brain is fun!</p>
            </div>  
            <ButtonToolbar className="btn-toolbar">
                <Button onClick={handleRegister} className="btn-primary lg register-btn">Register<br/><CardList size={40}/></Button>
                <Button onClick={handleLogin} className="btn-primary lg login-btn">Log in<br/><Key size={40}/></Button> 
            </ButtonToolbar>  
        </Container>


        
    );

}