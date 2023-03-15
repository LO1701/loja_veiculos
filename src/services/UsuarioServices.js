const Services = require("./Services.js");
const dataBase = require("../models");

class UsuarioService extends Services{

    constructor(){
        super('Usuarios');
    }

    //Métodos específicos

    async buscaUsuariosAtivos(){
        const usuariosBuscados = await dataBase[this.nomeModelo].scope('scopeAtivos').findAll();

        return usuariosBuscados;
    }

    async buscaEmailUsuarios(email){
        const usuariosBuscados = await dataBase[this.nomeModelo].findOne({
            where: {
                email: email
            }
        });

        return usuariosBuscados;
    }
}

module.exports = UsuarioService