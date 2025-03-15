from flask import Blueprint, request, jsonify
from ..models import db
from app.models import Order

bp = Blueprint('orders', __name__)

@bp.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders])

@bp.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    new_order = Order(**data)
    db.session.add(new_order)
    db.session.commit()
    return jsonify(new_order.to_dict()), 201

@bp.route('/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    data = request.get_json()
    order = Order.query.get_or_404(order_id)
    for key, value in data.items():
        setattr(order, key, value)
    db.session.commit()
    return jsonify(order.to_dict())

@bp.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    order = Order.query.get_or_404(order_id)
    db.session.delete(order)
    db.session.commit()
    return '', 204