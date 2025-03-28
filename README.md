# SnapOrder - Order Management System
 
 SnapOrder is a simple order management system designed to help businesses manage customer orders efficiently, especially for businesses handling custom photo products.
 
 ## Features
 - Order tracking with status updates (Pending, Processed, Delivered)
 - Customer information management (Name, Phone, Address)
 - Photo uploads linked to orders
 - JSON-based storage for persistence
 - REST API for external integrations
 - Simple web-based dashboard for managing orders
 
 ## Installation
 
 ### Prerequisites
 Ensure you have the following installed on your system:
 - Python 3.8+
 - pip (Python package manager)
 - Git
 
 ### Steps to Install
 1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/SnapOrder.git
    cd SnapOrder
    ```
 2. **Create a virtual environment** (Recommended)
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use: venv\Scripts\activate
    ```
 3. **Install dependencies**
    ```bash
    pip install -r requirements.txt
    ```
 4. **Run the Console Interface**
    ```bash
    python console.py
    ```
 5. **Run the Backend API**
    ```bash
    python app.py
    ```
 6. **Run the Frontend (If applicable)**
    ```bash
    cd frontend
    npm install
    npm start
    ```
 
 ## API Endpoints
 | Route                | Method | Description                         |
 |----------------------|--------|-------------------------------------|
 | `/api/orders`        | GET    | Retrieve all orders                |
 | `/api/orders`        | POST   | Create a new order                 |
 | `/api/orders/{id}`   | GET    | Retrieve a specific order by ID    |
 | `/api/orders/{id}`   | PUT    | Update order status                |
 | `/api/orders/{id}`   | DELETE | Delete an order                    |
 | `/api/customers`     | POST   | Register customer information      |
 | `/api/customers/{id}`| GET    | Retrieve customer details          |
 | `/api/photos/upload` | POST   | Upload a photo (stores in database)|
 
 ## Usage
 - **Placing an Order:** Customers provide their details and upload photos.
 - **Order Processing:** Admins can update order statuses and view details.
 - **Photo Management:** Businesses can track uploaded photos per order.
 
 ## Contributing
 If you'd like to contribute, please fork the repository and submit a pull request.
 
 ## License
 This project is licensed under the MIT License - see the LICENSE file for details.
 
 ## Contact
 For support, open an issue on GitHub.