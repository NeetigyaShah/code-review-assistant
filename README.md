# Code Review Assistant 🚀

An AI-powered code review platform that analyzes your code for readability, modularity, best practices, and potential bugs using Google's Gemini API.

![Code Review Assistant](https://img.shields.io/badge/AI-Powered-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![React](https://img.shields.io/badge/React-TypeScript-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

> **⚡ Quick Start**: Run `bash scripts/setup.sh` then `bash scripts/start.sh`. Open http://localhost:5173

> **📖 Complete Guide**: See [HOW_TO_RUN.md](HOW_TO_RUN.md) for detailed setup, usage, and troubleshooting

> **📚 More Docs**: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | [VISUAL_GUIDE.md](VISUAL_GUIDE.md) | [DEMO_INSTRUCTIONS.md](DEMO_INSTRUCTIONS.md) | [DELIVERABLES_CHECKLIST.md](DELIVERABLES_CHECKLIST.md)

## ✨ Features

- 🤖 **AI-Powered Analysis** - Leverages Google Gemini API for intelligent code review
- 📊 **Comprehensive Metrics** - Code complexity, maintainability index, and more
- 🐛 **Issue Detection** - Identifies bugs, security issues, and code smells
- ✅ **Best Practices** - Suggests improvements for readability and modularity
- 🧪 **Test Generation** - Automatically generates unit tests for your code
- 📈 **Review Dashboard** - Beautiful UI to view and manage code reviews
- 🌓 **Dark/Light Mode** - Comfortable viewing in any environment
- 💾 **Review History** - Store and access past reviews

## 🎯 Tech Stack

### Backend
- **Node.js** + **Express** - REST API server
- **MongoDB** + **Mongoose** - Database for storing files and reviews
- **Google Gemini API** - AI-powered code analysis
- **Zod** - Request validation
- **Multer** - File upload handling

### Frontend
- **Vite** + **React** + **TypeScript** - Modern frontend framework
- **Tailwind CSS** - Utility-first styling
- **React Query** - Data fetching and caching
- **Lucide React** - Beautiful icons
- **Zustand** - State management (optional)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB installed (optional - can use in-memory DB)
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### One-Command Setup

```bash
bash scripts/setup.sh
```

This will:
- Check Node.js version
- Install all dependencies
- Create configuration files
- Guide you through next steps

### Manual Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd code-review-assistant
```

2. **Setup Backend**
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/codeReview
USE_MEMORY_DB=true
MOCK_AI=false
GEMINI_MODEL=gemini-1.5-pro
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_BASE=http://localhost:5000/api
```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173`

### Quick Start Script

For convenience, use the start script:
```bash
bash scripts/start.sh
```

This will start both servers in a tmux session.

### API Demo

Test the API directly:
```bash
bash scripts/demo.sh
```

This demonstrates all API endpoints with sample data.

## 📖 Usage Guide

### 1. Upload Code File
- Enter filename (e.g., `app.js`)
- Select programming language
- Paste your source code
- Click "Upload File"

### 2. Run Code Review
- Select a file from "Your Files" list
- Click "Run Code Review" button
- Wait for AI analysis (usually 5-10 seconds)
- View detailed review in the right panel

### 3. View Review Details
- **Overall Score** - Quality score out of 100
- **Code Metrics** - Complexity, maintainability, lines of code, etc.
- **Issues Found** - Bugs, security issues, code smells with suggestions
- **Positive Aspects** - What's done well in the code

### 4. Generate Tests
- Select a file
- Click "Generate Tests"
- View AI-generated unit tests
- Copy and use in your project

## 🎨 Features Breakdown

### Code Analysis Categories
- **Readability** - Naming conventions, code clarity
- **Modularity** - Function/class structure, separation of concerns
- **Performance** - Efficiency, potential bottlenecks
- **Security** - Vulnerability detection, input validation
- **Best Practices** - Language-specific conventions

### Issue Severity Levels
- 🔴 **High** - Critical issues requiring immediate attention
- 🟡 **Medium** - Important improvements needed
- 🟢 **Low** - Minor suggestions for enhancement

## 🔧 Configuration Options

### Backend Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `GEMINI_API_KEY` | Google Gemini API key | Required |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017` |
| `USE_MEMORY_DB` | Use in-memory MongoDB | `false` |
| `MOCK_AI` | Use mock AI responses | `false` |
| `GEMINI_MODEL` | Gemini model to use | `gemini-1.5-pro` |

### Frontend Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE` | Backend API URL | `http://localhost:5000/api` |

## 📦 API Endpoints

### Files
- `POST /api/files` - Upload a code file
- `GET /api/files` - List all uploaded files

### Reviews
- `POST /api/reviews` - Create a new review for a file
- `GET /api/reviews` - List all reviews
- `GET /api/reviews/:id` - Get review details

### Tests
- `POST /api/tests` - Generate tests for a file
- `GET /api/tests?fileId=<id>` - Get tests for a file

## 🎥 Demo Video

[Link to demo video will be added here]

## 📝 Development Notes

### Running in Production
1. Set `USE_MEMORY_DB=false`
2. Set `MOCK_AI=false`
3. Provide a real MongoDB URI
4. Build frontend: `npm run build`
5. Use a process manager like PM2

### Testing with Mock Data
Set `MOCK_AI=true` in backend `.env` to get deterministic responses without using Gemini API credits.

### In-Memory Database
Set `USE_MEMORY_DB=true` for quick local development without installing MongoDB.

## 🚧 Future Enhancements

- [ ] User authentication and workspaces
- [ ] Code syntax highlighting in issue snippets
- [ ] Export reviews as PDF/Markdown
- [ ] Batch file analysis
- [ ] Custom review rules and templates
- [ ] Integration with GitHub/GitLab
- [ ] Code diff comparisons
- [ ] Team collaboration features
- [ ] API rate limiting
- [ ] Webhook notifications

## 🐛 Troubleshooting

**Backend won't start:**
- Check if MongoDB is running (or use `USE_MEMORY_DB=true`)
- Verify GEMINI_API_KEY is valid

**Frontend can't connect to backend:**
- Ensure backend is running on port 5000
- Check VITE_API_BASE in frontend/.env

**AI review fails:**
- Verify Gemini API key is active
- Check API quota limits
- **Note**: The Gemini API model names may vary. If you get a 404 error, set `MOCK_AI=true` for testing, or update `GEMINI_MODEL` to match your API access (e.g., `gemini-1.5-flash-latest`, `gemini-1.5-pro-latest`)
- Try MOCK_AI=true for testing

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- React and Tailwind CSS communities
- All open-source contributors

---

**Built with ❤️ using AI-powered tools**
