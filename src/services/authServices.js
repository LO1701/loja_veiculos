const Services = require("./Services.js");
const dataBase = require("../models");

class AuthService extends Services{
    constructor(){
        super('Usuarios');
    }

    //Métodos específicos

    async buscaEmailUsuario(email){
        const usuarioBuscado = await dataBase[this.nomeModelo].findOne({
            where: {
                email: email
            }
        });

        return usuarioBuscado;
    }
}

module.exports = AuthService