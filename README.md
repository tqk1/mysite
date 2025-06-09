# Elf Image Generator

This simple Flask application lets you generate images of elves using OpenAI's image generation API. Enter a description and the backend will request an image from OpenAI and display it in the browser.

## Installation

1. **Create a virtual environment (optional)**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set your OpenAI API key**
   ```bash
   export OPENAI_API_KEY=your-key-here
   ```

## Running the Application

Run the Flask app with:

```bash
python app.py
```

By default the server starts on `http://localhost:5000`. Open this address in your browser to load `index.html`. Enter a prompt describing the desired elf and press **Generate**. The generated image will appear on the page.

## Notes

- The app uses OpenAI's API. Ensure you comply with their terms of service.
- Alternatively, you can replace the image generation logic in `app.py` with a local Stable Diffusion pipeline if preferred.
