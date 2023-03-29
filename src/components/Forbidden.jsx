import React from 'react';

const Forbidden = () => {
  return (
    <div className="bg-primary flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
        <h2 className="text-white text-3xl font-bold text-center mb-4">403 Forbidden</h2>
        <p className="text-white text-center">You don't have permission to access this resource.</p>
      </div>
    </div>
  );
};

export default Forbidden;
