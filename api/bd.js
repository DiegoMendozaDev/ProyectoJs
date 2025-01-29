const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false // Necesario para Vercel Postgres
    }
});

// Conecta a la DB
client.connect()
    .then(() => console.log('Conectado a Postgres!'))
    .catch(err => console.error('Error de conexión:', err));

try {
    await client.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        precio DECIMAL(10,2) CHECK (precio >= 0),
        stock INT DEFAULT 0
      );
    `);
    console.log('¡Tabla creada exitosamente!');
} catch (error) {
    console.error('Error al crear la tabla:', error);
} finally {
    await client.end();
}


// Ejecuta la función (solo una vez)
crearTabla();
// // Ejemplo de ruta con consulta
// app.get('/usuarios', async (req, res) => {
//   try {
//     const result = await client.query('SELECT * FROM usuarios');
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).send('Error en la DB: ' + error.message);
//   }
// });