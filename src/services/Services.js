const dataBase = require('../models');
class Services {
    constructor(nomeModelo){
        this.nomeModelo = nomeModelo;
    }
    
    async criarRegistro(novasInformações) {
        await dataBase[this.nomeModelo].create(novasInformações);        
    }

    async buscandoRegistro(){
        const registros = await dataBase[this.nomeModelo].findAll({
            attributes: ['nome', 'email', 'ativo', 'role']
        });

        return registros;
    }

    async buscandoRegistroPorId(id){
        const registros = await dataBase[this.nomeModelo].findOne({
            where:{
                id: id
            },
            attributes: ['nome', 'email', 'ativo', 'role']
        });

        return registros;
    }

    async atualizaRegistro(novasInformações, id) {
        await dataBase[this.nomeModelo].update(novasInformações, {
            where: {
                id: id
            }
        });        
    }

    async deletaRegistro(id) {
        await dataBase[this.nomeModelo].destroy({
            where: {
                id: id
            }
        });        
    }
}

module.exports = Services;