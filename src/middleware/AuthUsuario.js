const AuthService = require('../services/AuthServices.js');
const authService = new AuthService();
require('dotenv').config();
const jwt = require('jsonwebtoken');

class AuthUsuario {
    static async verificaToken(req, res, next){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token)
            return res.status(400).json({msg: 'Faça o login'});

        try {
            const secret = process.env.SECRET;

            jwt.verify(token, secret);

            next();
        } catch (error) {
            res.status(400).json({msg: 'Faça o login'});
        }
    }
}

module.exports = AuthUsuario;