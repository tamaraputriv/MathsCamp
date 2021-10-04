import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from './components/Navbar/LandingPage';
import "@fontsource/rubik";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component= {LandingPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
