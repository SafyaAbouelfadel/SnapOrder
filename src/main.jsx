import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Order from './pages/Order';
import Customer from './pages/Customer';
import CreateCustomer from './pages/CreateCustomer';
import CreateOrder from './pages/CreateOrder';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path="/orders" element={<Order />} />
      <Route path="/customers" element={<Customer />} />
      <Route path="/create-customer" element={<CreateCustomer />} />
      <Route path="/create-order" element={<CreateOrder />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
