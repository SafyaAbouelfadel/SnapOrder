# filepath: c:\Users\maria\Documents\SnapOrder\app\routes\dashboard.py
from flask import Blueprint, render_template
from ..models import db
from app.models import Order, Customer, Photo

bp = Blueprint('dashboard', __name__)

@bp.route('/')
@bp.route('/dashboard')
def dashboard():
    # Get statistics
    total_customers = Customer.query.count()
    total_orders = Order.query.count()
    total_photos = Photo.query.count()
    
    # Get recent orders with customer and photo details
    recent_orders = Order.query \
        .join(Customer) \
        .join(Photo) \
        .add_columns(Customer.name, Photo.url) \
        .order_by(Order.id.desc()) \
        .limit(5) \
        .all()
    
    return render_template(
        'dashboard.html',
        total_customers=total_customers,
        total_orders=total_orders,
        total_photos=total_photos,
        recent_orders=recent_orders
    )