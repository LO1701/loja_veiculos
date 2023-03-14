const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Veiculos extends Model {

    static associate(models) {
      
    }
  }

  Veiculos.init({
    tipo: DataTypes.STRING,
    nome: DataTypes.STRING,
    ano: DataTypes.STRING,
    descricao: DataTypes.STRING,
    valor: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Veiculos',
  });
  
  return Veiculos;
};