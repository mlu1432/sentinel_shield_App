Sentinel Shield is an emergency assistance app that allows users to share their real-time location, communicate with emergency contacts, and access emergency services quickly.

## Project Structure

`
shield_back-end
├── .expo
├── routes
│   ├── test
│   ├── auth.js
│   ├── communication.js
│   ├── contacts.js
│   ├── dashboard.js
│   ├── emergency.js
│   ├── location.js
├── .gitignore
├── app.js
├── firebaseAdmin.js
├── firebaseConfig.js
├── hashPasswords.js
├── package-lock.json
├── package.json
└── server.js
src
├── components
├── images
│   ├── avatar.png
│   ├── contact-icon.png
│   ├── delete-icon.png
│   ├── edit-icon.png
│   ├── google.png
│   ├── icon.png
│   ├── logIn-logo.png
│   ├── logo.png
│   ├── phone-icon.png
├── screens
│   ├── AuthScreen.jsx
│   ├── DashboardScreen.jsx
│   ├── EmergencyCommunicationScreen.jsx
│   ├── EmergencyContactScreen.jsx
│   ├── HomeScreen.jsx
│   ├── LocationSharingScreen.jsx
│   ├── NotFoundScreen.jsx
├── utils
│   ├── distanceUtils.js
├── MyStack.jsx

# Project Structure
# Front-end
src/components: Contains React components used across different screens.
src/images: Contains images used in the app.
src/screens: Contains screen components for different app pages.
src/utils: Contains utility functions.
app.json: Configuration file for the Expo project.
App.tsx: Entry point for the React Native app.
MyStack.jsx: Contains the navigation stack for the app.

# Back-end

shield_back-end/routes: Contains route handlers for different API endpoints.
shield_back-end/firebaseAdmin.js: Firebase admin SDK configuration.
shield_back-end/firebaseConfig.js: Firebase configuration.
shield_back-end/hashPasswords.js: Utility for hashing passwords.
shield_back-end/server.js: Entry point for the Node.js server.
Features
Authentication
Users can sign up and log in using email and password.
Google authentication is also supported.
Location Sharing
Users can share their real-time location with emergency contacts.
The app fetches nearby police stations and displays them on a map.
Emergency Communication
Users can send SOS messages.
Users can communicate with emergency contacts and services.
Dashboard
Users can access the main features of the app from the dashboard.
Configuration
Firebase

Expo
The Expo configuration is stored in app.json. Make sure to update it with your app's details.

Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

Authors
Lucas Sekwati - Initial work - LucasSekwati
Name - Initial work - mlu1432 GitHub