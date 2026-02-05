const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route for testing
app.get('/', (req, res) => {
    res.json({ message: 'AI StudyBuddy API is running!' });
});

// Placeholder routes for the future
app.post('/api/auth/register', (req, res) => {
    res.status(501).json({ message: 'Not implemented: Auth Register' });
});

app.post('/api/auth/login', (req, res) => {
    res.status(501).json({ message: 'Not implemented: Auth Login' });
});

app.post('/api/ai/process', (req, res) => {
    res.status(501).json({ message: 'Not implemented: AI Process' });
});

app.get('/api/history', (req, res) => {
    res.status(501).json({ message: 'Not implemented: History' });
});

app.post('/api/ai/speech', (req, res) => {
    res.status(501).json({ message: 'Not implemented: AI Speech' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
