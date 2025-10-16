# 🚀 How to Run the Code Review Assistant

## Prerequisites

Before you start, make sure you have:
- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Terminal/Command Line** access

Optional:
- **MongoDB** (or use in-memory mode)
- **Google Gemini API Key** ([Get free key](https://aistudio.google.com/app/apikey))

---

## ⚡ Quick Start (3 Steps)

### Step 1: Navigate to Project
```bash
cd /home/nexo/code-review-assistant
```

### Step 2: Run Setup Script
```bash
bash scripts/setup.sh
```
This will:
- Check Node.js version
- Install all dependencies (backend + frontend)
- Create configuration files

### Step 3: Start Application
```bash
bash scripts/start.sh
```
This will:
- Start backend server on port 5000
- Start frontend server on port 5173
- Open both in split terminal (if tmux installed)

### Step 4: Access the App
Open your browser and go to:
```
http://localhost:5173
```

**That's it! 🎉 The app is now running!**

---

## 📋 Manual Setup (If Scripts Don't Work)

### Backend Setup

1. **Navigate to backend folder:**
```bash
cd /home/nexo/code-review-assistant/backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
```bash
# Create .env file
cat > .env << 'EOF'
PORT=5000
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/codeReview
USE_MEMORY_DB=true
MOCK_AI=true
GEMINI_MODEL=gemini-pro
EOF
```

4. **Start backend server:**
```bash
npm run dev
```

Backend will run on: **http://localhost:5000**

---

### Frontend Setup

**Open a NEW terminal**, then:

1. **Navigate to frontend folder:**
```bash
cd /home/nexo/code-review-assistant/frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
```bash
# Create .env file
cat > .env << 'EOF'
VITE_API_BASE=http://localhost:5000/api
EOF
```

4. **Start frontend server:**
```bash
npm run dev
```

Frontend will run on: **http://localhost:5173**

---

## 🎮 Using the Application

### 1. Upload Code File
1. Enter filename (e.g., `app.js`)
2. Select programming language from dropdown
3. Paste your code in the textarea
4. Click **Upload File** button
5. File appears in "Your Files" list

### 2. Run Code Review
1. Click on a file in "Your Files" list
2. Click **Run Code Review** button in middle panel
3. Wait 2-5 seconds for AI analysis
4. Review appears in right panel with:
   - Overall quality score (0-100)
   - Code metrics (complexity, maintainability, etc.)
   - Issues found with severity levels
   - Positive aspects
   - Actionable suggestions

### 3. Generate Tests
1. Select a file from "Your Files" list
2. Scroll to "Tests" section in middle panel
3. Click **Generate Tests** button
4. View AI-generated unit tests
5. Copy tests to use in your project

### 4. Browse History
- Click different files to select them
- Click different reviews to view details
- All data persists in database

### 5. Toggle Theme
- Click 🌙/☀️ button in top-right corner
- Switch between dark and light mode
- Preference saves automatically

---

## 🔧 Configuration Options

### Backend Configuration (backend/.env)

```env
# Server port
PORT=5000

# Google Gemini API key (optional - use MOCK_AI for testing)
GEMINI_API_KEY=your_api_key_here

# Development/Production mode
NODE_ENV=development

# MongoDB connection (optional - use memory DB for testing)
MONGO_URI=mongodb://localhost:27017/codeReview

# Use in-memory database (true = no MongoDB needed)
USE_MEMORY_DB=true

# Use mock AI responses (true = works offline)
MOCK_AI=true

# AI model to use
GEMINI_MODEL=gemini-pro
```

**For Development:**
- Set `USE_MEMORY_DB=true` (no MongoDB needed)
- Set `MOCK_AI=true` (no API key needed)

**For Production:**
- Set `USE_MEMORY_DB=false`
- Set `MOCK_AI=false`
- Provide real `GEMINI_API_KEY`
- Provide real MongoDB URI

### Frontend Configuration (frontend/.env)

```env
# Backend API URL
VITE_API_BASE=http://localhost:5000/api
```

---

## 🧪 Testing the API

### Run Demo Script
```bash
bash scripts/demo.sh
```

This will:
- Upload sample code file
- Create a review
- Generate tests
- Display results

### Manual API Testing

**Upload a file:**
```bash
curl -X POST http://localhost:5000/api/files \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "test.js",
    "language": "javascript",
    "content": "function add(a,b) { return a + b; }"
  }'
```

**Create review:**
```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{"fileId": "YOUR_FILE_ID"}'
```

**Get reviews:**
```bash
curl http://localhost:5000/api/reviews
```

---

## 🐛 Troubleshooting

### Backend Won't Start

**Problem:** Port 5000 already in use
```bash
# Check what's using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

**Problem:** MongoDB connection error
```bash
# Solution: Use in-memory database
# In backend/.env, set:
USE_MEMORY_DB=true
```

**Problem:** Gemini API error
```bash
# Solution: Use mock mode
# In backend/.env, set:
MOCK_AI=true
```

### Frontend Won't Start

**Problem:** Port 5173 already in use
```bash
# Kill process on port 5173
lsof -i :5173
kill -9 <PID>
```

**Problem:** Can't connect to backend
```bash
# Check backend is running
curl http://localhost:5000/health

# Check frontend .env has correct API URL
cat frontend/.env
# Should show: VITE_API_BASE=http://localhost:5000/api
```

**Problem:** Dependencies error
```bash
# Clear and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Application Issues

**Problem:** No data showing
- Refresh browser (Ctrl+R or Cmd+R)
- Check browser console for errors (F12)
- Verify backend is running

**Problem:** Review generation fails
- Check backend logs in terminal
- If using real API, verify `GEMINI_API_KEY` is valid
- Switch to `MOCK_AI=true` for testing

**Problem:** Upload doesn't work
- Check file size (should be under 2MB)
- Check browser console for errors
- Verify backend is responding

---

## 📁 Project Structure

```
code-review-assistant/
├── backend/                 # Express API server
│   ├── api/                # Server entry point
│   ├── config/             # Database config
│   ├── controllers/        # Request handlers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # Business logic (Gemini AI)
│   └── .env               # Backend config
│
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── lib/          # Utilities & API client
│   │   └── types/        # TypeScript types
│   └── .env              # Frontend config
│
├── scripts/               # Helper scripts
│   ├── setup.sh          # Setup script
│   ├── start.sh          # Start script
│   └── demo.sh           # Demo script
│
└── *.md                   # Documentation
```

---

## 🔌 API Endpoints

### Files
- `POST /api/files` - Upload code file
- `GET /api/files` - List all files

### Reviews
- `POST /api/reviews` - Create review for file
- `GET /api/reviews` - List all reviews
- `GET /api/reviews/:id` - Get review details

### Tests
- `POST /api/tests` - Generate tests for file
- `GET /api/tests?fileId=<id>` - Get tests for file

### Health
- `GET /health` - Check server status

---

## 🚢 Production Deployment

### 1. Build Frontend
```bash
cd frontend
npm run build
```

### 2. Configure for Production
```bash
# backend/.env
USE_MEMORY_DB=false
MOCK_AI=false
GEMINI_API_KEY=<your_real_key>
MONGO_URI=<production_mongodb_uri>
```

### 3. Serve Application
```bash
# Use PM2 or similar process manager
npm install -g pm2
pm2 start backend/api/server.js --name code-review-api

# Serve frontend build with nginx or similar
```

---

## 📚 Additional Resources

- **Project Summary:** See `PROJECT_SUMMARY.md`
- **Visual Guide:** See `VISUAL_GUIDE.md`
- **Demo Instructions:** See `DEMO_INSTRUCTIONS.md`
- **Requirements Checklist:** See `DELIVERABLES_CHECKLIST.md`
- **Development Log:** See `REMEMBER.md`

---

## ⚡ Quick Commands Reference

```bash
# Setup everything
bash scripts/setup.sh

# Start both servers
bash scripts/start.sh

# Test API
bash scripts/demo.sh

# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && npm run dev

# Stop servers
# Press Ctrl+C in terminal
```

---

## 🆘 Need Help?

1. **Check logs** in terminal for error messages
2. **Check browser console** (F12) for frontend errors
3. **Verify configurations** in .env files
4. **Try mock mode** (MOCK_AI=true, USE_MEMORY_DB=true)
5. **Restart servers** (Ctrl+C and start again)

---

**🎉 You're all set! Happy code reviewing!**
