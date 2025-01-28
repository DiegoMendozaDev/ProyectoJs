const express = require('express');
const serverless = require('serverless-http'); // Para adaptar Express al entorno de Vercel
const app = express();

// Define tus rutas
app.get('/test', (req, res) => {
    console.log('hola');
    res.send('¡Hola, mundo con Express en Vercel!');
});

// Exporta la app para que funcione como serverless
module.exports = app;
module.exports.handler = serverless(app);
