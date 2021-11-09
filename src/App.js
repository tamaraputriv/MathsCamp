import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import FrontPage from "./pages/FrontPage";
import PracticePage from "./pages/PracticePage";
import EditMascotPage from "./pages/EditMascotPage";
import RewardPage from "./pages/RewardPage";
import Request from "./pages/Reset";
import "bootstrap/dist/css/bootstrap.css";
import "@fontsource/rubik";
import "@fontsource/solway";
import Break from "./pages/BreakPage";

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
          <Route exaxt path="/reward" component={RewardPage} />
          <Route exaxt path="/requestReset" component={Request} />
          <Route exaxt path="/break" component={Break} />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
