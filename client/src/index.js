import ReactDOM from "react-dom";
//Routing Import
<<<<<<< HEAD
import { makeMainRoutes } from './routes';
=======
import { makeMainRoutes } from "./routes";

require("dotenv").config();

>>>>>>> b3fb7c0a61ffe196a47f5d8a93e999d45fd88d7a

//Assigns import to a variable
const routes = makeMainRoutes();
ReactDOM.render(routes, document.getElementById("root"));
