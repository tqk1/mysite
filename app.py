import os
from flask import Flask, request, jsonify, send_from_directory
import openai

app = Flask(__name__)

# Configure OpenAI API key via environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/')
def index():
    """Serve the frontend."""
    return send_from_directory('.', 'index.html')

@app.route('/generate', methods=['POST'])
def generate():
    """Generate an elf image based on the provided text prompt."""
    data = request.get_json() or {}
    prompt = data.get('prompt', '')
    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400

    try:
        response = openai.Image.create(prompt=prompt, n=1, size="512x512")
        image_url = response['data'][0]['url']
        return jsonify({'url': image_url})
    except Exception as exc:
        return jsonify({'error': str(exc)}), 500

if __name__ == '__main__':
    app.run(debug=True)
