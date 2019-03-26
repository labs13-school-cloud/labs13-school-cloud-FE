import ReactDOM from "react-dom";
//Routing Import
import { makeMainRoutes } from "./routes";
require("dotenv");

//Assigns import to a variable
const routes = makeMainRoutes();
ReactDOM.render(routes, document.getElementById("root"));
