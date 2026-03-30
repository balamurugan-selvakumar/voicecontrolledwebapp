/**
 * Voice Controlled Web Application - Backend Server
 * Node.js + Express Server
 * Handles: History storage, API endpoints, AI command processing
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// ===========================
// Initialize Express App
// ===========================
const app = express();
const PORT = process.env.PORT || 5000;

// ===========================
// Middleware
// ===========================
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===========================
// Data File Paths
// ===========================
const dataDir = path.join(__dirname, 'data');
const historyFile = path.join(dataDir, 'history.json');
const commandsFile = path.join(dataDir, 'commands.json');
const settingsFile = path.join(dataDir, 'settings.json');

// ===========================
// Ensure Data Directory Exists
// ===========================
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// ===========================
// Initialize JSON Files
// ===========================
function initializeDataFiles() {
    // Initialize history.json
    if (!fs.existsSync(historyFile)) {
        fs.writeFileSync(historyFile, JSON.stringify({ history: [] }, null, 2));
    }

    // Initialize commands.json
    if (!fs.existsSync(commandsFile)) {
        const defaultCommands = {
            commands: [
                { name: 'open google', status: 'success', count: 0 },
                { name: 'open youtube', status: 'success', count: 0 },
                { name: 'search for', status: 'success', count: 0 },
                { name: 'play music', status: 'success', count: 0 },
                { name: 'change background color', status: 'success', count: 0 },
                { name: 'dark mode', status: 'success', count: 0 },
                { name: 'light mode', status: 'success', count: 0 }
            ]
        };
        fs.writeFileSync(commandsFile, JSON.stringify(defaultCommands, null, 2));
    }

    // Initialize settings.json
    if (!fs.existsSync(settingsFile)) {
        const defaultSettings = {
            language: 'en-US',
            theme: 'light',
            continuousListening: false
        };
        fs.writeFileSync(settingsFile, JSON.stringify(defaultSettings, null, 2));
    }
}

// ===========================
// File Helper Functions
// ===========================
function readHistoryFile() {
    try {
        const data = fs.readFileSync(historyFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading history file:', error);
        return { history: [] };
    }
}

function writeHistoryFile(data) {
    try {
        fs.writeFileSync(historyFile, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing history file:', error);
        return false;
    }
}

function readCommandsFile() {
    try {
        const data = fs.readFileSync(commandsFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading commands file:', error);
        return { commands: [] };
    }
}

function writeCommandsFile(data) {
    try {
        fs.writeFileSync(commandsFile, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing commands file:', error);
        return false;
    }
}

function readSettingsFile() {
    try {
        const data = fs.readFileSync(settingsFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading settings file:', error);
        return { language: 'en-US', theme: 'light' };
    }
}

function writeSettingsFile(data) {
    try {
        fs.writeFileSync(settingsFile, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing settings file:', error);
        return false;
    }
}

// ===========================
// API Routes
// ===========================

/**
 * GET /history
 * Fetch all command history
 */
app.get('/history', (req, res) => {
    const historyData = readHistoryFile();
    res.json({
        success: true,
        history: historyData.history,
        total: historyData.history.length
    });
});

/**
 * POST /command
 * Add a new command to history
 */
app.post('/command', (req, res) => {
    try {
        const { command, language, timestamp, status } = req.body;

        if (!command) {
            return res.status(400).json({
                success: false,
                message: 'Command is required'
            });
        }

        const historyData = readHistoryFile();
        
        const newCommand = {
            command,
            language: language || 'en-US',
            status: status || 'success',
            timestamp: timestamp || new Date().toISOString()
        };

        historyData.history.push(newCommand);

        // Limit history to 500 items
        if (historyData.history.length > 500) {
            historyData.history.shift();
        }

        if (writeHistoryFile(historyData)) {
            res.json({
                success: true,
                message: 'Command saved successfully',
                command: newCommand
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to save command'
            });
        }
    } catch (error) {
        console.error('Error saving command:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

/**
 * GET /history/clear
 * Clear all history
 */
app.get('/history/clear', (req, res) => {
    try {
        const emptyHistory = { history: [] };
        
        if (writeHistoryFile(emptyHistory)) {
            res.json({
                success: true,
                message: 'History cleared successfully'
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to clear history'
            });
        }
    } catch (error) {
        console.error('Error clearing history:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

/**
 * GET /commands
 * Get all commands statistics
 */
app.get('/commands', (req, res) => {
    const commandsData = readCommandsFile();
    res.json({
        success: true,
        commands: commandsData.commands,
        total: commandsData.commands.length
    });
});

/**
 * GET /settings
 * Get user settings
 */
app.get('/settings', (req, res) => {
    const settings = readSettingsFile();
    res.json({
        success: true,
        settings
    });
});

/**
 * POST /settings
 * Update user settings
 */
app.post('/settings', (req, res) => {
    try {
        const { language, theme, continuousListening } = req.body;
        
        const currentSettings = readSettingsFile();
        
        const updatedSettings = {
            language: language || currentSettings.language,
            theme: theme || currentSettings.theme,
            continuousListening: continuousListening !== undefined 
                ? continuousListening 
                : currentSettings.continuousListening
        };

        if (writeSettingsFile(updatedSettings)) {
            res.json({
                success: true,
                message: 'Settings updated successfully',
                settings: updatedSettings
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to update settings'
            });
        }
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

/**
 * POST /ai-response
 * Generate AI response for unrecognized commands
 * This is a simple implementation. For production, integrate with actual AI API
 */
app.post('/ai-response', (req, res) => {
    try {
        const { command, language } = req.body;

        if (!command) {
            return res.status(400).json({
                success: false,
                message: 'Command is required'
            });
        }

        // Simple rule-based responses (In production, use OpenAI, Google AI, etc.)
        const response = generateAIResponse(command, language);

        res.json({
            success: true,
            response,
            command
        });
    } catch (error) {
        console.error('Error generating AI response:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate response'
        });
    }
});

/**
 * GET /stats
 * Get usage statistics
 */
app.get('/stats', (req, res) => {
    try {
        const historyData = readHistoryFile();
        
        const stats = {
            totalCommands: historyData.history.length,
            successCount: historyData.history.filter(h => h.status === 'success').length,
            errorCount: historyData.history.filter(h => h.status === 'error').length,
            pendingCount: historyData.history.filter(h => h.status === 'pending').length,
            languages: {}
        };

        // Count by language
        historyData.history.forEach(item => {
            const lang = item.language || 'en-US';
            stats.languages[lang] = (stats.languages[lang] || 0) + 1;
        });

        res.json({
            success: true,
            stats
        });
    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// ===========================
// AI Response Generator
// ===========================
function generateAIResponse(command, language) {
    const responses = {
        'en-US': {
            greetings: [
                'Hello! How can I help you?',
                'Hi there! What would you like to do?',
                'Hey! I\'m here to assist you.'
            ],
            help: [
                'I can open websites, search for information, play music, and more!',
                'Try saying "open google", "play music", or "change background color"',
                'I support voice commands. Say "help" to learn more.'
            ],
            notFound: [
                'I didn\'t quite understand that. Could you try again?',
                'Sorry, I\'m not sure what you mean. Can you rephrase?',
                'I didn\'t recognize that command. Please try again.'
            ]
        },
        'ta-IN': {
            greetings: [
                'வணக்கம்! நான் உங்களுக்கு உதவ முடியும்',
                'ஹாய்! நீ என்ன செய்ய வேண்டும்?',
                'வணக்கம்! நான் உங்களுக்கு உதவ இல்லை.'
            ],
            help: [
                'நான் வலைத்தளங்களைத் திறக்க முடியும், தகவல் தேட முடியும், இசை வாசம் செய்ய முடியும்!',
                '"கூகுள் திற", "இசை வாசி", அல்லது "நிறம் மாற்று" என்று சொல்லலாம்',
                'நான் குரல் கட்டளைகளை ஆதரிக்கிறேன்.'
            ],
            notFound: [
                'நான் அதை சரியாக புரிந்து கொள்ளவில்லை',
                'மன்னிக்கவும், நான் அர்த்தம் தெரியவில்லை',
                'அந்த கட்டளை எனக்கு தெரியாது'
            ]
        }
    };

    const responseData = responses[language] || responses['en-US'];
    const commandLower = command.toLowerCase();

    if (commandLower.includes('hello') || commandLower.includes('hi') || commandLower.includes('hey')) {
        return responseData.greetings[Math.floor(Math.random() * responseData.greetings.length)];
    } else if (commandLower.includes('help')) {
        return responseData.help[Math.floor(Math.random() * responseData.help.length)];
    } else {
        return responseData.notFound[Math.floor(Math.random() * responseData.notFound.length)];
    }
}

// ===========================
// Error Handling
// ===========================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
    });
});

// ===========================
// Start Server
// ===========================
app.listen(PORT, () => {
    initializeDataFiles();
    console.log('╔════════════════════════════════════════════╗');
    console.log('║  Voice Controlled Web Application Server   ║');
    console.log('╚════════════════════════════════════════════╝');
    console.log(`\n✅ Server is running on: http://localhost:${PORT}`);
    console.log(`📁 Data directory: ${dataDir}`);
    console.log(`\n🎤 Open http://localhost:${PORT} in your browser to start using the app`);
    console.log(`\n📊 Available Endpoints:`);
    console.log(`   GET  /history        - Fetch command history`);
    console.log(`   POST /command        - Add new command`);
    console.log(`   GET  /commands       - Get command statistics`);
    console.log(`   GET  /settings       - Get user settings`);
    console.log(`   POST /settings       - Update user settings`);
    console.log(`   POST /ai-response    - Get AI response`);
    console.log(`   GET  /stats          - Get usage statistics\n`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Server shutting down gracefully...');
    process.exit(0);
});
