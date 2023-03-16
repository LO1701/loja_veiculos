const express = require("express");
const UsuarioController = require('../controllers/usuarioController.js');
const AuthUsuario = require('../middleware/AuthUsuario.js');

const usuarioRoutes = express.Router();

usuarioRoutes
    .get('/usuarios', AuthUsuario.verificaToken, AuthUsuario.verificaRole, UsuarioController.buscandoUsuarios)
    .get('/usuarios/ativos', AuthUsuario.verificaToken, AuthUsuario.verificaRole, UsuarioController.buscandoUsuariosAtivos)
    .get('/usuarios/:id', AuthUsuario.verificaToken, AuthUsuario.verificaRole, UsuarioController.buscandoUsuarioPorId)
    .post('/usuarios', AuthUsuario.verificaToken, AuthUsuario.verificaRole, UsuarioController.criandoUsuario)
    .put('/usuarios/:id', AuthUsuario.verificaToken, AuthUsuario.verificaRole, UsuarioController.atualizandoUsuario)
    .delete('/usuarios/:id', AuthUsuario.verificaToken, AuthUsuario.verificaRole, UsuarioController.apagandoUsuario);

module.exports = usuarioRoutes;