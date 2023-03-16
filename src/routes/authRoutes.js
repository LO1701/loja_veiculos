const express = require('express');
const { login } = require('../controllers/AuthController.js');

const authRoute = express.Router();

authRoute
    .post("/auth/login", login)


module.exports = authRoute;