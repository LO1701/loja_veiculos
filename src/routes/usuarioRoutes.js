const express = require("express");
const { 
    buscandoUsuarios, 
    buscandoUsuariosAtivos, 
    buscandoUsuarioPorId, 
    criandoUsuario, 
    atualizandoUsuario, 
    apagandoUsuario } = require('../controllers/usuarioController.js');

const { 
    verificaRole, 
    verificaToken } = require('../middleware/AuthUsuario.js');

const usuarioRoutes = express.Router();

usuarioRoutes
    .get('/usuarios', verificaToken, verificaRole, buscandoUsuarios)
    .get('/usuarios/ativos', verificaToken, verificaRole, buscandoUsuariosAtivos)
    .get('/usuarios/:id', verificaToken, verificaRole, buscandoUsuarioPorId)
    .post('/usuarios', verificaToken, verificaRole, criandoUsuario)
    .put('/usuarios/:id', verificaToken, verificaRole, atualizandoUsuario)
    .delete('/usuarios/:id', verificaToken, verificaRole, apagandoUsuario);

module.exports = usuarioRoutes;