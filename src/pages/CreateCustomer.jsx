import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateCustomer() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    address: address,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse the error message from the backend
                throw new Error(errorData.error || 'Failed to create customer');
            }

            navigate('/customers');
        } catch (error) {
            setError(error.message); // Set the error message to display in the UI
        }
    };

    return (
        <div className="create-customer-page">
            <h1>Create New Customer</h1>
            {error && <div className="error-message">Error: {error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Create Customer
                </button>
            </form>
        </div>
    );
}

export default CreateCustomer;
