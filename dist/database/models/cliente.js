'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Cliente.hasMany(models.Pedido, {
        foreignKey: "clienteId"
      });
    }
  }
  Cliente.init({
    nombre_completo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: DataTypes.STRING,
    ci_nit: DataTypes.STRING,
    telefono: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente'
  });
  return Cliente;
};