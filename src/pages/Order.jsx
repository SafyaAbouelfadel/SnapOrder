import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { testOrders } from "../data/datatest";
import { useNavigate } from 'react-router-dom';

function Order() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await new Promise((resolve) =>
                setTimeout(() => resolve({ ok: true, json: () => testOrders }), 1000)
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { field: "id", headerName: "Order ID", width: 100, flex : 1 },
        { field: "customerId", headerName: "Customer ID", width: 150, flex : 1 },
        { field: "numberOfPhotos", headerName: "Photos", width: 150, flex : 1 },
        {
            field: "photos",
            headerName: "Photo Previews",
            width: 300, flex : 1,
            renderCell: (params) => (
                <div style={{ display: "flex", gap: "5px" }}>
                    {params.value.map((photo, index) => (
                        <img
                            key={index}
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            style={{ width: 50, height: 50 }}
                        />
                    ))}
                </div>
            ),
        },
    ];

    return (
        <div className="order-page" style={{ height: 400, width: "100%" }}>
            <h1>Order Management</h1>
            {error && <div className="error-message">Error: {error}</div>}
            <button
                onClick={() => navigate('/create-order')}
                style={{
                    marginBottom: '10px',
                    padding: '10px 20px',
                    backgroundColor: 'green',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Create New Order
            </button>
            <DataGrid
                rows={orders}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5 },
                    },
                }}
                paginationModel={{ page: 0, pageSize: 5 }}
                pageSizeOptions={[5, 10, 20]}
                loading={loading}
                disableRowSelectionOnClick
            />
        </div>
    );
}

export default Order;