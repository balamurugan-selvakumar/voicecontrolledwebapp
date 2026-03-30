/**
 * Voice Controlled Web Application
 * Main JavaScript File for Frontend
 * Features: Speech Recognition, Command Execution, History Management, etc.
 */

// ===========================
// Web Speech API Setup
// ===========================
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechSynthesis = window.speechSynthesis;

if (!SpeechRecognition) {
    alert('Speech Recognition API not supported in your browser. Please use Google Chrome.');
}

let recognition = new SpeechRecognition();

// ===========================
// Global Variables
// ===========================
let isListening = false;
let continuousListeningEnabled = false;
let currentLanguage = 'en-US';
let commandHistory = [];

// ===========================
// DOM Elements
// ===========================
const micButton = document.getElementById('micButton');
const micStatus = document.getElementById('micStatus');
const output = document.getElementById('output');
const voiceInput = document.getElementById('voiceInput');
const clearVoiceInputBtn = document.getElementById('clearVoiceInput');
const clearHistoryBtn = document.getElementById('clearHistory');
const historyContainer = document.getElementById('historyContainer');
const themeToggle = document.getElementById('themeToggle');
const languageSelect = document.getElementById('language');
const continuousListeningCheckbox = document.getElementById('continuousListening');
const commandsGrid = document.getElementById('commandsGrid');
const confidenceBar = document.getElementById('confidenceBar');
const confidenceText = document.getElementById('confidenceText');

// ===========================
// Commands Database
// ===========================
const commands = {
    'en-US': [
        { 
            pattern: /open\s+(google|youtube|github)/i, 
            action: 'openWebsite',
            emoji: '🌐',
            name: 'Open Website',
            description: 'Open Google, YouTube, or GitHub'
        },
        { 
            pattern: /search for\s+(.+)/i, 
            action: 'search',
            emoji: '🔍',
            name: 'Search',
            description: 'Search on Google'
        },
        { 
            pattern: /play\s+(music|song)/i, 
            action: 'playMusic',
            emoji: '🎵',
            name: 'Play Music',
            description: 'Open YouTube Music'
        },
        { 
            pattern: /change\s+background\s+color/i, 
            action: 'changeColor',
            emoji: '🎨',
            name: 'Change Color',
            description: 'Change background to random color'
        },
        { 
            pattern: /dark\s+mode/i, 
            action: 'darkMode',
            emoji: '🌙',
            name: 'Dark Mode',
            description: 'Enable dark theme'
        },
        { 
            pattern: /light\s+mode/i, 
            action: 'lightMode',
            emoji: '☀️',
            name: 'Light Mode',
            description: 'Enable light theme'
        },
        { 
            pattern: /what\s+is\s+the\s+time/i, 
            action: 'tellTime',
            emoji: '⏰',
            name: 'Tell Time',
            description: 'Get current time'
        },
        { 
            pattern: /weather/i, 
            action: 'showWeather',
            emoji: '⛅',
            name: 'Weather',
            description: 'Show weather info'
        }
    ],
    'ta-IN': [
        { 
            pattern: /கூகுள்\s+திற/i, 
            action: 'openGoogle',
            emoji: '🌐',
            name: 'கூகுள் திற',
            description: 'கூகுள் திற'
        },
        { 
            pattern: /யூடியூப்\s+திற/i, 
            action: 'openYouTube',
            emoji: '📺',
            name: 'யூடியூப் திற',
            description: 'யூடியூப் திற'
        },
        { 
            pattern: /இசை\s+வாசி/i, 
            action: 'playMusic',
            emoji: '🎵',
            name: 'இசை வாசி',
            description: 'இசை வாசி'
        },
        { 
            pattern: /நிறம்\s+மாற்று/i, 
            action: 'changeColor',
            emoji: '🎨',
            name: 'நிறம் மாற்று',
            description: 'பின்னணி நிறம் மாற்று'
        },
        { 
            pattern: /இருள்\s+முறை/i, 
            action: 'darkMode',
            emoji: '🌙',
            name: 'இருள் முறை',
            description: 'இருள் முறை'
        },
        { 
            pattern: /свет\s+முறை|வெளிச்சம்\s+முறை/i, 
            action: 'lightMode',
            emoji: '☀️',
            name: 'வெளிச்சம் முறை',
            description: 'வெளிச்சம் முறை'
        }
    ]
};

// ===========================
// Initialize App
// ===========================
function initializeApp() {
    setupRecognition();
    setupEventListeners();
    loadTheme();
    loadCommandHistory();
    populateCommandsGrid();
}

// ===========================
// Setup Speech Recognition
// ===========================
function setupRecognition() {
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = currentLanguage;

    recognition.onstart = () => {
        isListening = true;
        micButton.classList.add('listening');
        micStatus.textContent = '🎤 Listening...';
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        let maxConfidence = 0;

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            const confidence = event.results[i][0].confidence;

            if (confidence > maxConfidence) {
                maxConfidence = confidence;
            }

            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        // Update confidence bar
        updateConfidenceBar(maxConfidence);

        // Update output display
        const displayText = finalTranscript || interimTranscript;
        output.innerHTML = `<p>${displayText}</p>`;

        // Process final transcript
        if (finalTranscript) {
            processCommand(finalTranscript.trim(), currentLanguage);
            voiceInput.value = finalTranscript.trim();
        }
    };

    recognition.onerror = (event) => {
        micStatus.textContent = `❌ Error: ${event.error}`;
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
        isListening = false;
        micButton.classList.remove('listening');

        if (continuousListeningEnabled) {
            micStatus.textContent = '🔄 Restarting...';
            setTimeout(() => startListening(), 500);
        } else {
            micStatus.textContent = 'Click to start listening';
        }
    };
}

// ===========================
// Event Listeners
// ===========================
function setupEventListeners() {
    // Microphone button
    micButton.addEventListener('click', toggleListening);

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Language selector
    languageSelect.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        recognition.lang = currentLanguage;
    });

    // Continuous listening
    continuousListeningCheckbox.addEventListener('change', (e) => {
        continuousListeningEnabled = e.target.checked;
    });

    // Clear buttons
    clearVoiceInputBtn.addEventListener('click', () => {
        voiceInput.value = '';
    });

    clearHistoryBtn.addEventListener('click', clearHistory);

    // Voice input on enter
    voiceInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processCommand(voiceInput.value, currentLanguage);
            addToHistory(voiceInput.value, 'success');
        }
    });
}

// ===========================
// Listening Functions
// ===========================
function toggleListening() {
    if (isListening) {
        recognition.abort();
        isListening = false;
        micButton.classList.remove('listening');
        micStatus.textContent = 'Click to start listening';
    } else {
        startListening();
    }
}

function startListening() {
    recognition.start();
}

// ===========================
// Command Processing
// ===========================
function processCommand(transcript, language) {
    const commandList = commands[language];
    let commandExecuted = false;

    for (let cmd of commandList) {
        if (cmd.pattern.test(transcript)) {
            executeCommand(cmd.action, transcript, language);
            addToHistory(transcript, 'success');
            commandExecuted = true;
            break;
        }
    }

    // If no command matched, try AI API
    if (!commandExecuted) {
        handleUnrecognizedCommand(transcript, language);
    }
}

// ===========================
// Command Execution
// ===========================
function executeCommand(action, transcript, language) {
    const lowerTranscript = transcript.toLowerCase();

    switch (action) {
        case 'openWebsite':
            if (lowerTranscript.includes('google')) {
                window.open('https://www.google.com', '_blank');
                speak('Opening Google', language);
            } else if (lowerTranscript.includes('youtube')) {
                window.open('https://www.youtube.com', '_blank');
                speak('Opening YouTube', language);
            } else if (lowerTranscript.includes('github')) {
                window.open('https://www.github.com', '_blank');
                speak('Opening GitHub', language);
            }
            break;

        case 'openGoogle':
            window.open('https://www.google.com', '_blank');
            speak('கூகுள் திறக்கிறது', language);
            break;

        case 'openYouTube':
            window.open('https://www.youtube.com', '_blank');
            speak('யூடியூப் திறக்கிறது', language);
            break;

        case 'search':
            const query = transcript.replace(/search for\s+/i, '');
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
            const msg = language === 'en-US' ? `Searching for ${query}` : `தேட பொருள் ${query}`;
            speak(msg, language);
            break;

        case 'playMusic':
            window.open('https://www.youtube.com/results?search_query=music', '_blank');
            const musicMsg = language === 'en-US' ? 'Opening YouTube Music' : 'இசை திறக்கிறது';
            speak(musicMsg, language);
            break;

        case 'changeColor':
            changeBackgroundColor();
            const colorMsg = language === 'en-US' ? 'Changing background color' : 'நிறம் மாற்றிறது';
            speak(colorMsg, language);
            break;

        case 'darkMode':
            setTheme('dark');
            const darkMsg = language === 'en-US' ? 'Dark mode enabled' : 'இருள் முறை செயல்படுத்தப்பட்டது';
            speak(darkMsg, language);
            break;

        case 'lightMode':
            setTheme('light');
            const lightMsg = language === 'en-US' ? 'Light mode enabled' : 'வெளிச்சம் முறை செயல்படுத்தப்பட்டது';
            speak(lightMsg, language);
            break;

        case 'tellTime':
            const time = new Date().toLocaleTimeString();
            const timeMsg = language === 'en-US' ? `Current time is ${time}` : `தற்போது இருக்கும் நேரம் ${time}`;
            speak(timeMsg, language);
            break;

        case 'showWeather':
            const weatherMsg = language === 'en-US' ? 'Opening weather information' : 'வானிலை தகவல் திறக்கிறது';
            window.open('https://weather.google.com', '_blank');
            speak(weatherMsg, language);
            break;

        default:
            console.log(`Unknown command: ${action}`);
    }
}

// ===========================
// Background Color Change
// ===========================
function changeBackgroundColor() {
    const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.documentElement.style.setProperty('--bg-primary', randomColor);
}

// ===========================
// Theme Management
// ===========================
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.querySelector('.toggle-icon').textContent = icon;
}

// ===========================
// Voice Synthesis
// ===========================
function speak(text, language) {
    // Check if speech synthesis is supported
    if (!SpeechSynthesis) {
        console.warn('Speech Synthesis not supported');
        return;
    }

    // Cancel any ongoing speech
    SpeechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    SpeechSynthesis.speak(utterance);
}

// ===========================
// Unrecognized Command Handler
// ===========================
async function handleUnrecognizedCommand(transcript, language) {
    micStatus.textContent = '🤔 Processing...';
    addToHistory(transcript, 'pending');

    try {
        // Send to backend for AI processing
        const response = await fetch('/command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                command: transcript,
                language: language,
                timestamp: new Date().toISOString()
            })
        });

        const data = await response.json();
        
        if (data.success && data.response) {
            output.innerHTML = `<p><strong>AI Response:</strong> ${data.response}</p>`;
            speak(data.response, language);
            addToHistory(`${transcript} → ${data.response}`, 'success');
        } else {
            const errorMsg = language === 'en-US' ? 'Command not recognized' : 'கட்டளை அறியப்பட்டது இல்லை';
            speak(errorMsg, language);
            addToHistory(transcript, 'error');
        }
    } catch (error) {
        console.error('Error communicating with backend:', error);
        const errorMsg = language === 'en-US' ? 'Error processing command' : 'கட்டளை செயல்படுத்த பிழை';
        speak(errorMsg, language);
        addToHistory(transcript, 'error');
    }

    micStatus.textContent = 'Click to start listening';
}

// ===========================
// History Management
// ===========================
function addToHistory(command, status = 'success') {
    const historyItem = {
        command,
        status,
        timestamp: new Date().toLocaleString()
    };

    commandHistory.unshift(historyItem);

    // Limit history to 50 items
    if (commandHistory.length > 50) {
        commandHistory.pop();
    }

    saveCommandHistory();
    renderHistory();
}

function saveCommandHistory() {
    localStorage.setItem('commandHistory', JSON.stringify(commandHistory));
    
    // Also save to backend
    fetch('/command', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            command: commandHistory[0]?.command,
            status: commandHistory[0]?.status,
            timestamp: commandHistory[0]?.timestamp
        })
    }).catch(error => console.error('Failed to save to backend:', error));
}

function loadCommandHistory() {
    const saved = localStorage.getItem('commandHistory');
    if (saved) {
        commandHistory = JSON.parse(saved);
        renderHistory();
    }

    // Load from backend
    fetch('/history')
        .then(res => res.json())
        .then(data => {
            if (data.success && Array.isArray(data.history)) {
                commandHistory = data.history;
                renderHistory();
            }
        })
        .catch(error => console.error('Failed to load history from backend:', error));
}

function renderHistory() {
    if (commandHistory.length === 0) {
        historyContainer.innerHTML = '<p class="placeholder">No commands executed yet</p>';
        return;
    }

    historyContainer.innerHTML = commandHistory.map(item => `
        <div class="history-card">
            <div class="command-text">${escapeHtml(item.command)}</div>
            <div class="command-time">${item.timestamp}</div>
            <span class="command-status status-${item.status}">${item.status.toUpperCase()}</span>
        </div>
    `).join('');
}

function clearHistory() {
    if (confirm('Are you sure you want to clear the command history?')) {
        commandHistory = [];
        localStorage.removeItem('commandHistory');
        renderHistory();
        speak('History cleared', currentLanguage);
    }
}

// ===========================
// Commands Grid Population
// ===========================
function populateCommandsGrid() {
    const currentCommands = commands[currentLanguage];
    
    commandsGrid.innerHTML = currentCommands.map(cmd => `
        <div class="command-card" onclick="simulateCommand('${cmd.name}')">
            <div class="command-emoji">${cmd.emoji}</div>
            <div class="command-name">${cmd.name}</div>
            <div class="command-desc">${cmd.description}</div>
        </div>
    `).join('');

    // Update on language change
    languageSelect.addEventListener('change', () => {
        populateCommandsGrid();
    });
}

// ===========================
// Simulate Command
// ===========================
function simulateCommand(commandName) {
    voiceInput.value = commandName;
    processCommand(commandName, currentLanguage);
}

// ===========================
// Confidence Bar Update
// ===========================
function updateConfidenceBar(confidence) {
    const percentage = Math.round(confidence * 100);
    confidenceBar.querySelector('.confidence-fill').style.width = percentage + '%';
    confidenceText.textContent = `Confidence: ${percentage}%`;
}

// ===========================
// Utility Functions
// ===========================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===========================
// Initialize on Load
// ===========================
document.addEventListener('DOMContentLoaded', initializeApp);
