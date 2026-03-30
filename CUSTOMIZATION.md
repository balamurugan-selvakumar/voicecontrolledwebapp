# ⚙️ Configuration & Customization Guide

Advanced guide for customizing and extending the Voice Controlled Web Application.

## 🎨 UI Customization

### Change Primary Colors

Edit `public/style.css`:

```css
:root {
    --primary-color: #7c3aed;      /* Main gradient color */
    --secondary-color: #3b82f6;    /* Secondary gradient */
    --accent-color: #06b6d4;       /* Accent highlights */
}
```

**Color Suggestions:**
```css
/* Purple & Blue (Current) */
--primary-color: #7c3aed;
--secondary-color: #3b82f6;

/* Pink & Red */
--primary-color: #ec4899;
--secondary-color: #f43f5e;

/* Green & Teal */
--primary-color: #10b981;
--secondary-color: #06b6d4;

/* Orange & Yellow */
--primary-color: #f97316;
--secondary-color: #eab308;
```

### Customize Button Size

In `public/style.css`, modify `.mic-button`:

```css
.mic-button {
    width: 150px;    /* Increase from 120px */
    height: 150px;   /* Increase from 120px */
    font-size: 3.5rem;  /* Increase from 3rem */
}
```

### Change Font

In `public/style.css`:

```css
html, body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    /* Change to: */
    font-family: 'Arial', sans-serif;
    /* or: */
    font-family: 'Comic Sans MS', cursive;
    /* or: */
    font-family: 'Monaco', monospace;
}
```

### Customize Animation Speed

In `public/style.css`:

```css
@keyframes pulse-animation {
    0% {
        box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7);
    }
    70% {
        box-shadow: 0 0 0 30px rgba(124, 58, 237, 0);  /* Change 30px to more/less */
    }
}
```

---

## 🗣️ Adding New Voice Commands

### Step 1: Add to Commands Database

Edit `public/script.js`:

```javascript
const commands = {
    'en-US': [
        // Add your new command
        { 
            pattern: /tell me a joke/i,     // What to listen for
            action: 'tellJoke',              // Function name to execute
            emoji: '😂',                     // Icon for UI
            name: 'Tell Joke',              // Display name
            description: 'Get a random joke' // Description
        }
    ]
};
```

### Step 2: Add Action Handler

In `public/script.js`, add to the `executeCommand()` function:

```javascript
case 'tellJoke':
    const jokes = [
        "Why did the programmer quit his job? Because he didn't get arrays!",
        "Why do programmers prefer dark mode? Because light attracts bugs!"
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    speak(joke, language);
    break;
```

### Step 3: Test

1. Save the file
2. Refresh browser
3. Say "tell me a joke"
4. The app should respond!

---

## 🌍 Adding Language Support

### Step 1: Add Commands

Edit `public/script.js`:

```javascript
const commands = {
    'en-US': [ /* ... existing ... */ ],
    'ta-IN': [ /* ... existing ... */ ],
    'hi-IN': [  // NEW: Add Hindi support
        { 
            pattern: /गूगल\s+खोलो/i,
            action: 'openGoogle',
            emoji: '🌐',
            name: 'गूगल खोलो',
            description: 'गूगल खोलें'
        }
    ]
};
```

### Step 2: Update Language Select

Edit `public/index.html`:

```html
<select id="language">
    <option value="en-US">English</option>
    <option value="ta-IN">Tamil (தமிழ்)</option>
    <option value="hi-IN">Hindi (हिन्दी)</option>
</select>
```

### Step 3: Add Voice Responses

Edit `public/script.js` in `generateAIResponse()`:

```javascript
const responses = {
    'en-US': { /* ... */ },
    'ta-IN': { /* ... */ },
    'hi-IN': {  // NEW: Hindi responses
        greetings: [
            'नमस्ते! मैं आপकी मदद कर सकता हूँ',
            'आप मुझसे क्या चाहते हैं?'
        ],
        help: [
            'मैं वेबसाइटें खोल सकता हूँ',
            'आप मेरे साथ बोलकर नियंत्रण कर सकते हैं'
        ]
    }
};
```

---

## 🤖 Integration with AI APIs

### Option 1: OpenAI API

Edit `server.js`:

```javascript
const openaiApiKey = process.env.OPENAI_API_KEY;

async function generateAIResponse(command, language) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { 
                        role: 'user', 
                        content: `Respond in ${language === 'ta-IN' ? 'Tamil' : 'English'}: ${command}`
                    }
                ],
                max_tokens: 100,
                temperature: 0.7
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI API error:', error);
        return 'I encountered an error';
    }
}
```

Set environment variable:
```cmd
set OPENAI_API_KEY=sk-your-api-key-here
npm start
```

### Option 2: Google Gemini API

Edit `server.js`:

```javascript
async function generateAIResponse(command, language) {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: command
                        }]
                    }]
                })
            }
        );

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Gemini API error:', error);
        return 'I encountered an error';
    }
}
```

---

## 💾 Database Integration

### Switch from JSON to MongoDB

Install MongoDB driver:
```cmd
npm install mongodb
```

Edit `server.js`:

```javascript
const { MongoClient } = require('mongodb');

const CONNECTION_URL = process.env.MONGODB_URI;
const DATABASE_NAME = 'voice-app';

async function connectDB() {
    this.client = new MongoClient(CONNECTION_URL, { useUnifiedTopology: true });
    await this.client.connect();
    this.db = this.client.db(DATABASE_NAME);
}

app.get('/history', async (req, res) => {
    const collection = this.db.collection('history');
    const history = await collection.find({}).toArray();
    res.json({ success: true, history });
});
```

---

## 🔐 Adding Authentication

Install authentication package:
```cmd
npm install jsonwebtoken bcryptjs
```

Edit `server.js`:

```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Validate credentials (simplified)
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Middleware to verify token
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token' });
    }
    
    try {
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
}

// Protected route
app.get('/history', verifyToken, (req, res) => {
    // ... existing code
});
```

---

## 📊 Adding Data Analytics

Edit `server.js`:

```javascript
app.get('/analytics', (req, res) => {
    const historyData = readHistoryFile();
    
    const analytics = {
        totalCommands: historyData.history.length,
        commandsByType: {},
        successRate: 0,
        mostUsedCommand: null,
        timelineData: {}
    };

    // Count by command type
    historyData.history.forEach(item => {
        const cmd = item.command.split(' ')[0];
        analytics.commandsByType[cmd] = (analytics.commandsByType[cmd] || 0) + 1;
    });

    // Calculate success rate
    const successful = historyData.history.filter(h => h.status === 'success').length;
    analytics.successRate = (successful / analyticstotalCommands) * 100;

    // Find most used
    const entries = Object.entries(analytics.commandsByType);
    if (entries.length > 0) {
        analytics.mostUsedCommand = entries.reduce((a, b) => 
            a[1] > b[1] ? a : b
        )[0];
    }

    res.json({ success: true, analytics });
});
```

---

## 🚀 Performance Optimization

### Enable Compression

```cmd
npm install compression
```

In `server.js`:
```javascript
const compression = require('compression');
app.use(compression());
```

### Add Response Caching

```javascript
app.get('/history', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300');
    // ... rest of code
});
```

### Optimize Frontend

In `public/script.js`:
```javascript
// Debounce microphone button clicks
let debounceTimer;
micButton.addEventListener('click', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        toggleListening();
    }, 100);
});
```

---

## 🌐 Deployment Configuration

### Heroku Deployment

1. Install Heroku CLI
2. Create `Procfile`:
```
web: node server.js
```

3. Push to Heroku:
```cmd
heroku create your-app-name
git push heroku main
```

### Environment Variables

Create `.env` file:
```
PORT=5000
NODE_ENV=production
OPENAI_API_KEY=sk-...
MONGODB_URI=mongodb://...
```

In `server.js`:
```javascript
require('dotenv').config();
const PORT = process.env.PORT || 5000;
```

---

## 🔗 Webhook Integration

Add webhook support:

```javascript
app.post('/webhook', (req, res) => {
    const { event, data } = req.body;
    
    switch(event) {
        case 'command_executed':
            // Handle command execution event
            break;
        case 'error_occurred':
            // Handle error event
            break;
    }
    
    res.json({ success: true, received: true });
});
```

---

## 📱 PWA Configuration

Add `manifest.json`:

```json
{
  "name": "Voice Control App",
  "short_name": "Voice Control",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

In `public/index.html`:
```html
<link rel="manifest" href="manifest.json">
```

Register service worker:
```javascript
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
```

---

## 🧪 Testing Setup

Install testing framework:
```cmd
npm install jest supertest
```

Create `test.js`:
```javascript
const request = require('supertest');
const app = require('./server');

describe('GET /history', () => {
    it('should return command history', async () => {
        const res = await request(app).get('/history');
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
});
```

Run tests:
```cmd
npm test
```

---

## 📝 Environment Setup

### Development
```cmd
npm install
npm start
```

### Production
```cmd
npm install --production
SET NODE_ENV=production
npm start
```

### Docker (Optional)

Create `Dockerfile`:
```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Build and run:
```cmd
docker build -t voice-app .
docker run -p 5000:5000 voice-app
```

---

## 🔍 Monitoring & Logging

Add logging:

```javascript
const fs = require('fs');

function log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${level}: ${message}`;
    console.log(logEntry);
    
    // Also write to file
    fs.appendFileSync('app.log', logEntry + '\n');
}

app.listen(PORT, () => {
    log(`Server started on port ${PORT}`, 'INFO');
});

app.use((error, req, res, next) => {
    log(`Error: ${error.message}`, 'ERROR');
    res.status(500).json({ success: false, message: error.message });
});
```

---

## 🛡️ Security Hardening

### Add Security Headers

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### Rate Limiting

```cmd
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);
```

### Input Validation

```javascript
function validateCommand(cmd) {
    if (typeof cmd !== 'string') return false;
    if (cmd.length > 500) return false;
    return true;
}
```

---

**For more help, check README.md or QUICKSTART.md**
