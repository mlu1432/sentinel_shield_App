const express = require('express');
const admin = require('../firebaseAdmin');

const router = express.Router();

// Save user's location
router.post('/location', async (req, res) => {
    const { uid, location } = req.body;

    try {
        await admin.database().ref(`locations/${uid}`).set(location);
        res.status(200).send({ success: true });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get user's last known location
router.get('/location', async (req, res) => {
    const { uid } = req.query;

    try {
        const snapshot = await admin.database().ref(`locations/${uid}`).once('value');
        const location = snapshot.val();
        if (location) {
            res.status(200).send(location);
        } else {
            res.status(404).send({ error: 'Location not found' });
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get nearby police stations
router.get('/police-stations', async (req, res) => {
    try {
        const snapshot = await admin.database().ref('policeStations').once('value');
        const stations = snapshot.val();
        res.status(200).send(stations);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Update a user's location
router.put('/location', async (req, res) => {
    const { uid, location } = req.body;

    try {
        await admin.database().ref(`locations/${uid}`).update(location);
        res.status(200).send({ success: true });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Share user's location with trusted contacts
router.post('/share-location', async (req, res) => {
    const { uid } = req.body;

    try {
        const snapshot = await admin.database().ref(`locations/${uid}`).once('value');
        const location = snapshot.val();

        if (!location) {
            return res.status(404).send({ error: 'Location not found' });
        }

        const contactsSnapshot = await admin.database().ref(`contacts/${uid}`).once('value');
        const contacts = contactsSnapshot.val() || {};

        const updates = {};
        for (const contactId in contacts) {
            updates[`sharedLocations/${contactId}/${uid}`] = location;
        }

        await admin.database().ref().update(updates);
        res.status(200).send({ success: true });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;