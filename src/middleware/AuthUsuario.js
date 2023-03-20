require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const AuthService = require('../services/AuthServices.js');
const authService = new AuthService();

    const verificaToken = (req, res, next) => {
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

    const verificaRole = async (req, res, next) => { 

        const authHeader = req.headers['authorization'];

        const decodificado =  jwt_decode(authHeader);

        try {
            const usuarioProcurado = await authService.buscandoRegistroPorId(decodificado.id);
        
            if(usuarioProcurado.role !== 'gerente')
                return res.status(403).json({msg: "Usuario não possui permissão"});

            next(); 
            
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro no servidor, tente mais tarde'});
        }  
    }

module.exports = { verificaToken, verificaRole }