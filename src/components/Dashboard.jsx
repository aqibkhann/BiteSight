import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CameraCapture from './CameraCapture'; // Import CameraCapture component
import PieCharts from './PieChart';
import CalChart from './CalChart';
import ImageGallery from './ImageGallery';

const Dashboard = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showCameraCapture, setShowCameraCapture] = useState(false); // State to control showing CameraCapture
  const [loading, setLoading] = useState(false);
  const [showCannotRun, setShowCannotRun] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/userData`, { withCredentials: true });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [refreshData]);

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(`http://localhost:3001/api/deleteEntry/${imageId}`, { withCredentials: true });
      setRefreshData(prev => !prev);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleCancelCapture = () => {
    setShowCameraCapture(false); // Close camera capture interface
  };

  const handleOpenCamera = () => {
    setShowCameraCapture(true); // Open camera capture interface
  };

  const handleUpload = async (base64Image) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3001/api/uploadImage`,
        { capturedImage: base64Image },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      setRefreshData(prev => !prev); // Refresh data after successful upload
    } catch (error) {
      setShowCannotRun(true);
      setTimeout(() => {
        setShowCannotRun(false);
      }, 2000);
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
      setShowCameraCapture(false); // Close camera capture interface regardless of success or failure
    }
  };

  return (
    <div className="bg-primary w-full overflow-hidden flex flex-col items-center justify-center relative min-h-screen mt-40">
      {/* Camera Capture Component */}
      {showCameraCapture && (
        <CameraCapture onCapture={handleUpload} onCancel={handleCancelCapture} />
      )}

      {/* Snap Button */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={handleOpenCamera}
          className="bg-white rounded-lg border-4 border-white p-4 cursor-pointer flex items-center justify-center shadow-md hover:shadow-lg transition duration-300"
        >
          <div className="text-black text-4xl">&#43;</div>
          <div className="text-black ml-2">Snap</div>
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="text-white text-3xl flex items-center">
            Running coco-ssd
            <span className="ml-4 flex space-x-2">
              <span className="dot h-3 w-3 bg-white rounded-full animate-bounce"></span>
              <span className="dot h-3 w-3 bg-white rounded-full animate-bounce animation-delay-200"></span>
              <span className="dot h-3 w-3 bg-white rounded-full animate-bounce animation-delay-400"></span>
            </span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {showCannotRun && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="text-white text-3xl">Cannot run model</div>
        </div>
      )}

      {/* Charts and Gallery */}
      <div className="flex flex-col sm:flex-row w-full mt-16 px-4 py-16">
        <div className="flex-1 px-6 py-4">
          <div className="py-8">
            <CalChart key={refreshData} refreshData={refreshData} userData={userData} />
          </div>
          <div className="flex justify-center w-full">
            <PieCharts key={refreshData} refreshData={refreshData} userData={userData} />
          </div>
        </div>
        <div className="flex-1">
          <ImageGallery
            key={refreshData}
            refreshData={refreshData}
            userData={userData}
            onDeleteImage={handleDeleteImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
