import React, { useState, useEffect } from 'react';

const CameraCapture = ({ onCapture, onCancel }) => {
  const [videoStream, setVideoStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [confirmCapture, setConfirmCapture] = useState(false); // State to confirm capture

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setVideoStream(stream);
      } catch (error) {
        console.error('Error accessing camera:', error);
        // Handle error accessing camera if needed
      }
    };

    setupCamera();

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // Empty dependency array to ensure it runs only once

  const handleCapture = async () => {
    const videoElement = document.createElement('video');
    document.body.appendChild(videoElement);
    videoElement.srcObject = videoStream;
    await videoElement.play();

    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageData);
    setConfirmCapture(true); // Show confirmation

    // Stop video stream
    videoStream.getTracks().forEach(track => track.stop());
    setVideoStream(null);
    document.body.removeChild(videoElement);
  };

  const handleRetake = async () => {
    setCapturedImage(null);
    setConfirmCapture(false); // Hide confirmation
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    setVideoStream(stream);
  };

  const handleConfirmCapture = () => {
    onCapture(capturedImage); // Pass captured image data to parent component
    setConfirmCapture(false); // Hide confirmation
    onCancel(); // Close the camera capture interface
  };

  const handleClose = () => {
    // Clean up and close camera interface
    setCapturedImage(null);
    setConfirmCapture(false);
    setVideoStream(null);
    onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black bg-opacity-75">
      {capturedImage ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={capturedImage} alt="Captured" className="object-cover w-full h-full" />
          <button
            onClick={handleRetake}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="text-black text-4xl">&#x1F5D8;</div>
          </button>
          <button
            onClick={handleConfirmCapture}
            className="absolute bottom-10 right-10 bg-white rounded-full p-4 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="text-black text-4xl">&#x2714;</div>
          </button>
          <button
            onClick={handleClose}
            className="absolute top-10 right-10 bg-white rounded-full p-4 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="text-black text-4xl">&#x274C;</div>
          </button>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          {videoStream && (
            <video className="object-cover w-full h-full" autoPlay muted playsInline ref={video => video && (video.srcObject = videoStream)}></video>
          )}
          <button
            onClick={handleCapture}
            className="absolute bottom-10 bg-white rounded-full p-6 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="text-black text-4xl">&#x1F4F7;</div>
          </button>
          <button
            onClick={handleClose}
            className="absolute top-10 right-10 bg-white rounded-full p-4 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="text-black text-4xl">&#x274C;</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
