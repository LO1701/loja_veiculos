const express = require("express");
require('dotenv').config();
const usuarioRoute = require('./src/routes/usuarioRoutes.js');
const veiculoRoute = require('./src/routes/veiculoRoutes.js');
const vendaRoute = require('./src/routes/vendaRoutes.js');

const app = express();

app.use(
    express.json(),
    usuarioRoute,
    veiculoRoute,
    vendaRoute
);

app.listen(process.env.PORT, () => console.log("Servidor rodando"));