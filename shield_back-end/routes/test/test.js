const express = require('express');

// routes/test/test.js
const router = express.Router();

// Test GET endpoint
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'GET request successful' });
});

// Test POST endpoint
router.post('/test', (req, res) => {
    const data = req.body;
    res.status(201).json({ message: 'POST request successful', data });
});

// Test PUT endpoint
router.put('/test/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    res.status(200).json({ message: `PUT request successful for ID: ${id}`, data });
});

// Test DELETE endpoint
router.delete('/test/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json({ message: `DELETE request successful for ID: ${id}` });
});

module.exports = router;