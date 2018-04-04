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
    <CardHeader>{title}</CardHeader>
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
      </ResponsiveContainer>
    </CardBody>
  </Card>
);

const maxVoC = compose(R.reduce(max, 0), map(prop("voc")), prop("result"));

const ChartsList = ({ id, title, sensor, cost1, cost2, desc, result }) => (
  <div className="p-3">
    <CardDeck>
      <InfoCard
        title={title}
        desc={desc}
        cost1={cost1}
        cost2={cost2}
        max={maxVoC({ result })}
      />
      <TableCard sensor={sensor} result={result} />
      <ChartCard sensor={sensor} result={result} />
    </CardDeck>
  </div>
);

const getScores = prop("results");

const NGACharts = compose(map(ChartsList), getScores);

export default NGACharts;
