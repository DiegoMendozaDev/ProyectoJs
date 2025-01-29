const express = require('express');
const app = express();

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Express en Vercel! 🚀');
});

// Exporta para Vercel
module.exports = app;

