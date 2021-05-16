import React from "react";
import ReactDOM from "react-dom";
import ContextProvider from "./store/ContextProvider";
import App from "./App";
import "./style.css";

ReactDOM.render(
   <ContextProvider>
      <React.StrictMode>
         <App />
      </React.StrictMode>
   </ContextProvider>,
   document.getElementById("root")
);
