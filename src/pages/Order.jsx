import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, CircularProgress, Alert, AlertTitle } from "@mui/material";

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
            const response = await fetch("http://127.0.0.1:5000/api/orders");
            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = (id, currentStatus) => {
        const newStatus = currentStatus === "complete" ? "pending" : "complete";
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === id ? { ...order, status: newStatus } : order
            )
        );
    };

    const columns = [
        { field: "id", headerName: "Order ID", width: 100, flex: 1 },
        { field: "customer_id", headerName: "Customer ID", width: 150, flex: 1 },
        {
            field: "photo_url",
            headerName: "Photo Preview",
            width: 200,
            flex: 1,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt="Order Photo"
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                />
            ),
        },
        {
            field: "timestamp",
            headerName: "Timestamp",
            width: 200,
            flex: 1,
            renderCell: (params) => {
                const date = new Date(params.value);
                return date.toLocaleString(); // Format the timestamp nicely
            },
        },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            flex: 1,
            renderCell: (params) => (
                <label>
                    <input
                        type="checkbox"
                        checked={params.value === "complete"}
                        onChange={() => handleStatusChange(params.row.id, params.value)}
                    />
                    {params.value === "complete" ? "Complete" : "Pending"}
                </label>
            ),
        },
    ];

    return (
        <Box className="order-page" sx={{ height: 600, width: "100%" }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Order Management
                </Typography>

                <Button
                    variant="contained"
                    sx={{ mb: 2 }}
                    onClick={() => navigate("/create-order")}
                >
                    Create New Order
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    <AlertTitle>Error</AlertTitle>
                    <Typography>{error}</Typography>
                </Alert>
            )}

            {loading && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "50vh",
                    }}
                >
                    <CircularProgress />
                </Box>
            )}

            {!loading && orders.length > 0 && (
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
                    autoHeight
                    disableRowSelectionOnClick
                    sx={{
                        border: "1px solid #ddd",
                        borderRadius: 1,
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#f5f5f5",
                        },
                    }}
                />
            )}
        </Box>
    );
}

export default Order;