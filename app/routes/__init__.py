from flask import Blueprint

# Create a blueprint for the routes
routes_bp = Blueprint('routes', __name__)

# Import the route files to register their routes
from . import orders, customers, photos, dashboard

# Register blueprints for each module
routes_bp.register_blueprint(dashboard.bp)
routes_bp.register_blueprint(orders.bp)
routes_bp.register_blueprint(customers.bp)
routes_bp.register_blueprint(photos.bp)