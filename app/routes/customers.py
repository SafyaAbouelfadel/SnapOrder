from flask import Blueprint, jsonify, request
from ..models import Customer
from ..models import db
bp = Blueprint('customers', __name__)

@bp.route('/api/customers', methods=['GET'])
def get_all_customers():
    try:
        customers = Customer.query.all()
        return jsonify([{
            'id': customer.id,
            'name': customer.name,
            'phone': customer.phone,
            'address': customer.address
        } for customer in customers])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/api/customers/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    try:
        customer = Customer.query.get_or_404(customer_id)
        return jsonify({
            'id': customer.id,
            'name': customer.name,
            'phone': customer.phone,
            'address': customer.address
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@bp.route('/api/customers', methods=['POST'])
def create_customer():
    data = request.get_json()
    required_fields = ['name', 'phone', 'address']
    
    # Check for missing fields
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({'error': 'Missing required fields', 'missing_fields': missing_fields}), 400
    
    try:
        # Create the customer
        new_customer = Customer(
            name=data['name'],
            phone=data['phone'],
            address=data['address']
        )
        db.session.add(new_customer)
        db.session.commit()
        return jsonify(new_customer.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bp.route('/api/customers/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    try:
        customer = Customer.query.get_or_404(customer_id)
        data = request.get_json()
        
        if 'name' in data:
            customer.name = data['name']
        if 'phone' in data:
            customer.phone = data['phone']
        if 'address' in data:
            customer.address = data['address']
            
        db.session.commit()
        return jsonify({
            'id': customer.id,
            'name': customer.name,
            'phone': customer.phone,
            'address': customer.address
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@bp.route('/api/customers/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    try:
        customer = Customer.query.get_or_404(customer_id)
        db.session.delete(customer)
        db.session.commit()
        return jsonify({'message': 'Customer deleted successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500