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

    static async verificaRole(req, res, next){  

            return res.status(403).json({msg: "Usuario não possui permissão"});

        next();   
    }
}

module.exports = AuthUsuario;