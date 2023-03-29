import React from "react";
import bg from "../assets/mainbg.png";
import styles from "../style";

const Hero = () => {
  return (
    <section
      id="home"
      className={`flex xl:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col sm:px-8 px-3`}
      >
        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Begin Your Nutritional
          <br /> Journey With <br />
          <span className="text-gradient">BiteSight</span>
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] ml-0`}>
          Say goodbye to tedious calorie tracking and hello to a fun and
          engaging way to monitor your diet. Start your journey to better health
          today.
        </p>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <img
          src={bg}
          alt="billing"
          className="w-[85%] h-[85%]"
        />
      </div>
    </section>
  );
};

export default Hero;
