const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
const communicationRoutes = require('./routes/communication');
const contactRoutes = require('./routes/contacts');
const dashboardRoutes = require('./routes/dashboard');
const emergencyRoutes = require('./routes/emergency');
const locationRoutes = require('./routes/location');

app.use('/api/auth', authRoutes);
app.use('/api/communication', communicationRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/location', locationRoutes);

module.exports = app;