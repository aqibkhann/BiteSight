import React from "react";

import {
  LineChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Legend,
  Tooltip,
} from "recharts";
const CalChart = () => {
  const data = [
    {
      day: "25/03/2023",
      Calories: "1700",
    },
    {
      day: "26/03/2023",
      Calories: "2000",
    },
    {
      day: "27/03/2023",
      Calories: "1370",
    },
    {
      day: "28/03/2023",
      Calories: "1890",
    },
  ];

  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="day" />
      <YAxis domain={[0, "dataMax + 200"]} />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="Calories" stroke="#8884d8" />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

export default CalChart;
