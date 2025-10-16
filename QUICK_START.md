# ⚡ Code Review Assistant - Quick Start Guide

## 🎯 Goal
Get the application running in **under 5 minutes**.

---

## Step 1: Open Terminal
Navigate to the project directory:
```bash
cd /home/nexo/code-review-assistant
```

---

## Step 2: Run Setup (First Time Only)
```bash
bash scripts/setup.sh
```

**What this does:**
- ✅ Checks Node.js is installed (18+)
- ✅ Installs backend dependencies
- ✅ Installs frontend dependencies
- ✅ Creates configuration files

**Expected output:**
```
🚀 Code Review Assistant - Setup Script
========================================
✅ Node.js v20.x.x detected
✅ npm 10.x.x detected
📦 Setting up backend...
📦 Setting up frontend...
🎉 Setup Complete!
```

---

## Step 3: Start the Application
```bash
bash scripts/start.sh
```

**What this does:**
- ✅ Starts backend server (port 5000)
- ✅ Starts frontend server (port 5173)
- ✅ Opens split terminal view (if tmux available)

**Expected output:**
```
🚀 Starting Code Review Assistant...
⚙️ Using in-memory MongoDB
✅ MongoDB connected
🚀 API listening on http://localhost:5000

  VITE v7.x.x  ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

---

## Step 4: Open Browser
Go to:
```
http://localhost:5173
```

**You should see:**
- Beautiful purple-themed dashboard
- Three-column layout
- Upload form on the left
- Actions in the middle
- Review details on the right

---

## Step 5: Test It Out

### Upload Code
1. Enter filename: `test.js`
2. Select language: `JavaScript`
3. Paste this code:
```javascript
function greet(name) {
  console.log("Hello " + name);
}
greet("World");
```
4. Click **Upload File**

### Run Review
1. Click on `test.js` in "Your Files" list
2. Click **Run Code Review** button
3. Wait 2-3 seconds
4. See review results in right panel!

---

## 🎉 Success!

You should now see:
- ✅ Overall score (0-100)
- ✅ Code metrics
- ✅ Issues found (if any)
- ✅ Positive aspects
- ✅ Suggestions for improvement

---

## 🆘 Problems?

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# If yes, kill it
kill -9 <PID>

# Try again
bash scripts/start.sh
```

### Frontend won't start
```bash
# Clear cache and retry
cd frontend
rm -rf node_modules
npm install
cd ..
bash scripts/start.sh
```

### Can't see data
- Refresh browser (Ctrl+R)
- Check both servers are running
- Check browser console (F12) for errors

---

## 📚 Next Steps

- **Full guide**: See [HOW_TO_RUN.md](HOW_TO_RUN.md)
- **Features**: See [README.md](README.md)
- **Demo**: Run `bash scripts/demo.sh`
- **Architecture**: See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

## 🛑 Stop the Application

Press `Ctrl+C` in the terminal to stop both servers.

Or if using tmux:
```bash
tmux kill-session -t code-review-assistant
```

---

**That's it! Enjoy using the Code Review Assistant! 🚀**
