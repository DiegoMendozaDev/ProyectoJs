const express = require('express');
const { get } = require('@vercel/edge-config');
const serverless = require('serverless-http');
const app = express();

// Ruta para obtener un valor de la configuración en Edge Config Store
app.get('/config', async (req, res) => {
  try {
    const apiKey = await get('API_KEY');  // Accede al valor configurado en el Edge Config Store
    res.json({ apiKey });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la configuración' });
  }
});

// Exporta la app
module.exports = app;
module.exports.handler = serverless(app);
