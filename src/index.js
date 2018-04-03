import React from "react";
import { render } from "react-dom";
import NGACharts from "./NGACharts";
import scores from "./scores.json";

render(<NGACharts scores={scores} />, document.getElementById("root"));
