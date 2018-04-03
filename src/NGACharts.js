import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { compose, prop, map, tap } from "ramda";

const ChartsContainer = ({ name, data }) => (
  <div>
    <h2>{name}</h2>
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="v"
        stroke="#82ca9e"
        strokeDasharray="5 5"
      />
      <Line
        type="monotone"
        dataKey="m"
        stroke="#82ca9a"
        strokeDasharray="5 5"
      />
      <Line type="monotone" dataKey="x" stroke="#8884d8" />
    </LineChart>
  </div>
);

const getScores = prop("scores");

const NGACharts = compose(map(ChartsContainer), getScores);

export default NGACharts;
