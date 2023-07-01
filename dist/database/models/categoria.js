'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Categoria.hasMany(models.Producto, {
        foreignKey: "categoriaId"
      });
    }
  }
  Categoria.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'El nombre categoria es obligatorio'
        },
        len: {
          args: [3, 30],
          msg: 'El campo nombre deber estar entre 3 a 30 caracteres'
        }
      }
    },
    detalle: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Categoria'
  });
  return Categoria;
};