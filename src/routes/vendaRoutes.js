const express = require("express");

const vendasRoutes = express.Router();

vendasRoutes
    .get('/vendas', (req, res) => res.status(200).send('OKK'));


module.exports = vendasRoutes;