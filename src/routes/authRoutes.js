const express = require('express');
const AuthController = require('../controllers/AuthController.js');

const authRoute = express.Router();

authRoute
    .post("/auth/login", AuthController.login)


module.exports = authRoute;