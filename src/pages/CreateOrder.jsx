import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateOrder() {
    const [phone, setPhone] = useState('');
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        const photoUrls = files.map((file) => URL.createObjectURL(file));
        setPhotos(photoUrls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phone, // Send phone to derive customer_id on the backend
                    photo_url: photos.join(','), // Convert array to comma-separated string
                    status: 'pending',
                    timestamp: new Date().toISOString(),
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to create order');
            }
            navigate('/orders');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="create-order-page">
            <h1>Create New Order</h1>
            {error && <div className="error-message">Error: {error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Customer Phone:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Upload Photos:</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Create Order
                </button>
            </form>
        </div>
    );
}

export default CreateOrder;