import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter basename={"/web-frontend/"}>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
