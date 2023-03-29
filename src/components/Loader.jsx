import React from 'react';
import Navbar from './Navbar';
import styles from '../style';

const Loader = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <Navbar />
      </div>
      <div className="flex-1 flex items-center justify-center bg-primary">
        <div className="flex">
          <div className="loader-dot ease-linear rounded-full h-3 w-3 bg-blue-gradient mx-2 animate-bounce"></div>
          <div className="loader-dot ease-linear rounded-full h-3 w-3 bg-blue-gradient mx-2 animate-bounce"></div>
          <div className="loader-dot ease-linear rounded-full h-3 w-3 bg-blue-gradient mx-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
