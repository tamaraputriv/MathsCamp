import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from './pages/Landingpage';
import RegisterPage from './pages/Registerpage';
import LoginPage from './pages/Loginpage';
import FrontPage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.css';
import "@fontsource/rubik";
import "@fontsource/solway";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component= {LandingPage}/>
          <Route exact path="/register" component= {RegisterPage}/>
          <Route exact path="/login" component= {LoginPage}/>
          <Route exact path="/frontpage" component= {FrontPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
