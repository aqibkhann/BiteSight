import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

const ImageCard = ({ image, onDelete }) => (
  <div className="flex flex-col rounded overflow-hidden shadow-lg m-4 bg-white text-gray-900 w-100">
    <div className="h-64 overflow-hidden">
      <img className="w-full h-full object-cover" src={image.base64} alt="Food" />
    </div>
    <div className="flex flex-col justify-between flex-grow p-4">
      <div className="font-bold text-xl mb-2">Calories: {image.calorie}</div>
      <p className="text-base">Carbohydrates: {image.carbohydrates}</p>
      <p className="text-base">Protein: {image.protein}</p>
      <p className="text-base">Fats: {image.fats}</p>
      <p className="text-base">Sugar: {image.sugar}</p>
      <button
        onClick={() => onDelete(image.uid)}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        aria-label="Delete image"
      >
        <FaTrashAlt className="inline-block mr-2" size={16} />
        Delete
      </button>
    </div>
  </div>
);

const ImageGallery = ({ refreshImages }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/user/images`, { withCredentials: true });
      setImages(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading images', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [refreshImages]);

  const handleDelete = async (uid) => {
    try {
      await axios.delete(`${process.env.API_URL}/api/deleteEntry/${uid}`, { withCredentials: true });
      setImages(images.filter(image => image.uid !== uid));
    } catch (err) {
      console.error('Error deleting image', err);
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1">
        {images.length === 0 ? (
          <div className="text-center text-white font-extrabold text-4xl mt-32">
            Start snapping to show recent foods.
          </div>
        ) : (
          images.map((image) => (
            <ImageCard key={image.uid} image={image} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
