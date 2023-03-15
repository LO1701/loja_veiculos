const UsuarioService = require('../services/UsuarioServices.js');
const usuarioService = new UsuarioService();
const bcrypt = require('bcrypt');

class UsuarioController {

    static async criandoUsuario(req, res) {
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

    static async buscandoUsuarios(req, res) {
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

    static async buscandoUsuarioPorId(req, res) {
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

    static async buscandoUsuariosAtivos(req, res) {
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

    static async atualizandoUsuario(req, res) {
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

    static async apagandoUsuario(req, res) {
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
}

module.exports = UsuarioController