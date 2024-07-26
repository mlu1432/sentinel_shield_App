const express = require('express');
const admin = require('../firebaseAdmin');

const router = express.Router();

// Add a trusted contact
router.post('/add-contact', async (req, res) => {
    const { uid, contact } = req.body;

    try {
        const snapshot = await admin.database().ref(`contacts/${uid}`).once('value');
        const contacts = snapshot.val() || {};

        if (Object.keys(contacts).length >= 3) {
            return res.status(400).send({ error: 'Cannot add more than three trusted contacts' });
        }

        const newContactKey = admin.database().ref().child(`contacts/${uid}`).push().key;
        contacts[newContactKey] = contact;

        await admin.database().ref(`contacts/${uid}`).set(contacts);
        res.status(200).send({ success: true });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Delete a trusted contact
router.delete('/delete-contact', async (req, res) => {
    const { uid, contactId } = req.body;

    try {
        await admin.database().ref(`contacts/${uid}/${contactId}`).remove();
        res.status(200).send({ success: true });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get all trusted contacts for a user
router.get('/get-contacts', async (req, res) => {
    const { uid } = req.query;

    try {
        const snapshot = await admin.database().ref(`contacts/${uid}`).once('value');
        const contacts = snapshot.val();
        res.status(200).send(contacts || {});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;