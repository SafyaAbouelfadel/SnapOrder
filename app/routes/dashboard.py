# filepath: c:\Users\maria\Documents\SnapOrder\app\routes\dashboard.py
from flask import Blueprint, render_template
from ..models import db
from app.models import Order, Customer, Photo

bp = Blueprint('dashboard', __name__)

@bp.route('/dashboard')
def dashboard():
    orders = Order.query.all()
    customers = Customer.query.all()
    photos = Photo.query.all()
    return render_template('dashboard.html', orders=orders, customers=customers, photos=photos)