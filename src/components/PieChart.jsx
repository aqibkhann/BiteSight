import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PieCharts = ({ refreshData }) => {
  const [userData, setUserData] = useState(null);
  const [dailyLog, setDailyLog] = useState({
    totalCalorie: 0,
    totalCarbohydrates: 0,
    totalProtein: 0,
    totalFats: 0,
    totalSugar: 0,
    totalFiber: 0,
  });

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/userData`, { withCredentials: true });
      setUserData(response.data);
      
      const today = new Date().toISOString().split('T')[0];
      const logForToday = response.data.dailyLogs[today] || {
        totalCalorie: 0,
        totalCarbohydrates: 0,
        totalProtein: 0,
        totalFats: 0,
        totalSugar: 0,
        totalFiber: 0,
      };
      setDailyLog(logForToday);
    } catch (err) {
      console.error('Error loading user data', err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [refreshData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-between">
      <div className="w-full xs:w-1/2 p-4">
        <div className="w-1/2 h-100 flex flex-col justify-center items-center mx-auto">
          <CircularProgressbar
            value={(dailyLog.totalCalorie / userData.dailyCalorie) * 100}
            text={`${dailyLog.totalCalorie} cal`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: '#1c87c9',
              textColor: '#1c87c9',
              trailColor: '#d6d6d6',
              strokeWidth: 1,
            })}
          />
          <div className="text-center mt-4 text-white font-poppins">Calories</div>
        </div>
      </div>

      <div className="w-full xs:w-1/2 p-4">
        <div className="w-1/2 h-100 flex flex-col justify-center items-center mx-auto">
          <CircularProgressbar
            value={(dailyLog.totalCarbohydrates / 300) * 100}
            text={`${dailyLog.totalCarbohydrates} g`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: '#1c87c9',
              textColor: '#1c87c9',
              trailColor: '#d6d6d6',
              strokeWidth: 1,
            })}
          />
          <div className="text-center text-white font-poppins mt-4">Carbohydrates</div>
        </div>
      </div>

      <div className="w-full xs:w-1/2 p-4">
        <div className="w-1/2 h-100 flex flex-col justify-center items-center mx-auto">
          <CircularProgressbar
            value={(dailyLog.totalProtein / 100) * 100}
            text={`${dailyLog.totalProtein} g`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: '#1c87c9',
              textColor: '#1c87c9',
              trailColor: '#d6d6d6',
              strokeWidth: 1,
            })}
          />
          <div className="text-center text-white font-poppins mt-4">Proteins</div>
        </div>
      </div>

      <div className="w-full xs:w-1/2 p-4">
        <div className="w-1/2 h-100 flex flex-col justify-center items-center mx-auto">
          <CircularProgressbar
            value={(dailyLog.totalSugar / 50) * 100}
            text={`${dailyLog.totalSugar} g`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: '#1c87c9',
              textColor: '#1c87c9',
              trailColor: '#d6d6d6',
              strokeWidth: 1,
            })}
          />
          <div className="text-center font-poppins text-white mt-4">Sugar</div>
        </div>
      </div>

      <div className="w-full xs:w-1/2 p-4">
        <div className="w-1/2 h-100 flex flex-col justify-center items-center mx-auto">
          <CircularProgressbar
            value={(dailyLog.totalFiber / 50) * 100}
            text={`${dailyLog.totalFiber} g`}
            styles={buildStyles({
              textSize: '16px',
              pathColor: '#1c87c9',
              textColor: '#1c87c9',
              trailColor: '#d6d6d6',
              strokeWidth: 1,
            })}
          />
          <div className="text-center font-poppins text-white mt-4">Fiber</div>
        </div>
      </div>
    </div>
  );
};

export default PieCharts;