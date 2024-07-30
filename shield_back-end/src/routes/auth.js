// shield_back-end/src/routes/auth.js
const express = require('express');
const router = express.Router();
const admin = require('../../Configuration/firebaseAdmin'); // Ensure the path is correct
const bcrypt = require('bcrypt');
const { getDatabase } = require('firebase-admin/database');

// User Registration Endpoint
router.post('/register', async (req, res) => {
  const { username, password } = req.body; // Extract username and password from request body
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  try {
    // Store the password hash in Firebase Realtime Database
    const db = getDatabase();
    const hash = await bcrypt.hash(password, 10); // Hash the password with salt rounds of 10
    await db.ref(`users/${username}`).set({ passwordHash: hash }); // Save hash in Realtime Database

    res.status(201).json({ message: 'User registered successfully' }); // Respond with success message
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message }); // Handle errors
  }
});

// User Login Endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Extract username and password from request body
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  try {
    // Retrieve the hashed password from Firebase Realtime Database
    const db = getDatabase();
    const userRef = db.ref(`users/${username}`);
    const snapshot = await userRef.once('value');
    const user = snapshot.val();

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const hashedPassword = user.passwordHash;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' }); // Respond with success message
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message }); // Handle errors
  }
});

// Middleware to verify Basic Auth
const verifyBasicAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header provided' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (!username || !password) {
    return res.status(401).json({ message: 'Invalid authorization header' });
  }

  // Retrieve the hashed password from Firebase Realtime Database
  const db = getDatabase();
  const userRef = db.ref(`users/${username}`);
  const snapshot = await userRef.once('value');
  const user = snapshot.val();

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const hashedPassword = user.passwordHash;
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  req.username = username;
  next();
};

// Protected route example
router.get('/protected', verifyBasicAuth, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', username: req.username });
});

module.exports = router;