import { render } from "solid-js/web";
import App from "./App";
import { Route, Router } from "@solidjs/router";

const root = document.getElementById("root")
if (root === null) {
    throw "root element not found"
}
render(() => (
    <Router>
        <Route path="/*" component={App} />
    </Router>
), root);
