const UsuarioService = require('../services/UsuarioServices.js');
const usuarioService = new UsuarioService();
const bcrypt = require('bcrypt');

    const criandoUsuario = async (req, res) => {
        const novoUsuario = req.body;
        const senha = req.body.senha;
        const confirmaSenha = req.body.confirmaSenha;

        try {
            const usuarioProcurado = await usuarioService.buscaEmailUsuarios(novoUsuario.email);

            if(usuarioProcurado)
                return res.status(500).send(`E-mail já cadastrado`);

            if(senha !== confirmaSenha)
                return res.status(400).send("Senhas não conferem");

            const acrescentaSenha = await bcrypt.genSalt(12);
            const senhaHash = await bcrypt.hash(senha, acrescentaSenha);
            
            novoUsuario.senha = senhaHash;
            
            await usuarioService.criarRegistro(novoUsuario);

            res.status(201).send('Usuario criado com sucesso');
        } catch (error) {
            res.status(500).send(`Erro ao criar o usuário - ${error.message}`);
        }
    }

    const buscandoUsuarios = async (req, res) => {
        try {
            const usuariosProcurados = await usuarioService.buscandoRegistro();

            if(usuariosProcurados)
                return res.status(200).json(usuariosProcurados);
            else
                return res.status(200).send('Nenhum usuário cadastrado');

        } catch (error) {
            res.status(500).send(`Erro ao buscar os usuários - ${error.message}`);
        }
    }

    const buscandoUsuarioPorId = async (req, res) => {
        const id = req.params.id;

        try {
            const usuarioProcurado = await usuarioService.buscandoRegistroPorId(id);

            if(usuarioProcurado)
                return res.status(200).json(usuarioProcurado);
            else
                return res.status(200).send('Nenhum usuário encontrado');

        } catch (error) {
            res.status(500).send(`Erro ao buscar os usuários - ${error.message}`);
        }
    }

    const buscandoUsuariosAtivos = async (req, res) => {
        try {
            const usuariosProcurados = await usuarioService.buscaUsuariosAtivos();

            if(usuariosProcurados)
                return res.status(200).json(usuariosProcurados);
            else
                return res.status(200).send('Nenhum usuário cadastrado');

        } catch (error) {
            res.status(500).send(`Erro ao buscar os usuários - ${error.message}`);
        }
    }

    const atualizandoUsuario = async (req, res) => {
        const novoUsuario = req.body;
        const id = req.params.id;

        try {
            const usuarioProcurado = await usuarioService.buscandoRegistroPorId(id);

            if(!usuarioProcurado)
                return res.status(400).send('Nenhum usuário encontrado');
   
            await usuarioService.atualizaRegistro(novoUsuario, id);

            res.status(201).send('Usuario atualizado com sucesso');
        } catch (error) {
            res.status(500).send(`Erro ao criar o usuário - ${error.message}`);
        }
    }

    const apagandoUsuario = async (req, res) => {
        const id = req.params.id;

        try {
            const usuarioProcurado = await usuarioService.buscandoRegistroPorId(id);

            if(!usuarioProcurado)
                return res.status(400).send('Nenhum usuário encontrado');
   
            await usuarioService.deletaRegistro(id);

            res.status(201).send('Usuario deletado com sucesso');
        } catch (error) {
            res.status(500).send(`Erro ao deletar o usuário - ${error.message}`);
        }
    }

module.exports = { criandoUsuario, buscandoUsuarios, buscandoUsuarioPorId, buscandoUsuariosAtivos, atualizandoUsuario, apagandoUsuario }