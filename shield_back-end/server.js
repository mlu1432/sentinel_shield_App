require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3002;

console.log(`Attempting to start server on port ${PORT}`);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error(`Error starting server: ${err}`);
  }
});