// add me as a contributor felicia

import React from "react";
import styles from "./style";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Heroine from "./components/Heroine";
import Footer from "./components/Footer";
import Registration from "./components/Registration";
import PieChart from "./components/PieChart";
import Dashboard from "./components/Dashboard";

import { BrowserRouter, Route, Switch } from "react-router-dom";

const App = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
    <Dashboard />
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}></div>
    </div>
  </div>
);

export default App;
