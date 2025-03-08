from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, IoT World!"

# ✅ `health` エンドポイントを追加（ここが重要！）
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
