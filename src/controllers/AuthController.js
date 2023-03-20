const AuthService = require('../services/AuthServices.js');
const authService = new AuthService();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
class AuthController {
    static async login(req, res) {
        const email = req.body.email;
        const senha = req.body.senha;

        try {
            const usuarioProcurado = await authService.buscaEmailUsuario(email);

            if(!usuarioProcurado)
                return res.status(404).send("E-mail não cadastrado");

            const verificandoSenha = await bcrypt.compare(senha, usuarioProcurado.senha);

            if(!verificandoSenha)
                return res.status(400).send("Senha incorreta");
            
            const secret = process.env.SECRET;

            const token = jwt.sign({
                id: usuarioProcurado.id
            },
                secret,
            {
                expiresIn: '15m'
            }
            );

            res.status(200).json({msg: "Autenticação realizada com sucesso", token});

        } catch (error) {
            console.log(error.message);

            res.status(500).json({msg: "Erro no servidor, tente mais tarde"});
        }
    }

    static async logOut(req, res) {
        
    }
}

module.exports = AuthController;