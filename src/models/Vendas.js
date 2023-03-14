const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vendas extends Model {

    static associate(models) {
     
    }
  }
  
  Vendas.init({
    nome_cliente: DataTypes.STRING,
    data_venda: DataTypes.DATEONLY,
    valor: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Vendas',
  });
  
  return Vendas;
};