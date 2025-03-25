from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Index, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import validates
import re
from datetime import datetime

db = SQLAlchemy()

class Customer(db.Model):
    __tablename__ = 'customers'
    
    # Add indexes
    __table_args__ = (
        Index('ix_customers_phone', 'phone', unique=True),
        Index('ix_customers_address', 'address'),
    )
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    orders = db.relationship('Order', backref='customer', lazy=True)

    @validates('name')
    def validate_name(self, key, name):
        if not name or len(name.strip()) < 2:
            raise ValueError("Name must be at least 2 characters long")
        return name
    
    @validates('phone')
    def validate_phone(self, key, phone):
        pattern = r'^\+?1?\d{9,15}$'
        if not re.match(pattern, phone):
            raise ValueError("Invalid phone number format")
        return phone
    
    @validates('address')
    def validate_address(self, key, address):
        if not address or len(address.strip()) < 5:
            raise ValueError("Address must be at least 5 characters long")
        return address

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'address': self.address
        }

class Order(db.Model):
    __tablename__ = 'orders'

    # Add indexes and constraints
    __table_args__ = (
        Index('ix_orders_customer_id', 'customer_id'),
        Index('ix_orders_timestamp', 'timestamp'),
        CheckConstraint('status IN (\'pending\', \'processing\', \'completed\', \'cancelled\')', 
                       name='check_status_valid'),
        UniqueConstraint('photo_url', name='unique_photo_url')
    )
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    photo_url = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(50), nullable=False, default='pending')
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    photos = db.relationship('Photo', backref='order', lazy=True)

    @validates('status')
    def validate_status(self, key, status):
        valid_statuses = ['pending', 'processing', 'completed', 'cancelled']
        if status not in valid_statuses:
            raise ValueError(f"Status must be one of: {', '.join(valid_statuses)}")
        return status

    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'photo_url': self.photo_url,
            'status': self.status,
            'timestamp': self.timestamp.isoformat(),  # Convert datetime to ISO format
            'photos': [photo.url for photo in self.photos]  # Include related photo URLs
        }

class Photo(db.Model):
    __tablename__ = 'photos'

     # Add indexes
    __table_args__ = (
        Index('ix_photos_order_id', 'order_id'),
    )
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    url = db.Column(db.String(200), nullable=False)

    @validates('url')
    def validate_url(self, key, url):
        if not url or not url.startswith(('http://', 'https://')):
            raise ValueError("URL must be a valid HTTP or HTTPS URL")
        return url