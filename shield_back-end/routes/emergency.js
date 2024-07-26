const express = require('express');
const admin = require('../firebaseConfig');

// routes/emergency.js
const router = express.Router();

router.post('/emergency', async (req, res) => {
    const { uid, location, message } = req.body;

    try {
        res.status(200).send({ success: true });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;