import React from "react";
import PieCharts from "./PieChart";
import CalChart from "./CalChart";
import { Pie } from "recharts";
import styles from "../style";

const Dashboard = () => {
  return (
    <div className="bg-primary w-full overflow-hidden flex flex-col items-center justify-center">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <CalChart />
        </div>
      </div>

      <div className="flex justify-center w-full">
        <PieCharts />
      </div>
    </div>
  );
};

export default Dashboard;
