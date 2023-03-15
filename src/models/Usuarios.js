const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
   
    static associate(models) {
      
    }
  }

  Usuarios.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'E-mail já cadastrado'
      },
      validate:{
        isEmail: {
          args: true,
          msg: 'E-mail inválido'
        }
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        funcaoValidarRoles: function(role){
          if(role !== 'vendedor' && role !== 'gerente' && role !== 'admin'){
            throw new Error("Permissão de usuário inválida");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Usuarios',
    scopes: {
      scopeAtivos: {
        where: {
          ativo: true
        }
      }
    }
  });
  
  return Usuarios;
};