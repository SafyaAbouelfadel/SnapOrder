from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from app.models import db


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(Config)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
    db.init_app(app)

    with app.app_context():
        from app.routes import routes_bp
        app.register_blueprint(routes_bp)
        from app.routes import orders, customers, photos, dashboard
        app.register_blueprint(dashboard.bp)
        app.register_blueprint(orders.bp)
        app.register_blueprint(customers.bp)
        app.register_blueprint(photos.bp)

        db.create_all()

    return app