import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PieCharts = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const fetchPercentage = () => {
      setTimeout(() => {
        setPercentage(69);
      }, 1000);
    };

    fetchPercentage();
  }, []);

  return (
    <div className="flex flex-wrap justify-between">
      <div className="w-full md:w-1/2 p-4">
        <div className="w-1/3 h-100 flex flex-col justify-center items-center mx-auto">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#1c87c9",
              textColor: "#1c87c9",
              trailColor: "#d6d6d6",
              strokeWidth: 5,
            })}
          />
          <div className="text-center mt-4 text-white font-poppins">
            Calories
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <div className="w-1/3 h-100 flex flex-col justify-center items-center mx-auto">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#1c87c9",
              textColor: "#1c87c9",
              trailColor: "#d6d6d6",
              strokeWidth: 5,
            })}
          />
          <div className="text-center text-white font-poppins mt-4">
            Carbohydrates
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <div className="w-1/3 h-100 flex flex-col justify-center items-center mx-auto">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#1c87c9",
              textColor: "#1c87c9",
              trailColor: "#d6d6d6",
              strokeWidth: 5,
            })}
          />
          <div className="text-center text-white font-poppins mt-4">
            Proteins
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <div className="w-1/3 h-100 flex flex-col justify-center items-center mx-auto">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#1c87c9",
              textColor: "#1c87c9",
              trailColor: "#d6d6d6",
              strokeWidth: 5,
            })}
          />
          <div className="text-center font-poppins text-white mt-4">
            Sucrose
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieCharts;
