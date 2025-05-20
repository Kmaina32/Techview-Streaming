from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.comment import Comment
from app.models.user import User
from app.models.podcast import Podcast

comment_bp = Blueprint('comment_bp', __name__, url_prefix='/api/comments')

@comment_bp.route('/<int:podcast_id>', methods=['GET'])
def get_comments(podcast_id):
    comments = Comment.query.filter_by(podcast_id=podcast_id).order_by(Comment.created_at.desc()).all()
    return jsonify([comment.to_dict() for comment in comments]), 200

@comment_bp.route('/<int:podcast_id>', methods=['POST'])
@jwt_required()
def add_comment(podcast_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    content = data.get('content', '').strip()
    if not content:
        return jsonify({'error': 'Content is required'}), 400

    podcast = Podcast.query.get(podcast_id)
    if not podcast:
        return jsonify({'error': 'Podcast not found'}), 404

    comment = Comment(content=content, user_id=user_id, podcast_id=podcast_id)
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201

@comment_bp.route('/<int:comment_id>', methods=['DELETE'])
@jwt_required()
def delete_comment(comment_id):
    user_id = get_jwt_identity()
    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({'error': 'Comment not found'}), 404
    if comment.user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    db.session.delete(comment)
    db.session.commit()
    return jsonify({'message': 'Comment deleted'}), 200
