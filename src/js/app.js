const express = require('serveless-http');
const app = express();

app.get('/',(req,res) =>{
    res.send('¡hola mundo, desde express!');
});

module.exports =app;
module.exports.handler = serverless(app)
