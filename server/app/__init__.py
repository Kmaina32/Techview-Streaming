from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)
    jwt.init_app(app)

    from .routes.auth_routes import auth_bp
    from .routes.podcast_routes import podcast_bp
    from .routes.comment_routes import comment_bp
   
    app.register_blueprint(comment_bp, url_prefix='/api/comments')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(podcast_bp, url_prefix='/api/podcasts')

    with app.app_context():
        db.create_all()

    return app
