const express = require("express");
const UsuarioController = require('../controllers/usuarioController.js');
const AuthUsuario = require('../middleware/AuthUsuario.js');

const usuarioRoutes = express.Router();

usuarioRoutes
    .get('/usuarios', AuthUsuario.verificaToken, UsuarioController.buscandoUsuarios)
    .get('/usuarios/ativos', AuthUsuario.verificaToken, UsuarioController.buscandoUsuariosAtivos)
    .get('/usuarios/:id', AuthUsuario.verificaToken, UsuarioController.buscandoUsuarioPorId)
    .post('/usuarios', AuthUsuario.verificaToken, UsuarioController.criandoUsuario)
    .put('/usuarios/:id', AuthUsuario.verificaToken, UsuarioController.atualizandoUsuario)
    .delete('/usuarios/:id', AuthUsuario.verificaToken, UsuarioController.apagandoUsuario);

module.exports = usuarioRoutes;