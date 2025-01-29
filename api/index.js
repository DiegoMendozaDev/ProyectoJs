const express = require('express');
const app = express();

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Express en Vercel! 🚀');
});
// Ver Usuarios
app.get('/usuarios', (req, res) => {
  res.send('Todos los usuarios');
});
// Exporta para Vercel
module.exports = app;

