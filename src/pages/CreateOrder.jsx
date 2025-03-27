import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import the upload icon

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
                const errorData = await response.json(); // Parse the error message from the backend
                throw new Error(errorData.error || 'Failed to create order');
            }
            navigate('/orders');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                padding: 2,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Create New Order
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                    maxWidth: 400,
                }}
            >
                <TextField
                    id="phone"
                    label="Customer Phone"
                    variant="filled"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload Photos
                    <input
                        type="file"
                        onChange={handlePhotoUpload}
                        multiple
                        hidden
                    />
                </Button>
                {photos.length > 0 && (
                    <Typography variant="body2" color="textSecondary">
                        {photos.length} photo(s) selected
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ padding: '10px 20px' }}
                >
                    Create Order
                </Button>
            </Box>
        </Box>
    );
}

export default CreateOrder;