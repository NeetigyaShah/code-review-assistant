# Code Review Assistant 🚀

> An intelligent AI-powered code review platform that helps developers write better code by providing comprehensive analysis, actionable insights, and quality metrics powered by Google's Gemini AI.

![Code Review Assistant](https://img.shields.io/badge/AI-Powered-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![React](https://img.shields.io/badge/React-TypeScript-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

## 🎯 What is Code Review Assistant?

Code Review Assistant automates the code review process using advanced AI to analyze your code for:
- **Code Quality** - Readability, modularity, and maintainability
- **Best Practices** - Language-specific conventions and patterns
- **Security Issues** - Vulnerability detection and input validation
- **Performance** - Bottlenecks and optimization opportunities
- **Bug Detection** - Potential errors and edge cases

Get instant, detailed feedback on your code with actionable improvement suggestions.

## 🎥 See It In Action

<div align="center">
<img width="1895" height="1078" alt="image" src="https://github.com/user-attachments/assets/e29b5f25-5ed1-4229-b935-e527d07378d0" />

[![Watch the video]](https://raw.githubusercontent.com/NeetigyaShah/code-review-assistant/working.mp4)
*Watch the Code Review Assistant in action - from uploading code to getting AI-powered insights*

</div>

---

## ⚡ Quick Start

**Get up and running in under 2 minutes:**

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd code-review-assistant

# 2. Run automated setup
bash scripts/setup.sh

# 3. Start the application
bash scripts/start.sh

# 4. Open http://localhost:5173 in your browser
```

**That's it!** The setup script will handle dependencies, configuration, and guide you through the process.

> 📖 **Need more help?** See [HOW_TO_RUN.md](HOW_TO_RUN.md) for detailed setup and troubleshooting.

---

## ✨ Key Features

### Core Capabilities
- 🤖 **AI-Powered Analysis** - Leverages Google Gemini for intelligent code review
- 📊 **Comprehensive Metrics** - Complexity, maintainability index, LOC, and estimated bugs
- 🐛 **Smart Issue Detection** - Identifies bugs, security vulnerabilities, and code smells
- ✅ **Best Practices** - Language-agnostic suggestions for improvement
- 💡 **Actionable Insights** - Specific suggestions with code snippets and impact analysis

### User Experience
- 📈 **Beautiful Dashboard** - Modern, intuitive interface with dark/light themes
- 💾 **Review History** - Store and access all past code reviews
- ⚡ **Real-time Analysis** - Fast AI-powered reviews (typically 5-10 seconds)
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Severity Indicators** - Color-coded issues (High/Medium/Low)

---

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js 18+ with Express.js
- **Database**: MongoDB with Mongoose ORM (optional in-memory mode)
- **AI Engine**: Google Gemini API (gemini-2.5-flash)
- **Validation**: Zod for type-safe request validation
- **Architecture**: RESTful API with layered architecture

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **Data Management**: React Query (TanStack Query) for caching & synchronization
- **UI Components**: Custom components with Lucide icons
- **Build Tool**: Vite for blazing-fast development

### Developer Experience
- **Scripts**: Automated setup, start, and demo scripts
- **Mock Mode**: Test without using AI credits
- **In-Memory DB**: Develop without MongoDB installation
- **Hot Reload**: Instant feedback during development

---

## 📋 Prerequisites

Before you begin, ensure you have:

| Requirement | Version | Optional | Notes |
|------------|---------|----------|-------|
| **Node.js** | 18.0+ | ❌ Required | [Download here](https://nodejs.org/) |
| **npm** | 9.0+ | ❌ Required | Comes with Node.js |
| **MongoDB** | 6.0+ | ✅ Optional | Use `USE_MEMORY_DB=true` to skip |
| **Gemini API Key** | - | ✅ Optional | Use `MOCK_AI=true` for testing |

> **Get Gemini API Key**: [Google AI Studio](https://aistudio.google.com/app/apikey) (Free tier available)

---

## 🛠️ Installation & Setup

### Option 1: Automated Setup (Recommended)

The fastest way to get started:

```bash
# Clone and navigate
git clone <your-repo-url>
cd code-review-assistant

# Run setup script
bash scripts/setup.sh
```

The script will:
- ✅ Verify Node.js installation
- ✅ Install backend and frontend dependencies  
- ✅ Create environment configuration files
- ✅ Provide next steps

### Option 2: Manual Installation

**Step 1: Clone the repository**
```bash
git clone <your-repo-url>
cd code-review-assistant
```

**Step 2: Backend Setup**
```bash
cd backend
npm install
cp ../.env.example .env
```

Edit `backend/.env` and configure:
```env
PORT=5000
GEMINI_API_KEY=your_api_key_here  # Get from https://aistudio.google.com/app/apikey
GEMINI_MODEL=gemini-2.5-flash
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/codeReview
USE_MEMORY_DB=true               # Set to false if using real MongoDB
MOCK_AI=false                    # Set to true for testing without API
```

**Step 3: Frontend Setup**
```bash
cd ../frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_BASE=http://localhost:5000/api
```

> **Tip**: Use the `.env.example` file in the root directory as a template.

---

## 🚀 Running the Application

### Option 1: Using Start Script (Recommended)

```bash
bash scripts/start.sh
```

This automatically starts both backend and frontend servers. Access the app at **http://localhost:5173**

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running at `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend running at `http://localhost:5173`

### Testing the API

Run the demo script to test all endpoints with sample data:
```bash
bash scripts/demo.sh
```

This demonstrates file upload, review creation, and retrieval.

---

## 📖 How to Use

### 1️⃣ Upload Your Code

1. Enter a **filename** (e.g., `UserService.js`)
2. Select the **programming language** from the dropdown
3. Paste or type your **source code**
4. Click **"Upload File"**

> 💡 **Tip**: The system automatically detects duplicate files using SHA-256 hashing.

### 2️⃣ Request a Code Review

1. Select a file from the **"Your Files"** list on the left
2. Click **"Run Code Review"** in the Actions panel
3. Wait 5-10 seconds while AI analyzes your code
4. View the comprehensive review in the main panel

### 3️⃣ Analyze the Results

Your review includes:

- **📊 Overall Score** - Quality rating from 0-100
- **📈 Code Metrics** - Complexity, maintainability index, LOC, estimated bugs
- **🔍 Detailed Analysis** - 5 categories (Readability, Modularity, Performance, Security, Best Practices)
- **🐛 Issues Found** - Specific problems with severity levels, code snippets, and suggestions
- **✅ Positive Aspects** - What you're doing well

### 4️⃣ Review History

- All reviews are automatically saved
- Access previous reviews from the **"Recent Reviews"** list
- Click any review to view its details again

---

## 🎨 Understanding Your Review

### Analysis Categories

Each review evaluates your code across 5 dimensions:

| Category | What It Measures | Score Range |
|----------|-----------------|-------------|
| **🔤 Readability** | Naming conventions, code clarity, documentation | 0-10 |
| **🧩 Modularity** | Function/class structure, separation of concerns | 0-10 |
| **⚡ Performance** | Efficiency, bottlenecks, optimization opportunities | 0-10 |
| **🔒 Security** | Vulnerabilities, input validation, secure practices | 0-10 |
| **✨ Best Practices** | Language-specific conventions, design patterns | 0-10 |

### Severity Levels

Issues are categorized by urgency:

- 🔴 **High** - Critical issues requiring immediate attention (security, major bugs)
- 🟡 **Medium** - Important improvements that enhance quality
- 🟢 **Low** - Minor suggestions for refinement

### Code Metrics Explained

- **Complexity** - Cyclomatic complexity (lower is better, aim for < 10)
- **Maintainability Index** - Scale of 0-100 (higher is better, 70+ is good)
- **Lines of Code** - Total lines in the file
- **Estimated Bugs** - Predicted bug density based on complexity
- **Duplication %** - Percentage of repeated code patterns

---

## ⚙️ Configuration

### Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `5000` | ❌ |
| `GEMINI_API_KEY` | Google Gemini API key | - | ✅ (unless MOCK_AI=true) |
| `GEMINI_MODEL` | Gemini model version | `gemini-2.5-flash` | ❌ |
| `NODE_ENV` | Environment mode | `development` | ❌ |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017` | ❌ |
| `USE_MEMORY_DB` | Use in-memory database | `false` | ❌ |
| `MOCK_AI` | Use mock AI responses | `false` | ❌ |

### Frontend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE` | Backend API URL | `http://localhost:5000/api` |

### Development vs Production

**Development Mode:**
```env
USE_MEMORY_DB=true    # No MongoDB installation needed
MOCK_AI=true          # Test without using AI credits
NODE_ENV=development
```

**Production Mode:**
```env
USE_MEMORY_DB=false   # Use real MongoDB
MOCK_AI=false         # Use real Gemini API
NODE_ENV=production
```

---

## 📡 API Reference

### Files

**Upload a code file**
```http
POST /api/files
Content-Type: application/json

{
  "filename": "app.js",
  "language": "javascript",
  "content": "console.log('Hello');"
}
```

**List all files**
```http
GET /api/files
```

### Reviews

**Create a code review**
```http
POST /api/reviews
Content-Type: application/json

{
  "fileId": "507f1f77bcf86cd799439011"
}
```

**Get all reviews**
```http
GET /api/reviews
```

**Get specific review**
```http
GET /api/reviews/:id
```

> 📚 **Full API Documentation**: See [DEMO_INSTRUCTIONS.md](DEMO_INSTRUCTIONS.md) for complete examples.

---

## 🧪 Testing & Development

### Mock AI Mode

Test the application without using Gemini API credits:

```env
MOCK_AI=true
```

This returns static, deterministic review responses perfect for development.

### In-Memory Database

Develop without installing MongoDB:

```env
USE_MEMORY_DB=true
```

Great for rapid prototyping and testing. Data persists only during runtime.

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests (if configured)
cd frontend
npm test
```

### Demo Script

Test all API endpoints:

```bash
bash scripts/demo.sh
```

---

## 🚀 Roadmap & Future Enhancements

### Planned Features
- [ ] **User Authentication** - Multi-user support with workspaces
- [ ] **GitHub Integration** - Automated PR reviews
- [ ] **Code Syntax Highlighting** - Beautiful code display in issues
- [ ] **Export Functionality** - Download reviews as PDF/Markdown
- [ ] **Batch Analysis** - Review multiple files at once
- [ ] **Custom Rules** - Define project-specific review criteria
- [ ] **Team Collaboration** - Share reviews and collaborate
- [ ] **Diff Comparison** - Compare code versions
- [ ] **CI/CD Integration** - Automated reviews in pipelines
- [ ] **Webhook Notifications** - Real-time alerts

### Contributions Welcome!

We welcome contributions! Feel free to:
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests
- 📖 Improve documentation

---

## 🐛 Troubleshooting

### Common Issues

**❌ Backend won't start**
```bash
# Check if port 5000 is in use
lsof -ti:5000

# If using MongoDB, verify it's running
mongod --version

# Or use in-memory mode
USE_MEMORY_DB=true
```

**❌ Frontend can't connect to backend**
- Ensure backend is running at `http://localhost:5000`
- Check `VITE_API_BASE` in `frontend/.env`
- Verify no firewall is blocking the connection

**❌ AI review fails**
- Verify your Gemini API key is valid and active
- Check API quota at [Google AI Studio](https://aistudio.google.com/)
- Try using `MOCK_AI=true` for testing
- Ensure `GEMINI_MODEL` matches your API access (e.g., `gemini-2.5-flash`)

**❌ Dependencies installation fails**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**❌ MongoDB connection issues**
```bash
# Use in-memory database instead
USE_MEMORY_DB=true

# Or verify MongoDB is running
sudo systemctl status mongodb
```

### Getting Help

- 📖 Read the [HOW_TO_RUN.md](HOW_TO_RUN.md) guide
- 🔍 Check existing [GitHub Issues](../../issues)
- 💬 Create a new issue with detailed error messages

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [README.md](README.md) | Main documentation (you are here) |
| [HOW_TO_RUN.md](HOW_TO_RUN.md) | Detailed setup and running guide |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Technical architecture overview |
| [DEMO_INSTRUCTIONS.md](DEMO_INSTRUCTIONS.md) | API testing and demo guide |
| [VISUAL_GUIDE.md](VISUAL_GUIDE.md) | UI/UX walkthrough |

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 🙏 Acknowledgments

Built with these amazing technologies:

- [Google Gemini API](https://ai.google.dev/) - AI-powered code analysis
- [React](https://react.dev/) - UI framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [MongoDB](https://www.mongodb.com/) - Database
- [Express.js](https://expressjs.com/) - Backend framework
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set

---

## 💼 Project Info

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Last Updated**: October 2025

**Built with ❤️ using AI-powered development tools**

---

<div align="center">

### ⭐ If you find this project useful, please consider giving it a star!

[Report Bug](../../issues) · [Request Feature](../../issues) · [View Demo](http://localhost:5173)

</div>
