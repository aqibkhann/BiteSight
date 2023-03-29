import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  Legend,
} from "recharts";

const CalChart = () => {
  const [calorieData, setCalorieData] = useState([]);

  useEffect(() => {
    const fetchCalorieData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/userData`, {
          withCredentials: true,
        });
        setCalorieData(response.data.dailyLogs);
      } catch (error) {
        console.error("Error fetching calorie data:", error);
      }
    };

    fetchCalorieData();
  }, []);

  const formattedData = Object.keys(calorieData).map((day) => ({
    day,
    calories: calorieData[day].totalCalorie,
  }));

  if (formattedData.length < 7) {
    return (
      <div className="container mx-auto text-center py-16">
        <div className="text-white font-extrabold text-4xl">
          Calorie trend chart will show up here
        </div>
        <div className="text-white font-extrabold text-4xl">
          when you snap for at least a week
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto overflow-x-auto">
        <LineChart width={600} height={300} data={formattedData}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="calories" stroke="#8884d8" />
        </LineChart>
    </div>
  );
};

export default CalChart;
