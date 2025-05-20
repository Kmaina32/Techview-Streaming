import os
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from .. import db
from ..models.podcast import Podcast
from ..models.user import User
from datetime import datetime

podcast_bp = Blueprint('podcast', __name__)

UPLOAD_FOLDER = 'server/uploads'
ALLOWED_AUDIO_EXTENSIONS = {'mp3', 'wav', 'aac', 'm4a'}
ALLOWED_VIDEO_EXTENSIONS = {'mp4', 'mov', 'avi', 'mkv'}
ALLOWED_IMAGE_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}

def allowed_file(filename, allowed_exts):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_exts

@podcast_bp.route('/', methods=['GET'])
def get_podcasts():
    podcasts = Podcast.query.order_by(Podcast.created_at.desc()).all()
    result = []
    for p in podcasts:
        result.append({
            'id': p.id,
            'title': p.title,
            'description': p.description,
            'audio_url': p.audio_url,
            'video_url': p.video_url,
            'thumbnail': p.thumbnail,
            'user_id': p.user_id,
            'created_at': p.created_at.isoformat()
        })
    return jsonify(result)

@podcast_bp.route('/<int:podcast_id>', methods=['GET'])
def get_podcast(podcast_id):
    p = Podcast.query.get_or_404(podcast_id)
    return jsonify({
        'id': p.id,
        'title': p.title,
        'description': p.description,
        'audio_url': p.audio_url,
        'video_url': p.video_url,
        'thumbnail': p.thumbnail,
        'user_id': p.user_id,
        'created_at': p.created_at.isoformat()
    })

@podcast_bp.route('/', methods=['POST'])
@jwt_required()
def upload_podcast():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    title = request.form.get('title')
    description = request.form.get('description')

    if not title or not description:
        return jsonify({'message': 'Title and description are required'}), 400

    audio_file = request.files.get('audio_file')
    video_file = request.files.get('video_file')
    thumbnail_file = request.files.get('thumbnail')

    audio_url = None
    video_url = None
    thumbnail_url = None

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    if audio_file and allowed_file(audio_file.filename, ALLOWED_AUDIO_EXTENSIONS):
        filename = secure_filename(f"{datetime.utcnow().timestamp()}_{audio_file.filename}")
        audio_path = os.path.join(UPLOAD_FOLDER, filename)
        audio_file.save(audio_path)
        audio_url = f"/uploads/{filename}"
    elif audio_file:
        return jsonify({'message': 'Invalid audio file type'}), 400

    if video_file and allowed_file(video_file.filename, ALLOWED_VIDEO_EXTENSIONS):
        filename = secure_filename(f"{datetime.utcnow().timestamp()}_{video_file.filename}")
        video_path = os.path.join(UPLOAD_FOLDER, filename)
        video_file.save(video_path)
        video_url = f"/uploads/{filename}"
    elif video_file:
        return jsonify({'message': 'Invalid video file type'}), 400

    if thumbnail_file and allowed_file(thumbnail_file.filename, ALLOWED_IMAGE_EXTENSIONS):
        filename = secure_filename(f"{datetime.utcnow().timestamp()}_{thumbnail_file.filename}")
        thumbnail_path = os.path.join(UPLOAD_FOLDER, filename)
        thumbnail_file.save(thumbnail_path)
        thumbnail_url = f"/uploads/{filename}"
    elif thumbnail_file:
        return jsonify({'message': 'Invalid thumbnail file type'}), 400

    podcast = Podcast(
        title=title,
        description=description,
        audio_url=audio_url,
        video_url=video_url,
        thumbnail=thumbnail_url,
        user_id=user_id
    )
    db.session.add(podcast)
    db.session.commit()

    return jsonify({'message': 'Podcast uploaded successfully', 'podcast_id': podcast.id}), 201
