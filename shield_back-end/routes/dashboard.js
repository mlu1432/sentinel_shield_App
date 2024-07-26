const express = require('express');
const admin = require('../firebaseAdmin');

const router = express.Router();

// Reference to Realtime Database
const db = admin.database();

// Fetch user data
router.get('/user-data/:uid', (req, res) => {
    const { uid } = req.params;
    const userRef = db.ref(`users/${uid}`);
    userRef.once('value')
        .then(snapshot => res.status(200).send(snapshot.val()))
        .catch(error => res.status(500).send({ success: false, error: error.message }));
});

// Send SOS message
router.post('/send-sos', (req, res) => {
    const { uid, message } = req.body;
    if (message.length > 50) {
        return res.status(400).send({ success: false, error: 'Message exceeds 50 characters limit' });
    }
    const sosRef = db.ref(`sos/${uid}`);
    sosRef.push({ message, timestamp: admin.database.ServerValue.TIMESTAMP })
        .then(() => res.status(200).send({ success: true }))
        .catch(error => res.status(500).send({ success: false, error: error.message }));
});

// Share location
router.post('/share-location', (req, res) => {
    const { uid, location } = req.body;
    const locationRef = db.ref(`locations/${uid}`);
    locationRef.set({ location, timestamp: admin.database.ServerValue.TIMESTAMP })
        .then(() => {
            // Notify trusted contacts about the new location
            const contactsRef = db.ref(`contacts/${uid}`);
            contactsRef.once('value')
                .then(snapshot => {
                    const contacts = snapshot.val();
                    if (contacts) {
                        Object.keys(contacts).forEach(contactId => {
                            const contact = contacts[contactId];
                            const contactLocationRef = db.ref(`location-notifications/${contactId}`);
                            contactLocationRef.push({ location, timestamp: admin.database.ServerValue.TIMESTAMP });
                        });
                    }
                    res.status(200).send({ success: true });
                });
        })
        .catch(error => res.status(500).send({ success: false, error: error.message }));
});

// Fetch emergency types
router.get('/emergency-types', (req, res) => {
    const emergencyTypesRef = db.ref('emergency-types');
    emergencyTypesRef.once('value')
        .then(snapshot => res.status(200).send(snapshot.val()))
        .catch(error => res.status(500).send({ success: false, error: error.message }));
});

// Fetch past requests
router.get('/past-requests/:uid', (req, res) => {
    const { uid } = req.params;
    const pastRequestsRef = db.ref(`past-requests/${uid}`);
    pastRequestsRef.once('value')
        .then(snapshot => res.status(200).send(snapshot.val()))
        .catch(error => res.status(500).send({ success: false, error: error.message }));
});

// Update user status
router.post('/update-status', (req, res) => {
    const { uid, status } = req.body;
    const userStatusRef = db.ref(`users/${uid}/status`);
    userStatusRef.set(status)
        .then(() => res.status(200).send({ success: true }))
        .catch(error => res.status(500).send({ success: false, error: error.message }));
});

module.exports = router;