const express = require('express');
const router = express.Router();
const admin = require('../firebaseAdmin');

// Reference to Realtime Database
const db = admin.database();

// Add a trusted contact
router.post('/add-contact', (req, res) => {
  const { uid, contact } = req.body;
  const contactsRef = db.ref(`contacts/${uid}`);
  contactsRef.push(contact)
    .then(() => res.status(200).send({ success: true }))
    .catch(error => res.status(500).send({ success: false, error: error.message }));
});

// Delete a trusted contact
router.delete('/delete-contact/:uid/:contactId', (req, res) => {
  const { uid, contactId } = req.params;
  const contactRef = db.ref(`contacts/${uid}/${contactId}`);
  contactRef.remove()
    .then(() => res.status(200).send({ success: true }))
    .catch(error => res.status(500).send({ success: false, error: error.message }));
});

module.exports = router;