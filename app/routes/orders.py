from flask import Blueprint, request, jsonify
from ..models import db
from app.models import Order

bp = Blueprint('orders', __name__)

@bp.route('/api/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders])

@bp.route('/api/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    required_fields = ['customer_id', 'photo_url', 'status', 'timestamp']
    
    # Validate required fields
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        # Create and save the new order
        new_order = Order(**data)
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
    db.session.delete(order)
    db.session.commit()
    return '', 204