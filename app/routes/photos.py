from flask import Blueprint, request, jsonify
from ..models import db  # Ensure this import works correctly
from app.models import Photo

bp = Blueprint('photos', __name__)

@bp.route('/photos', methods=['GET'])
def get_photos():
    photos = Photo.query.all()
    return jsonify([photo.to_dict() for photo in photos])

@bp.route('/photos', methods=['POST'])
def upload_photo():
    data = request.get_json()
    new_photo = Photo(**data)
    db.session.add(new_photo)
    db.session.commit()
    return jsonify(new_photo.to_dict()), 201

@bp.route('/photos/<int:photo_id>', methods=['GET'])
def get_photo(photo_id):
    photo = Photo.query.get_or_404(photo_id)
    return jsonify(photo.to_dict())

@bp.route('/photos/<int:photo_id>', methods=['DELETE'])
def delete_photo(photo_id):
    photo = Photo.query.get_or_404(photo_id)
    db.session.delete(photo)
    db.session.commit()
    return jsonify({'message': 'Photo deleted successfully'}), 204