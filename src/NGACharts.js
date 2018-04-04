import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Container, Row, Col } from "reactstrap";
import { compose, prop, map } from "ramda";
import moment from "moment";

const ChartsContainer = ({ id, desc, result }) => (
  <Container key={id}>
    <Row>
      <Col>
        <LineChart width={500} height={300} data={result}>
          <XAxis
            dataKey="time"
            name="Time"
            tickFormatter={isoTime => moment(isoTime).format("HH:mm")}
            type="category"
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="vOfT"
            name="V(Ei, m)(t)"
            stroke="#74b5e0"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="igProfile"
            name="IG Profile"
            stroke="#6686b7"
            strokeDasharray="5 2"
          />
          <Line
            type="monotone"
            dataKey="voc"
            name="Resultant VoC"
            stroke="#8884d8"
          />
        </LineChart>
      </Col>
      <Col>
        <h4>{desc}</h4>
      </Col>
    </Row>
  </Container>
);

const getScores = prop("results");

const NGACharts = compose(map(ChartsContainer), getScores);

export default NGACharts;
