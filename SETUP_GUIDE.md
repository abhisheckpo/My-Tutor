# Quick Setup Guide for Evaluators

This guide will help you get the application running in under 10 minutes.

## ⚡ Quick Start (Windows)

### Prerequisites Check
Before starting, ensure you have:
- [ ] Node.js installed (run `node --version` in terminal)
- [ ] Python installed (run `python --version` in terminal)
- [ ] Ollama installed and running

### Step-by-Step Setup

#### 1. Install Ollama (if not already installed)
1. Download from: https://ollama.com/download/windows
2. Run the installer
3. Ollama will start automatically

#### 2. Install AI Model
Open PowerShell and run:
```powershell
# Refresh environment variables (if just installed Ollama)
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Download the AI model (2GB, takes 2-3 minutes)
ollama pull llama3.2:3b

# Verify installation
ollama list
```

#### 3. Setup Backend
Open a new PowerShell window:
```powershell
# Navigate to backend directory
cd src/Backend

# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
uvicorn backend:app --host 0.0.0.0 --port 5000 --reload
```

Keep this terminal window open. You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:5000
INFO:     Application startup complete.
```

#### 4. Setup Frontend
Open another new PowerShell window:
```powershell
# Install Node dependencies
npm install

# Start the React app
npm start
```

The application will automatically open in your browser at http://localhost:3000

## 🎯 Testing the Application

### Test Document
Use any of these test documents:
- PDF lecture notes
- PowerPoint presentations
- Word documents
- Plain text files

### What to Test:
1. **Upload**: Click "Choose File" → Select document → Click "Upload"
2. **Wait**: First upload takes ~30-60 seconds (model loading)
3. **Review**: Check the generated:
   - Summary (markdown formatted with bold headings)
   - Flashcards (10 question-answer pairs)
   - Quiz (10 multiple choice questions)
4. **Export**: Try exporting each section as a Word document

## 🔧 Troubleshooting

### Backend Issues

**"Module not found" errors:**
```powershell
pip install fastapi uvicorn python-multipart python-docx pypdf python-pptx fpdf requests
```

**Port 5000 already in use:**
Change the port in the command:
```powershell
uvicorn backend:app --host 0.0.0.0 --port 5001 --reload
```
Then update `src/Frontend/FileUpload/FileUpload.jsx` line 21 to use port 5001.

**"Ollama is not running":**
1. Check if Ollama is running: Visit http://localhost:11434
2. Restart Ollama from the Start Menu
3. Verify the model is installed: `ollama list`

### Frontend Issues

**"npm: command not found":**
Install Node.js from https://nodejs.org/

**Port 3000 already in use:**
The app will automatically ask to use port 3001. Press 'Y' to accept.

**"Network Error" when uploading:**
- Verify backend is running on port 5000
- Check browser console for detailed error messages

## 📊 Evaluation Points

### Working Application
✅ **Document Upload**: Successfully accepts PDF/DOCX/TXT/PPTX files  
✅ **AI Processing**: Generates summaries, flashcards, and quizzes  
✅ **Export Functionality**: Downloads Word documents  
✅ **Error Handling**: Graceful fallbacks for AI failures  
✅ **UI/UX**: Clean, responsive interface  

### Technical Implementation
✅ **Local AI**: No external API dependencies  
✅ **Privacy**: All processing happens locally  
✅ **Modern Stack**: React + FastAPI  
✅ **Code Quality**: Well-organized, documented code  

## 🎓 Key Features to Demonstrate

1. **Upload a document** - Show file processing
2. **View the summary** - Demonstrate markdown formatting
3. **Review flashcards** - Show interactive cards
4. **Take the quiz** - Demonstrate question shuffling
5. **Export content** - Download as Word document

## ⏱️ Expected Performance

- **First upload**: 30-60 seconds (model loading into RAM)
- **Subsequent uploads**: 20-40 seconds
- **File size**: Works best with 500-5000 word documents
- **Memory usage**: ~3-4GB RAM for the AI model

## 💻 System Requirements

**Minimum:**
- 8GB RAM
- 5GB free disk space
- Dual-core processor

**Recommended:**
- 16GB RAM
- SSD storage
- Quad-core processor

## 📝 Notes for Evaluators

- The application uses **100% local AI** - no internet required after setup
- First document processing is slower due to model initialization
- All data stays on your machine - complete privacy
- No API keys or accounts needed
- Free and open-source technology stack

## 🆘 Need Help?

If you encounter issues during evaluation:

1. **Check logs**: 
   - Backend: Look at the PowerShell window running uvicorn
   - Frontend: Open browser DevTools (F12) → Console tab

2. **Restart services**:
   - Stop backend (Ctrl+C) and restart
   - Stop frontend (Ctrl+C) and restart
   - Restart Ollama from Start Menu

3. **Verify installations**:
   ```powershell
   node --version    # Should show v14+
   python --version  # Should show 3.8+
   ollama list       # Should show llama3.2:3b
   ```

## ✅ Success Checklist

Before considering setup complete, verify:
- [ ] Backend running on port 5000 without errors
- [ ] Frontend accessible at http://localhost:3000
- [ ] Can upload a test document
- [ ] Summary is generated
- [ ] 10 flashcards are created
- [ ] 10 quiz questions appear
- [ ] Can export to Word document
- [ ] No console errors in browser

---

**Setup Time**: ~10 minutes  
**First Test**: ~1 minute  
**Total Time to Evaluate**: ~15 minutes  

**Good luck with your evaluation! 🚀**

