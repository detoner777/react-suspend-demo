import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//Enable concurrent mode
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

serviceWorker.unregister();
