const bcrypt = require('bcrypt');
require('dotenv').config();

const plainTextPasswords = ['password1', 'password2', 'password3'];
const userIds = ['375SAy1uMNYZUrmwRV7UeIBbLQP2', 'RwdOomSELiP5dkFdg3qH80xutJW2', 'IGFiJh5mcWaEqbP7Bb3Ypk'];

plainTextPasswords.forEach((plainTextPassword, index) => {
  bcrypt.hash(plainTextPassword, 10, (err, hash) => {
    if (err) throw err;
    console.log(`User ID: ${userIds[index]} - Hashed password: ${hash}`);
  });
});