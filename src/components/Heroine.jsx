import React from "react";
import bg from "../assets/bg-2.png";
import styles from "../style";

const Heroine = () => {
  return (
    <section
      id="home2"
      className={`flex xl:flex-row flex-col py-4`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-8 px-3`}
      >
        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Develop Healthy<br /> Eating <br />
          <span className="text-gradient">Habits</span>
        </h1>
        <p className={`${styles.paragraph} max-w-[300px] mt-5 ml-0`}>
          Snap meals to track calories.
        </p>
      </div>
      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <img
          src={bg}
          alt="billing"
          className="w-[60%] h-[70%] relative z-[4] max-w-[100%] max-h-[100%]"
        />
      </div>
    </section>
  );
};

export default Heroine;
