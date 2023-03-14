const express = require("express");

const veiculosRoutes = express.Router();

veiculosRoutes
    .get('/veiculos', (req, res) => res.status(200).send('OKK'));


module.exports = veiculosRoutes;