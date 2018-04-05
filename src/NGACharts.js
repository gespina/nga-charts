import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Area,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import ReactTable from "react-table";
import {
  Card,
  CardDeck,
  CardText,
  CardBody,
  CardHeader,
  CardGroup,
  CardSubtitle
} from "reactstrap";
import R, { compose, prop, map, max } from "ramda";
import moment from "moment";

const columns = [
  {
    Header: "Time",
    accessor: "time",
    width: 150
  },
  {
    Header: "V(Ei, m)",
    accessor: "vOfT",
    width: 75
  },
  {
    Header: "IG Profile",
    accessor: "igProfile",
    width: 75
  },
  {
    Header: "Resultant VoC",
    accessor: "voc",
    width: 75
  }
];

const InfoCard = ({ title, desc, cost1, cost2, max }) => (
  <Card>
    <CardHeader>Overall Summary</CardHeader>
    <CardBody>
      <CardSubtitle>{desc}</CardSubtitle>
      <CardText />
      <CardDeck>
        <Card outline color="secondary">
          <CardBody>
            <CardText>
              <h2>{cost1}</h2>
            </CardText>
            <CardText>
              <small className="text-muted">Cost/dwell time</small>
            </CardText>
          </CardBody>
        </Card>
        <Card outline color="secondary">
          <CardBody>
            <CardText>
              <h2>{cost2}</h2>
            </CardText>
            <CardText>
              <small className="text-muted">Cost/latency speed up</small>
            </CardText>
          </CardBody>
        </Card>
        <Card outline color="primary">
          <CardBody>
            <CardText>
              <h2>{max}</h2>
            </CardText>
            <CardText>
              <small className="text-muted">Max VoC</small>
            </CardText>
          </CardBody>
        </Card>
      </CardDeck>
    </CardBody>
  </Card>
);

const TableCard = ({ sensor, result }) => (
  <Card>
    <CardHeader>{sensor} Table Data</CardHeader>
    <CardBody>
      <div class="small">
        <ReactTable
          data={result}
          columns={columns}
          minRows={4}
          showPagination={false}
          className="-striped -highlight"
        />
      </div>
    </CardBody>
  </Card>
);

const ChartCard = ({ sensor, result }) => (
  <Card>
    <CardHeader>{sensor} Chart Data</CardHeader>
    <CardBody>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart width={640} height={200} data={result}>
          <defs>
            <linearGradient id="colorVoC" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
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
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
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
            fillOpacity={1}
            fill="url(#colorVoC)"
          />
          <Bar
            type="monotone"
            dataKey="voc"
            barSize={10}
            name="Resultant VoC"
            fill="#413ea0"
            legendType="none"
            label={{ align: "top" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </CardBody>
  </Card>
);

const maxVoC = compose(
  R.reduce(max, -Infinity),
  map(prop("voc")),
  prop("result")
);

const ChartsList = props => {
  const { title, sensor, cost1, cost2, desc, result } = props;
  return (
    <Card className="p-3">
      <CardHeader style={{ backgroundColor: "#333", color: "#fff" }}>
        {title}
      </CardHeader>
      <CardDeck>
        <InfoCard
          title={title}
          desc={desc}
          cost1={cost1}
          cost2={cost2}
          max={maxVoC({ result })}
        />
        <ChartCard sensor={sensor} result={result} />
        <TableCard sensor={sensor} result={result} />
      </CardDeck>
    </Card>
  );
};

const getScores = prop("results");

const NGACharts = compose(map(ChartsList), getScores);

export default NGACharts;
