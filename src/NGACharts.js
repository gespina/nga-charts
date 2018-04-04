import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import ReactTable from "react-table";
import { Card, CardText, CardBody, CardHeader } from "reactstrap";
import { compose, prop, map } from "ramda";
import moment from "moment";

const columns = [
  {
    Header: "Time",
    accessor: "time"
  },
  {
    Header: "V(Ei, m)",
    accessor: "vOfT"
  },
  {
    Header: "IG Profile",
    accessor: "igProfile"
  },
  {
    Header: "Resultant VoC",
    accessor: "voc"
  }
];

const ChartsList = ({ id, title, desc, result }) => (
  <Card>
    <CardHeader>{title}</CardHeader>
    <CardBody>
      <CardText>{desc}</CardText>
    </CardBody>
    <CardBody>
      <div>
        <ReactTable
          data={result}
          columns={columns}
          minRows={4}
          showPagination={false}
          className="-striped -highlight"
        />
      </div>
    </CardBody>
    <CardBody>
      <ComposedChart width={640} height={300} data={result}>
        <XAxis
          dataKey="time"
          name="Time"
          tickFormatter={isoTime =>
            moment(isoTime)
              .utc()
              .format("HH:mm:ss")
          }
          type="category"
        />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
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
        <Area
          type="monotone"
          dataKey="voc"
          name="Resultant VoC"
          stroke="#8884d8"
        />
        <Bar
          type="monotone"
          dataKey="voc"
          barSize={10}
          name="Resultant VoC"
          fill="#413ea0"
          legendType="none"
        />
      </ComposedChart>
    </CardBody>
  </Card>
);

const getScores = prop("results");

const NGACharts = compose(map(ChartsList), getScores);

export default NGACharts;
