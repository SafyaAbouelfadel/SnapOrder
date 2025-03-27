from flask import Blueprint, request, jsonify
from ..models import db
from app.models import Order
from datetime import datetime

bp = Blueprint('orders', __name__)

@bp.route('/api/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders])

@bp.route('/api/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    required_fields = ['phone', 'photo_url', 'status', 'timestamp']
    
    # Check for missing fields
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({'error': 'Missing required fields', 'missing_fields': missing_fields}), 400

    try:
        # Extract customer_id from phone
        from app.models import Customer  # Import Customer model
        customer = Customer.query.filter_by(phone=data['phone']).first()
        if not customer:
            return jsonify({'error': 'Customer with this phone does not exist'}), 404

        # Convert timestamp to a Python datetime object
        timestamp = datetime.fromisoformat(data['timestamp'].replace('Z', '+00:00'))

        # Create and save the new order
        new_order = Order(
            customer_id=customer.id,  # Use the customer_id from the Customer model
            photo_url=data['photo_url'],
            status=data['status'],
            timestamp=timestamp  # Pass the converted datetime object
        )
        db.session.add(new_order)
        db.session.commit()
        return jsonify(new_order.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bp.route('/api/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    data = request.get_json()
    order = Order.query.get_or_404(order_id)
    for key, value in data.items():
        setattr(order, key, value)
    db.session.commit()
    return jsonify(order.to_dict())

@bp.route('/api/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    order = Order.query.get_or_404(order_id)
    try:
        db.session.delete(order)
        db.session.commit()
        return jsonify({'message': 'Customer deleted successfully'}), 204
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500