import React, { Component } from "react";
import DiscoJS from "./js";
import { injectGlobal } from "styled-components";
import ReactNotifications from "react-notifications-component";

injectGlobal`
   body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      -webkit-tap-highlight-color: rgba(0,0,0,0);
   }
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactNotifications />
        <DiscoJS />
      </div>
    );
  }
}

document.addEventListener("touchstart", function() {}, true);

export default App;
