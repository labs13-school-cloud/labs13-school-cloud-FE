import React from "react";
import ReactDOM from "react-dom";

import Routes from "./BaseRoutes";
import "./index.css";

import dotenv from "dotenv";
dotenv.config();

ReactDOM.render(<Routes />, document.getElementById("root"));
