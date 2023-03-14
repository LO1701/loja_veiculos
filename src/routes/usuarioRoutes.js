const express = require("express");

const usuarioRoutes = express.Router();

usuarioRoutes
    .get('/usuarios', (req, res) => res.status(200).send('OKK'));


module.exports = usuarioRoutes;