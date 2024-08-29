const crypto = require('crypto');

const generateKey = () => {

  let token = '';
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < 4; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }

  return token; // Genera una clave de 8 caracteres
};

module.exports = generateKey;