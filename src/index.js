import React from "react";
import ReactDOM from "react-dom";
import "./css/style.css";
import App from "./App";
import StoreProvider from "./stateManager/context";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
