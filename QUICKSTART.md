# 🚀 Quick Start Guide

Complete step-by-step guide to get the Voice Controlled Web Application running in minutes!

## ✅ Requirements Check

Before starting, ensure you have:
- [ ] Windows 10/11 (or macOS/Linux)
- [ ] Node.js installed (v14+)
- [ ] Google Chrome browser
- [ ] Terminal/Command Prompt access
- [ ] ~50MB free disk space

## 📥 Installation (5 minutes)

### Step 1: Open Command Prompt
Press `Win + R`, type `cmd`, and press Enter.

```cmd
cd d:\SDT-PROJECT
```

### Step 2: Install Dependencies
```cmd
npm install
```

Wait for it to complete. You should see:
```
added 50 packages in 2s
```

### Step 3: Start the Server
```cmd
npm start
```

You should see:
```
✅ Server is running on: http://localhost:5000
```

### Step 4: Open in Browser
Open Google Chrome and go to:
```
http://localhost:5000
```

**🎉 Done! The app is ready to use!**

---

## 🎤 First Time Usage

### Allow Microphone Access
1. Chrome will show a permission dialog
2. Click "Allow" for microphone access
3. You're good to go!

### Test a Command
1. Click the big microphone button 🎤
2. Say "open google"
3. Watch as Google opens in a new tab!

---

## 🔧 Common Issues & Quick Fixes

### "Port 5000 is already in use"
**Solution:** Change the port
```cmd
set PORT=5001
npm start
```
Then visit `http://localhost:5001`

### "npm command not found"
**Solution:** Node.js not installed
- Download from https://nodejs.org/
- Install and restart your terminal

### "Speech recognition not working"
**Solution:** 
1. Check microphone permissions in Chrome
2. Try a different browser (Edge, Chromium)
3. Check system microphone settings (Settings > Privacy > Microphone)

### "Microphone button not responding"
**Solution:**
1. Refresh the page (Ctrl + R)
2. Try in Incognito mode (Ctrl + Shift + I)
3. Clear browser cache (Ctrl + Shift + Delete)

---

## 📊 Project Files Summary

| File | Purpose | Size |
|------|---------|------|
| `server.js` | Backend server | 8KB |
| `public/index.html` | Frontend structure | 6KB |
| `public/style.css` | Styling & animations | 12KB |
| `public/script.js` | Voice control logic | 18KB |
| `package.json` | Dependencies | 1KB |
| `data/history.json` | Command history | 2KB |

**Total:** ~47KB

---

## 📝 Example Commands

### English Commands
```
"open google"               → Open google.com
"search for web development" → Search on Google
"play music"                → Open YouTube Music
"dark mode"                 → Enable dark theme
"change background color"   → Random background color
```

### Tamil Commands
```
"கூகுள் திற"             → Open Google
"இசை வாசி"              → Play Music
"நிறம் மாற்று"           → Change color
```

---

## 🌟 Cool Tricks

### 1. Continuous Listening
Check "Continuous Listening Mode" to keep the app listening!

### 2. Click Commands
Can't speak? Click any command card to simulate voice!

### 3. Manual Voice Typing
Type or paste text in the "Voice Typing" box and press Enter!

### 4. Dark Mode
Click the moon/sun icon to toggle dark/light theme!

### 5. Check History
All your commands are saved below with timestamps!

---

## 📱 Mobile Testing

The app works on mobile browsers too!
1. Find your computer's IP address:
   ```cmd
   ipconfig
   ```
   Look for "IPv4 Address" (usually 192.168.x.x)

2. On mobile, visit:
   ```
   http://192.168.x.x:5000
   ```

3. Grant microphone permission when asked

---

## 🔌 API Testing

### Test with PowerShell

Get command history:
```powershell
Invoke-WebRequest http://localhost:5000/history | ConvertFrom-Json
```

Get statistics:
```powershell
Invoke-WebRequest http://localhost:5000/stats | ConvertFrom-Json
```

---

## 🛑 Stopping the Server

To stop the server, press in the terminal:
```
Ctrl + C
```

You'll see:
```
👋 Server shutting down gracefully...
```

---

## 📚 Next Steps

1. **Explore Features** - Try all voice commands
2. **Customize** - Edit colors in `public/style.css`
3. **Add Commands** - Modify `public/script.js` to add new voice commands
4. **Set Up AI** - Replace AI response generator in `server.js` with a real API
5. **Deploy** - Host on services like Heroku, Vercel, or AWS

---

## 💡 Pro Tips

- **Use Chrome DevTools** (F12) to debug issues
- **Check Console** for error messages
- **Clear LocalStorage** if commands stop working: F12 > Application > Local Storage
- **Test Microphone** first with Chrome's built-in app
- **Speak Clearly** for better recognition
- **Use Simple Commands** first before complex ones

---

## 📞 Getting Help

1. **Check Troubleshooting** in full README.md
2. **Review Code Comments** - They explain everything
3. **Test in Chrome** - Best browser for Web Speech API
4. **Check Terminal Output** - Shows detailed error messages

---

## 🎯 Learning Path

1. **Week 1:** Get familiar with the app
2. **Week 2:** Understand the code structure
3. **Week 3:** Add new commands
4. **Week 4:** Integrate with real AI API

---

## ✨ Bonus Features to Try

- Click theme toggle to switch modes (4 times quickly!)
- Try Tamil commands if you speak the language
- Open DevTools to see real-time API calls
- Check `/data` folder to see saved history
- Edit history.json directly and refresh to see changes

---

## 🎓 Educational Value

This project teaches you:
- Web Speech API usage
- Express.js server creation
- REST API design
- Data persistence with JSON
- Event handling in JavaScript
- CSS animations & glassmorphism design
- CORS and middleware basics

---

## 📝 Notes

- Data is stored locally (both browser and server)
- No external database required
- No user authentication needed
- Perfect for learning & prototyping
- Ready to extend for production use

---

**Ready? Start with Step 1 above! 🚀**

For detailed documentation, see [README.md](README.md)
