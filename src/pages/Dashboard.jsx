import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function Dashboard() {
    const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'Order ID', width: 150 },
        { field: 'customer', headerName: 'Customer Name', width: 200 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'timestamp', headerName: 'Timestamp', width: 200 },
    ];

    const rows = [
        { id: 1, customer: 'John Doe', status: 'Pending', timestamp: '2025-03-27 10:00 AM' },
        { id: 2, customer: 'Jane Smith', status: 'Completed', timestamp: '2025-03-26 02:30 PM' },
    ];

    const data = [
        { name: 'Pending', value: 30 },
        { name: 'Completed', value: 420 },
    ];

    const COLORS = ['#FFBB28', '#00C49F'];

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>

            {/* Key Metrics */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Customers</Typography>
                            <Typography variant="h4">120</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Orders</Typography>
                            <Typography variant="h4">450</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Pending Orders</Typography>
                            <Typography variant="h4">30</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Completed Orders</Typography>
                            <Typography variant="h4">420</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Recent Orders and Orders Status */}
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {/* Orders Status Chart */}
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Orders Status
                        </Typography>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Box>
                </Grid>

                {/* Recent Orders Table */}
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Recent Orders
                        </Typography>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            autoHeight
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 5 },
                                },
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>

            {/* Navigation Shortcuts */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button variant="contained" color="primary" onClick={() => navigate('/customers')}>
                    Manage Customers
                </Button>
                <Button variant="contained" color="secondary" onClick={() => navigate('/orders')}>
                    Manage Orders
                </Button>
                <Button variant="contained" color="success" onClick={() => navigate('/create-order')}>
                    Create New Order
                </Button>
            </Box>
        </Box>
    );
}

export default Dashboard;