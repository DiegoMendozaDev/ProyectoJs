const { Client } = require('pg');
require("dotenv").config();//Carga las variables del archivo .env(DATABASE_URL/PORT)
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Necesario para Vercel Postgres
    }
});

// Conecta a la DB
client.connect()
    .then(() => console.log('Conectado a Postgres!'))
    .catch(err => console.error('Error de conexión:', err));

module.exports = client;