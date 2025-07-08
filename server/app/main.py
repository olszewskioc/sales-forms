from flask import Flask, request, jsonify
from flask_cors import CORS
from controllers.captador_controller import captador_bp

app = Flask(__name__)
CORS(app)


@app.route("/")
def initial():
    return "Bem vindo"

app.register_blueprint(captador_bp)

if __name__ == '__main__':
    app.run(debug=True)
