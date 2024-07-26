const express = require('express');
const router = express.Router();
const admin = require('../firebaseAdmin');
const bcrypt = require('bcrypt');
const { getDatabase } = require('firebase-admin/database');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await admin.auth().createUser({ email, password });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await admin.auth().getUserByEmail(email);
    const db = getDatabase();
    const ref = db.ref(`users/${user.uid}/passwordHash`);
    ref.once('value', (snapshot) => {
      const hashedPassword = snapshot.val();
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (result) {
          res.status(200).json({ message: 'Login successful', user });
        } else {
          res.status(400).json({ message: 'Invalid credentials' });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

module.exports = router;