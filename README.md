# 🎤 Voice Controlled Web Application

A complete, production-ready voice-controlled web application built with **HTML, CSS, JavaScript, and Node.js/Express** that uses the **Web Speech API** for speech recognition and synthesis.

## ✨ Features

### Core Features
- 🎤 **Microphone Button** - Start/stop listening with animated button
- 📝 **Real-time Speech Recognition** - See recognized speech as you speak
- 🎯 **Voice Commands** - Execute pre-defined commands using voice
- 🔄 **Continuous Listening Mode** - Auto-restart recognition after each command
- 📤 **Voice Typing** - Voice-to-text input field
- 📋 **Command History** - Track all executed commands with timestamps

### Voice Commands (English)
```
"open google"          → Opens Google
"open youtube"         → Opens YouTube
"open github"          → Opens GitHub
"search for [query]"   → Search on Google
"play music"           → Open YouTube Music
"change background color" → Change background to random color
"dark mode"            → Enable dark theme
"light mode"           → Enable light theme
"what is the time"     → Speak current time
"weather"              → Open weather information
```

### Voice Commands (Tamil - தமிழ்)
```
"கூகுள் திற"        → Open Google
"யூடியூப் திற"      → Open YouTube
"இசை வாசி"         → Play Music
"நிறம் மாற்று"      → Change background color
"இருள் முறை"        → Dark Mode
"வெளிச்சம் முறை"   → Light Mode
```

### Advanced Features
- 🌍 **Multilingual Support** - English and Tamil commands
- 🎨 **Modern UI Design** - Glassmorphism with gradient effects
- 🌙 **Dark & Light Mode** - Theme toggle with localStorage persistence
- 🤖 **AI Fallback** - Smart responses for unrecognized commands
- 📊 **Usage Analytics** - Statistics and history tracking
- ⚙️ **Settings Management** - Persist user preferences
- 🔊 **Voice Synthesis** - Hear command responses
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Error Handling** - Graceful handling of unsupported browsers

### Backend Features
- 📁 **JSON File Storage** - No database required
- 🔗 **RESTful API Endpoints** - Clean API design
- 📊 **Statistics & Analytics** - Track command usage
- ⚙️ **Settings API** - User preferences management
- 🤖 **AI Response Generator** - Rule-based responses (extensible)

## 📋 Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Google Chrome** (for best Web Speech API support)
- **Internet connection** (for external links like Google, YouTube)

## 📦 Installation

### Step 1: Clone or Download the Project

```bash
# If you have git installed
git clone <repository-url>
cd SDT-PROJECT

# Or, if you downloaded it, navigate to the project folder
cd d:\SDT-PROJECT
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- **express** - Web framework
- **cors** - Cross-Origin Resource Sharing

### Step 3: Verify Installation

Check that `node_modules` folder was created:
```bash
dir        # On Windows
```

## 🚀 Running the Application

### Start the Server

```bash
npm start
```

You should see output like:
```
╔════════════════════════════════════════════╗
║  Voice Controlled Web Application Server   ║
╚════════════════════════════════════════════╝

✅ Server is running on: http://localhost:5000
📁 Data directory: d:\SDT-PROJECT\data

🎤 Open http://localhost:5000 in your browser to start using the app

📊 Available Endpoints:
   GET  /history        - Fetch command history
   POST /command        - Add new command
   GET  /commands       - Get command statistics
   GET  /settings       - Get user settings
   POST /settings       - Update user settings
   POST /ai-response    - Get AI response
   GET  /stats          - Get usage statistics
```

### Step 2: Open in Browser

Open your web browser and navigate to:
```
http://localhost:5000
```

The application should load with all interactive features ready.

## 📖 How to Use

### Basic Usage

1. **Start Listening**
   - Click the microphone button (🎤)
   - Speak a command clearly
   - The app will recognize and execute it

2. **Control the App**
   - Use voice commands from the available list
   - View recognized speech in real-time
   - See command history below

3. **Switch Language**
   - Select language from the dropdown menu
   - Commands will change to the selected language
   - Voice synthesis will respond in the selected language

4. **Toggle Dark Mode**
   - Click the theme icon (🌙/☀️) in the header
   - Theme preference is saved automatically

### Advanced Features

**Continuous Listening Mode**
- Check "Continuous Listening Mode" to auto-restart recognition
- Perfect for hands-free operation

**Voice Typing**
- Recognized text appears in the "Voice Typing" input
- Edit text manually if needed
- Press Enter to execute the command

**Command History**
- View all executed commands with timestamps
- Clear history with "Clear History" button
- Shows success/error status for each command

**Command Suggestions**
- Click any command card to simulate that command
- Great for testing without speaking

## 🛠️ Project Structure

```
SDT-PROJECT/
├── public/                    # Frontend files
│   ├── index.html            # Main HTML file
│   ├── style.css             # Styling with glassmorphism & gradients
│   └── script.js             # Frontend JavaScript
├── data/                     # Backend data storage
│   ├── history.json          # Command history
│   ├── commands.json         # Command statistics
│   └── settings.json         # User settings
├── server.js                 # Express backend server
├── package.json              # Node.js dependencies
└── README.md                 # This file
```

## 📡 API Endpoints

All endpoints accessible at `http://localhost:5000`

### GET /history
Fetch all command history
```bash
curl http://localhost:5000/history
```

**Response:**
```json
{
  "success": true,
  "history": [
    {
      "command": "open google",
      "language": "en-US",
      "status": "success",
      "timestamp": "2026-03-29T10:15:30.000Z"
    }
  ],
  "total": 1
}
```

### POST /command
Add a new command to history
```bash
curl -X POST http://localhost:5000/command \
  -H "Content-Type: application/json" \
  -d '{"command":"open google","language":"en-US","status":"success"}'
```

**Request Body:**
```json
{
  "command": "open google",
  "language": "en-US",
  "status": "success",
  "timestamp": "2026-03-29T10:15:30.000Z"
}
```

### GET /stats
Get usage statistics
```bash
curl http://localhost:5000/stats
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalCommands": 10,
    "successCount": 8,
    "errorCount": 2,
    "languages": {
      "en-US": 8,
      "ta-IN": 2
    }
  }
}
```

### GET /commands
Get command statistics
```bash
curl http://localhost:5000/commands
```

### GET /settings
Get user settings
```bash
curl http://localhost:5000/settings
```

### POST /settings
Update user settings
```bash
curl -X POST http://localhost:5000/settings \
  -H "Content-Type: application/json" \
  -d '{"language":"ta-IN","theme":"dark"}'
```

### GET /history/clear
Clear all history
```bash
curl http://localhost:5000/history/clear
```

## 🌐 Supported Browsers

| Browser | Support | Notes |
|---------|---------|-------|
| **Google Chrome** | ✅ Full | Best support for Web Speech API |
| **Chromium** | ✅ Full | Same engine as Chrome |
| **Microsoft Edge** | ✅ Full | Chromium-based |
| **Firefox** | ⚠️ Partial | Limited Speech Recognition support |
| **Safari** | ⚠️ Partial | Limited support on macOS/iOS |
| **IE** | ❌ Not Supported | No Web Speech API support |

**Recommended:** Use **Google Chrome** for the best experience!

## 🔧 Troubleshooting

### "Microphone not working"
- Check browser permissions: Click the 🔒 icon in address bar
- Allow microphone access for localhost:5000
- Try refreshing the page (Ctrl+R)

### "Speech Recognition Error: network"
- Check your internet connection
- The Web Speech API needs internet to work

### "Server not starting"
- Check if port 5000 is already in use
- Try changing PORT in server.js to another port (e.g., 5001)

### "Commands not recognized"
- Speak clearly and at a normal pace
- Check if correct language is selected
- Make sure microphone is working (test in another app)

### "No data showing in history"
- Try refreshing the page
- Check browser's localStorage (DevTools > Application > Local Storage)
- Ensure the `/data` folder has write permissions

### "Console errors"
- Open DevTools (F12) and check the Console tab
- Most errors show with helpful messages
- Check server logs in the terminal

## 📝 Customization

### Adding New Commands

Edit `public/script.js` and add to the `commands` object:

```javascript
const commands = {
    'en-US': [
        // Add your new command here
        { 
            pattern: /your pattern/i, 
            action: 'yourAction',
            emoji: '📌',
            name: 'Your Command',
            description: 'What your command does'
        }
    ]
};
```

Then add the action in `executeCommand()` function:
```javascript
case 'yourAction':
    // Your code here
    break;
```

### Changing Colors & Theme

Edit `public/style.css`:
```css
:root {
    --primary-color: #7c3aed;      /* Change gradient colors */
    --secondary-color: #3b82f6;
    --accent-color: #06b6d4;
    /* ... other colors */
}
```

### AI Integration

To use real AI APIs, modify the `generateAIResponse()` function in `server.js`:

```javascript
// Example with OpenAI API
const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    // ... rest of request
});
```

## 🔒 Security Considerations

- **No sensitive data stored** - Only command history stored locally
- **CORS enabled** - Requests from browser are allowed
- **Input validation** - All user inputs are validated
- **Error handling** - No sensitive errors exposed to clients

For production:
- Use HTTPS instead of HTTP
- Implement authentication if needed
- Add request rate limiting
- Use environment variables for configuration
- Implement data encryption for user data

## 📊 Performance Tips

- Commands are processed in-browser when possible
- History is paginated to avoid large DOM updates
- IndexedDB can be used for larger datasets
- Consider adding service workers for offline support

## 🤝 Contributing

Want to improve the app? Here's how:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support

For issues, questions, or suggestions:
- Check the Troubleshooting section above
- Review the code comments for detailed explanations
- Test in Google Chrome for best results

## 🎓 Learning Resources

Learn more about the technologies used:
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Express.js Documentation](https://expressjs.com/)
- [CSS Glassmorphism](https://glassmorphism.com/)
- [JavaScript Promises & Async/Await](https://javascript.info/async)

## 📈 Future Enhancements

Potential features for future versions:
- 🗣️ Multiple voice profiles
- 📊 Advanced analytics dashboard
- 🤖 Machine learning for command prediction
- 🔌 Third-party API integrations
- 🎮 Gaming features with voice control
- 📱 Progressive Web App (PWA)
- 🔐 User authentication & cloud sync
- 🌐 More language support

## 🙏 Acknowledgments

- Web Speech API by W3C
- Express.js community
- Glassmorphism design inspiration

---

**Made with ❤️ for voice control enthusiasts**

Last Updated: March 29, 2026
Version: 1.0.0
