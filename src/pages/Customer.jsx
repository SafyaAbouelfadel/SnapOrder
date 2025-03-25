import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertTitle, Typography, Button } from '@mui/material';
import { CircularProgress, Box } from '@mui/material';

// Custom hook for API calls
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(endpoint, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.statusText}: ${errorText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text();
        throw new Error(`Invalid JSON response: ${errorText}`);
      }

      return await response.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, callApi };
};

function Customer() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const { loading, error, callApi } = useApi();

  // Memoized fetch customers function
  const fetchCustomers = useCallback(async () => {
    try {
      const data = await callApi('http://127.0.0.1:5000/api/customers');
      setCustomers(data);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
    }
  }, [callApi]);

  // Memoized delete customer function
  const deleteCustomer = useCallback(async (customerId) => {
    try {
      await callApi(`/api/customers/${customerId}`, {
        method: 'DELETE'
      });
      setCustomers(prev => prev.filter(c => c.id !== customerId));
    } catch (err) {
      console.error('Failed to delete customer:', err);
    }
  }, [callApi]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, flex: 1 },
    { field: 'phone', headerName: 'Phone', width: 150, flex: 1 },
    { field: 'address', headerName: 'Address', width: 200, flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250, 
      flex: 1,
      renderCell: (params) => (
        <>
          <Box
            sx={{ 
              mr: 1, 
              cursor: 'pointer',
              color: 'blue',
              '&:hover': { textDecoration: 'underline' }
            }}
            onClick={() => navigate(`/update-customer/${params.row.id}`)}
          >
            Update
          </Box>
          <Box
            sx={{ 
              cursor: 'pointer',
              color: 'red',
              '&:hover': { textDecoration: 'underline' }
            }}
            onClick={() => deleteCustomer(params.row.id)}
          >
            Delete
          </Box>
        </>
      ),
    },
  ];

  return (
    <Box className="customer-page" sx={{ height: 400, width: '100%' }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Customer Management
        </Typography>
        
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => navigate('/create-customer')}
        >
          Create New Customer
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>Error</AlertTitle>
          <Typography>{error}</Typography>
        </Alert>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && customers.length > 0 && (
        <DataGrid
          rows={customers}
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
            border: '1px solid #ddd',
            borderRadius: 1,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
            },
          }}
        />
      )}
    </Box>
  );
}

export default Customer;