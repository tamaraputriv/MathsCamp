import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import FrontPage from "./pages/FrontPage";
import PracticePage from "./pages/PracticePage";
import EditMascotPage from "./pages/EditMascotPage";
import "bootstrap/dist/css/bootstrap.css";
import "@fontsource/rubik";
import "@fontsource/solway";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/frontpage" component={FrontPage} />
          <Route exact path="/practice" component={PracticePage} />
          <Route exact path="/mascot" component={EditMascotPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
