from datetime import datetime
from app import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    podcast_id = db.Column(db.Integer, db.ForeignKey('podcasts.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='comments')
    podcast = db.relationship('Podcast', backref='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user': {
                'id': self.user.id,
                'username': self.user.username,
            },
            'podcast_id': self.podcast_id,
            'created_at': self.created_at.isoformat(),
        }
