import React from "react";
import { render } from "react-dom";
import NGACharts from "./NGACharts";
import NGANavbar from "./NGANavbar";
import results from "./data/results.json";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
    <div>
        <NGANavbar />
        <NGACharts results={results}/>
    </div>
);

render(<App />, document.getElementById("root"));
