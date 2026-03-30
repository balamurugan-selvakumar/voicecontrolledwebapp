# 📁 Project Architecture & File Structure

Complete breakdown of the Voice Controlled Web Application project.

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Browser (Google Chrome)                │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐   │
│  │         Frontend (Public Folder)                │   │
│  │  ┌──────────────┐  ┌──────────┐  ┌──────────┐   │   │
│  │  │  HTML/CSS    │  │ JavaScript│  │ Web APIs│   │   │
│  │  │              │  │           │  │         │   │   │
│  │  │ - DOM        │  │ - Voice   │  │- Speech │   │   │
│  │  │ - Layout     │  │   Control │  │- Storage│   │   │
│  │  │ - Styling    │  │ - Commands│  │- Fetch  │   │   │
│  │  │ - Theme      │  │ - History │  │         │   │   │
│  │  └──────────────┘  └──────────┘  └──────────┘   │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────┘
                       │
                    HTTP/CORS
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
    ┌──────────────┐         ┌──────────────┐
    │  JavaScript  │         │   Express    │
    │  (Frontend)  │         │   (Backend)  │
    └──────────────┘         └──────────────┘
          │                         │
          │                    ┌────┴────┐
          │                    │          │
          │                    ▼          ▼
          │             ┌────────────┬─────────────┐
          │             │ JSON Files │ API Routes  │
          │             │            │             │
          │             │ - history  │ - /history  │
          │             │ - commands │ - /command  │
          │             │ - settings │ - /settings │
          │             │            │ - /stats    │
          │             └────────────┴─────────────┘
          │                         │
          └─────────────────────────┘
                    Data Flow
```

## 📂 Directory Tree

```
SDT-PROJECT/
│
├── 📄 server.js                    # Express backend server (main backend file)
│   ├── API Routes Setup
│   ├── File I/O Functions
│   ├── Data Validation
│   ├── Error Handling
│   └── AI Response Generator
│
├── 📄 package.json                 # Node.js dependencies
│   ├── express@4.18.2
│   └── cors@2.8.5
│
├── 📁 public/                      # Frontend - Client-side files
│   │
│   ├── 📄 index.html               # Main HTML file (UI Structure)
│   │   ├── Header (Logo, Theme toggle)
│   │   ├── Control Panel (Microphone, Language)
│   │   ├── Recognition Output Section
│   │   ├── Voice Typing Input
│   │   ├── Available Commands Grid
│   │   ├── Command History Cards
│   │   ├── Footer
│   │   └── Script References
│   │
│   ├── 📄 style.css               # CSS Stylesheet (Styling & Animations)
│   │   ├── CSS Variables (Colors, Themes)
│   │   ├── Global Styles
│   │   ├── Header Styling
│   │   ├── Glassmorphism Design
│   │   ├── Microphone Button & Animations
│   │   ├── Theme Toggle
│   │   ├── Main Content Sections
│   │   ├── Command Cards
│   │   ├── History Cards
│   │   ├── Responsive Design (Mobile)
│   │   ├── Scrollbar Styling
│   │   └── Dark & Light Themes
│   │
│   └── 📄 script.js               # JavaScript File (Business Logic)
│       ├── Web Speech API Setup
│       ├── Global Variables
│       ├── DOM Element References
│       ├── Commands Database
│       │   ├── English Commands
│       │   └── Tamil Commands
│       ├── Initialization
│       ├── Speech Recognition Setup
│       ├── Event Listeners
│       ├── Listening Functions
│       ├── Command Processing
│       ├── Command Execution
│       ├── Theme Management
│       ├── Voice Synthesis
│       ├── History Management
│       ├── API Communication
│       ├── Utility Functions
│       └── Error Handling
│
└── 📁 data/                        # Backend - Data Storage (JSON files)
    │
    ├── 📄 history.json            # Command Execution History
    │   ├── Array of command objects
    │   ├── Fields: command, language, status, timestamp
    │   └── Auto-updated by server
    │
    ├── 📄 commands.json           # Command Statistics
    │   ├── Available commands list
    │   ├── Usage statistics
    │   └── Command metadata
    │
    └── 📄 settings.json           # User Settings
        ├── Language preference
        ├── Theme preference
        ├── Feature toggles
        ├── Audio settings
        └── Other preferences
```

## 🔄 Data Flow Diagram

### Voice Command Flow

```
User Speaks
    ▼
┌─────────────────────────┐
│ Web Speech API          │
│ (Browser Native)        │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│ Speech Recognition      │
│ Converts to Text        │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│ JavaScript Processing   │
│ (public/script.js)      │
└──────────┬──────────────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
Command      No Match
Match        │
│             ▼
│        ┌──────────────────┐
│        │ Send to Server   │
│        │ /ai-response     │
│        └────────┬─────────┘
│                 │
│                 ▼
│        ┌──────────────────┐
│        │ AI Response      │
│        │ Generator        │
│        └────────┬─────────┘
│                 │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ Store in History        │
│ (data/history.json)     │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│ Execute Command         │
│ (Open Website, etc.)    │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│ Voice Response          │
│ (Text to Speech)        │
└──────────┬──────────────┘
           │
           ▼
User Hears Response
```

## 📡 API Endpoint Map

```
http://localhost:5000/
│
├── [GET] /history              Get all command history
│   └── Returns: { history: [...], total: N }
│
├── [POST] /command             Add new command
│   └── Body: { command, language, status, timestamp }
│       Returns: { success, command }
│
├── [GET] /commands             Get command statistics
│   └── Returns: { commands: [...], total: N }
│
├── [GET] /settings             Get user settings
│   └── Returns: { settings: {...} }
│
├── [POST] /settings            Update settings
│   └── Body: { language, theme, ... }
│       Returns: { success, settings }
│
├── [POST] /ai-response         Get AI response
│   └── Body: { command, language }
│       Returns: { response, command }
│
├── [GET] /stats                Get usage statistics
│   └── Returns: { stats: {...} }
│
├── [GET] /history/clear        Clear history
│   └── Returns: { success }
│
└── [GET] /                     Serve static frontend
    └── Returns: public/index.html
```

## 🧩 Component Breakdown

### Frontend Components

#### 1. Header Component
```
┌──────────────────────────────────┐
│  🎤 Voice Control Hub    │  🌙    │
│  Control your browser with voice │
└──────────────────────────────────┘
Components:
- Title with gradient
- Subtitle
- Theme toggle button
```

#### 2. Control Panel
```
┌──────────────────────────────────┐
│ Language: [English ▼]             │
│          [🎤] (Animated)          │
│      Listening...                 │
│ ☑ Continuous Listening Mode       │
└──────────────────────────────────┘
Components:
- Language selector
- Microphone button with pulse animation
- Continuous listening checkbox
```

#### 3. Recognition Output
```
┌──────────────────────────────────┐
│ Recognized Speech                │
│ ┌──────────────────────────────┐ │
│ │ "open google"                │ │
│ └──────────────────────────────┘ │
│ ████████░░░░░░ 65% Confidence    │
└──────────────────────────────────┘
Components:
- Output text display
- Confidence percentage bar
```

#### 4. Voice Typing
```
┌──────────────────────────────────┐
│ Voice Typing                      │
│ [Voice input will appear here...] │
│                         [Clear]   │
└──────────────────────────────────┘
Components:
- Text input field
- Clear button
```

#### 5. Commands Grid
```
┌──────────────────────────────────┐
│ Available Commands                │
│ ┌──────────┐ ┌──────────┐         │
│ │ 🌐 Open  │ │ 🔍 Search│         │
│ │ Website  │ │          │         │
│ └──────────┘ └──────────┘ ...    │
└──────────────────────────────────┘
Components:
- Command cards in grid layout
- Each card has emoji, name, description
- Clickable for testing
```

#### 6. History Section
```
┌──────────────────────────────────┐
│ Command History      [Clear]      │
│ ┌──────────────────────────────┐ │
│ │ "open google"                │ │
│ │ 2026-03-29 10:15:30          │ │
│ │ ✅ SUCCESS                    │ │
│ └──────────────────────────────┘ │
│ ┌──────────────────────────────┐ │
│ │ "play music"                 │ │
│ │ 2026-03-29 10:16:45          │ │
│ │ ✅ SUCCESS                    │ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘
Components:
- History cards with animation
- Command text
- Timestamp
- Status badge (success/error/pending)
- Scrollable container
```

## 🎯 Key Features Mapping

| Feature | File | Function |
|---------|------|----------|
| Microphone Control | script.js | `toggleListening()` |
| Speech Recognition | script.js | `setupRecognition()` |
| Command Processing | script.js | `processCommand()` |
| Voice Execution | script.js | `executeCommand()` |
| History Storage | server.js | `/command` endpoint |
| Theme Toggle | script.js | `toggleTheme()` |
| Voice Synthesis | script.js | `speak()` |
| AI Response | server.js | `generateAIResponse()` |
| Confidence Display | script.js | `updateConfidenceBar()` |
| Language Support | script.js | `commands` object |

## 💾 Data Structure Examples

### History Entry
```json
{
  "command": "open google",
  "language": "en-US",
  "status": "success",
  "timestamp": "2026-03-29T10:15:30.000Z"
}
```

### Settings Object
```json
{
  "language": "en-US",
  "theme": "light",
  "continuousListening": false,
  "volume": 1.0,
  "speechRate": 1.0,
  "pitch": 1.0,
  "autoPlaySound": true,
  "enableNotifications": true
}
```

### Command Object
```json
{
  "pattern": "/open\\s+(google|youtube|github)/i",
  "action": "openWebsite",
  "emoji": "🌐",
  "name": "Open Website",
  "description": "Open Google, YouTube, or GitHub"
}
```

## 🔌 Communication Protocols

### Frontend ↔ Backend Communication

```
Frontend (Browser)
    │
    ├─ HTTP GET /history
    │   └─ Fetch all commands
    │
    ├─ HTTP POST /command
    │   └─ Send new command
    │
    ├─ HTTP GET /stats
    │   └─ Get usage statistics
    │
    └─ HTTP POST /ai-response
        └─ Ask AI for response

Backend (Node.js/Express)
    │
    └─ Responses
        ├─ { success: bool, data: {...} }
        ├─ { success: bool, history: [...] }
        ├─ { success: bool, response: "..." }
        └─ { success: bool, stats: {...} }
```

## 🔐 Data Security Flow

```
User Input
    ▼
┌─────────────────────────────┐
│ Input Validation            │
│ (Check length, type)        │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│ HTML Escape/Sanitize        │
│ (Prevent XSS)               │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│ Store in JSON/LocalStorage  │
│ (Server + Client)           │
└──────────┬──────────────────┘
           │
           ▼
Safe Display/Use
```

## 📊 Technology Stack

```
Frontend
├── HTML5
│   └── Semantic markup, forms, inputs
├── CSS3
│   ├── Flexbox & Grid layouts
│   ├── Animations & transitions
│   ├── Glassmorphism effects
│   ├── Responsive design
│   └── CSS variables for theming
└── JavaScript (ES6+)
    ├── Web Speech API
    ├── Fetch API
    ├── LocalStorage API
    ├── Event handling
    ├── DOM manipulation
    └── Async/Await

Backend
└── Node.js + Express
    ├── HTTP Server
    ├── Routing
    ├── CORS middleware
    ├── File I/O (fs module)
    ├── JSON parsing
    └── Error handling
```

## 🎯 Application Flow

```
Start
  │
  ▼
Load HTML/CSS/JS
  │
  ▼
Initialize Web Speech API
  │
  ▼
Load Theme from LocalStorage
  │
  ▼
Load History from Server
  │
  ▼
Display UI
  │
  ├─ Check permissions
  │
  ▼
Wait for User Interaction
  │
  ├─ Click Microphone → Start Listening
  │
  ├─ Speak
  │
  ├─ Process Speech → Match Command
  │
  ├─ Execute Action
  │
  ├─ Save to History
  │
  ├─ Display Response
  │
  └─ Back to Wait
```

## 📈 Performance Considerations

```
Optimization Points:
├── Frontend
│   ├── LocalStorage for caching history
│   ├── CSS-based animations (GPU accelerated)
│   ├── Lazy loading for commands grid
│   ├── Debounce for button clicks
│   └── Efficient DOM updates
│
└── Backend
    ├── File-based storage (no database overhead)
    ├── Compression middleware
    ├── Response caching
    ├── Efficient JSON parsing
    └── Minimal dependencies
```

---

**For implementation details, see the respective source files.**
