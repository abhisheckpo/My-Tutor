# Learning App - Backend Server

FastAPI backend server that processes educational documents and generates AI-powered learning materials.

## Features

- **Document Processing**: Supports PDF, DOCX, TXT, and PPTX files
- **AI Content Generation**: Uses local Ollama models to generate:
  - Detailed summaries with markdown formatting
  - 10 flashcards for quick review
  - 10 quiz questions with multiple choice answers
- **Export Functionality**: Generate downloadable Word documents

## Setup

### Prerequisites

1. **Python 3.8+**
2. **Ollama** (for local AI model inference)

### Installation

1. Install Ollama from https://ollama.com/download

2. Pull a model (recommended: llama3.2:3b):
   ```bash
   ollama pull llama3.2:3b
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   
   Or install individually:
   ```bash
   pip install fastapi uvicorn python-multipart python-docx pypdf python-pptx fpdf requests
   ```

### Running the Server

```bash
cd src/Backend
uvicorn backend:app --host 0.0.0.0 --port 5000 --reload
```

The server will be available at `http://localhost:5000`

## Configuration

### Changing the AI Model

Edit `ai_models.py` and change the `MODEL_NAME` variable:

```python
MODEL_NAME = "llama3.2:3b"  # Current model
# MODEL_NAME = "phi3:mini"  # Alternative: 3.8GB, good for education
# MODEL_NAME = "gemma2:2b"  # Alternative: 1.6GB, fastest
```

Available models you can try:
- `llama3.2:3b` (2GB) - Fast and reliable (recommended)
- `phi3:mini` (3.8GB) - Excellent for educational content
- `gemma2:2b` (1.6GB) - Very fast, smaller model

Pull new models with:
```bash
ollama pull <model-name>
```

### Adjusting Timeouts

If you're getting timeout errors, edit `ai_models.py`:

```python
def generate_with_ollama(prompt, timeout=300):  # 5 minutes
```

## API Endpoints

### POST /upload
Upload a document for processing

**Request**: Multipart form data with file
**Response**:
```json
{
  "summary": "Markdown formatted summary...",
  "flash_cards": [["Question 1", "Answer 1"], ...],
  "quiz": [{"question": "Q1?", "possible_answers": [...], "index": 0}, ...]
}
```

### POST /export
Export generated content to Word document

**Request**:
```json
{
  "selected": 0,  // 0=summary, 1=flashcards, 2=quiz
  "data": "..."   // The content to export
}
```

**Response**: Word document file

## Troubleshooting

### "Ollama is not running"
Make sure Ollama is installed and running. Check http://localhost:11434

### "Model not found"
Pull the model first:
```bash
ollama pull llama3.2:3b
```

### Slow generation
Try a smaller model like `gemma2:2b` or increase your timeout value.

### JSON parsing errors
The model might return invalid JSON. The code has fallbacks to handle this gracefully.

## Benefits of Local Models

✅ **No API costs** - Everything runs on your machine  
✅ **No rate limits** - Process as many documents as you want  
✅ **Privacy** - Your data never leaves your computer  
✅ **Works offline** - No internet required after model download  
✅ **Fast** - No network latency

## System Requirements

- **Minimum**: 8GB RAM, 5GB free disk space
- **Recommended**: 16GB RAM, SSD for faster model loading

