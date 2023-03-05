import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./components/app/App";
import { Provider } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { store } from "./store";
import "./firebase";

const options = {
   position: positions.TOP_RIGHT,
   timeout: 5000,
   offset: "10px",
   transition: transitions.FADE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <AlertProvider template={AlertTemplate} {...options}>
         <Provider store={store}>
            <App />
         </Provider>
      </AlertProvider>
   </React.StrictMode>
);
