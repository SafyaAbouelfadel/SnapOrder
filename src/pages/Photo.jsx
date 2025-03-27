import React, { useState, useEffect } from "react";
import { testPhotos } from "../data/datatest"; // Import test data

function Photo() {
  const [photos, setPhotos] = useState(testPhotos); // Use test data as initial state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ ok: true, json: () => testPhotos }), 1000)
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="photo-page">
      <h1>Photo Management</h1>
      {error && <div className="error-message">Error: {error}</div>}
      <div className="photo-list">
        {loading && <div>Loading...</div>}
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.url} alt={`Photo ${photo.id}`} />
            <p>Order ID: {photo.orderId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photo;