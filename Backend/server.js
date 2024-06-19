const express = require('express');
const bodyParser = require('body-parser');
const qr = require('qr-image');
const cors = require('cors'); // Import CORS middleware
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// CORS middleware
app.use(cors({
    origin: 'http://127.0.0.1:5500',  // Allow requests from this origin
    methods: ['GET', 'POST'],         // Allow GET and POST requests
    allowedHeaders: ['Content-Type']  // Allow Content-Type header
}));

// Route to handle the POST request from frontend
app.post('/qr', (req, res) => {
    const userInput = req.body.text;
    console.log('Received text from frontend:', userInput);
    
    // Generate QR code
    const qr_png = qr.imageSync(userInput, { type: 'png' });

    // Respond with the QR code image base64 data
    res.json({ qrImage: qr_png.toString('base64') });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
