import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Parse from "parse";

Parse.serverURL = "https://parseapi.back4app.com/";
Parse.initialize(
  //MathsCampTestDB
  "Wda0xrb40jLpRilDPzYRTmlFdKe86LU5enneioEt",
  "YS3hyYFf45BkxDeAuYr2L1MXqeN6SYrd5ReerRtY"
  //MathsCamp
  //"Tzl6Z6gWvz93cfVCmGQWFwwRKRpzBJFV0xsPMqU8",
  //"70uH31rDkRZhbtc0cztHblH7As16Vke0G2sBUFsN"
  //Initial DB
  //"V9n8X7uIrcCMcJre0nqCFfnyaka6MwkvrN5vnBcv",
  //"iTt0twJCFnn5sNxOXzNb7Ek9YC6mEKRQ98aoVey8"
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
