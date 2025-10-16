# Code Review Assistant - Demo Instructions

## 🎬 How to Demo This Application

### Option 1: Automated Setup (Recommended)

```bash
# 1. Run setup script
bash scripts/setup.sh

# 2. Start both servers
bash scripts/start.sh

# 3. Open browser
# Visit: http://localhost:5173
```

### Option 2: Manual Setup

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Browser:**
```
Open: http://localhost:5173
```

### Option 3: API Demo Only

```bash
# Make sure backend is running first
bash scripts/demo.sh
```

## 📹 Demo Walkthrough

### 1. Upload a Code File (30 seconds)

1. In the left panel, enter filename: `calculator.py`
2. Select language: `Python`
3. Paste this code:
```python
def calculate(a, b, operation):
    if operation == "add":
        return a + b
    elif operation == "subtract":
        return a - b
    elif operation == "multiply":
        return a * b
    elif operation == "divide":
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b
    else:
        raise ValueError("Invalid operation")

# Usage
result = calculate(10, 5, "add")
print(f"Result: {result}")
```
4. Click **Upload File** button
5. File appears in the "Your Files" list below

### 2. Run Code Review (10 seconds)

1. Click on the uploaded file in "Your Files" list
2. In the middle panel, click **Run Code Review** button
3. Watch the loading animation (~2-5 seconds)
4. Review appears in "Recent Reviews" list
5. Review details automatically show in right panel

### 3. Explore Review Details (60 seconds)

Point out these features in the right panel:

**Header:**
- File name at top
- Overall score (0-100) in circular badge
- Summary description

**Code Metrics:**
- 6 metric cards showing:
  - Lines of Code
  - Complexity
  - Maintainability Index
  - Estimated Bugs
  - Duplication Percent

**Issues Section:**
- Each issue shows:
  - Severity badge (High/Medium/Low with colors)
  - Title and description
  - Code snippet where issue occurs
  - Actionable suggestion for fixing
  - Impact assessment

**Positive Aspects:**
- Green checkmarks showing what's done well
- Clear list of good practices found

### 4. Generate Tests (20 seconds)

1. With file still selected, scroll to "Tests" section in middle panel
2. Click **Generate Tests** button
3. Watch AI generate unit tests
4. View generated test code in expandable section
5. Note the test history counter

### 5. Switch Theme (5 seconds)

1. Click theme toggle button (🌙/☀️) in top-right
2. Watch smooth transition between dark and light modes
3. Toggle back to show persistence

### 6. Browse History (15 seconds)

1. Click different files in "Your Files" list
2. Show multiple reviews in "Recent Reviews"
3. Click different reviews to show details update
4. Demonstrate data persistence

## 🎯 Key Points to Highlight

### Technical Excellence
- ✅ Full-stack application (React + Express + MongoDB)
- ✅ Real AI integration (Google Gemini API)
- ✅ Type-safe with TypeScript
- ✅ Modern UI with Tailwind CSS
- ✅ Responsive design (works on mobile)
- ✅ Dark/light theme support
- ✅ Real-time data fetching
- ✅ Error handling and loading states

### User Experience
- ✅ Beautiful, modern interface
- ✅ Intuitive workflow
- ✅ Clear visual feedback
- ✅ Comprehensive review details
- ✅ Actionable suggestions
- ✅ Fast and responsive

### Developer Experience
- ✅ One-command setup
- ✅ One-command start
- ✅ Comprehensive documentation
- ✅ Mock AI mode for testing
- ✅ In-memory database option
- ✅ Clean code architecture

## 📊 Sample Files for Demo

### Python - Fibonacci
```python
def fibonacci(n):
    """Calculate fibonacci number recursively"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

### JavaScript - User Authentication
```javascript
function authenticateUser(username, password) {
  const users = getUsersFromDB();
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return { success: false, message: "User not found" };
  }
  
  if (user.password !== password) {
    return { success: false, message: "Invalid password" };
  }
  
  return { success: true, token: generateToken(user) };
}
```

### TypeScript - API Client
```typescript
class ApiClient {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  async get(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return response.json();
  }
  
  async post(endpoint: string, data: any) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}
```

## 🐛 Troubleshooting During Demo

### Backend Not Starting
- Check if port 5000 is in use: `lsof -i :5000`
- Verify `.env` file exists in backend folder
- Check Node.js version: `node -v` (should be 18+)

### Frontend Not Starting
- Check if port 5173 is in use
- Clear `node_modules` and reinstall
- Check if backend URL is correct in frontend/.env

### Review Generation Fails
- If using real Gemini API, verify API key is valid
- Switch to MOCK_AI=true in backend/.env for demo
- Check internet connection for API calls

### No Data Showing
- Refresh the page
- Check browser console for errors
- Verify backend is running and responding

## ⏱️ Demo Timeline

**Total Demo Time: ~3-5 minutes**

- 0:00-0:30 - Upload file
- 0:30-0:40 - Run review
- 0:40-2:00 - Explore review details
- 2:00-2:20 - Generate tests
- 2:20-2:25 - Switch theme
- 2:25-3:00 - Browse history
- 3:00-5:00 - Q&A and architecture discussion

## 🎥 Recording Tips

1. **Screen Setup**: 
   - Use 1920x1080 resolution
   - Close unnecessary tabs/apps
   - Full screen browser

2. **Audio**:
   - Explain what you're doing as you go
   - Highlight key features
   - Point out technical achievements

3. **Pacing**:
   - Wait for animations to complete
   - Pause on important screens
   - Don't rush through review details

4. **Editing**:
   - Add intro slide with project name
   - Add outro with GitHub link
   - Speed up long waits (AI processing)
   - Add captions for key points

## 📝 Script Template

"Hello! This is the Code Review Assistant, an AI-powered platform for automated code reviews.

Let me show you how it works. First, I'll upload a Python file... [upload file]

Now I'll click 'Run Code Review' to analyze this code with Google's Gemini AI... [click button]

And here's the magic! The AI has analyzed the code and provided a comprehensive review. We can see:
- An overall quality score of 85 out of 100
- Key metrics like complexity and maintainability
- Specific issues with severity levels and actionable fixes
- Positive aspects showing what was done well

Let me generate some tests for this code... [click generate tests]

The AI just wrote complete unit tests for us!

The app also has dark mode... [toggle theme]

And keeps a full history of all reviews... [show history]

This is a full-stack application built with React, TypeScript, Express, MongoDB, and integrated with Google's Gemini API. It features a beautiful modern UI, comprehensive documentation, and is ready for production deployment.

Thank you for watching!"

---

**Ready to Demo!** 🚀
