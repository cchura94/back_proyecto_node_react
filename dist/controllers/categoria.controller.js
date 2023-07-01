"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(require("./../database/models/index"));
var _sequelize = require("sequelize");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = {
  listar: async (req, res) => {
    try {
      // /api/categoria?q=rop
      const buscar = req.query.q ? req.query.q : '';
      const categorias = await _index.default.Categoria.findAll({
        where: {
          nombre: {
            [_sequelize.Op.like]: `%${buscar}%`
          }
        }
      });
      return res.status(200).json(categorias);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  },
  guardar: async (req, res) => {
    try {
      const {
        nombre,
        detalle
      } = req.body;
      const cat = await _index.default.Categoria.create({
        nombre,
        detalle
      });
      if (cat.id) {
        return res.status(200).json({
          message: "Categoria Registrada",
          data: cat
        });
      }
      return res.status(422).json({
        message: "Error al guardar la Categoria"
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  },
  mostrar: async (req, res) => {
    try {
      const id = req.params.id;
      const categoria = await _index.default.Categoria.findByPk(id);
      if (categoria) {
        return res.status(200).json(categoria);
      } else {
        return res.status(404).json({
          message: "Categoria no existe"
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  },
  modificar: async (req, res) => {
    try {
      const id = req.params.id;
      const {
        nombre,
        detalle
      } = req.body;
      const categoria = await _index.default.Categoria.findByPk(id);
      if (categoria) {
        await _index.default.Categoria.update({
          nombre,
          detalle
        }, {
          where: {
            id: categoria.id
          }
        });
        return res.status(200).json({
          message: "Categoria Actualizada"
        });
      } else {
        return res.status(404).json({
          message: "Categoria no existe"
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  },
  eliminar: async (req, res) => {
    try {
      const id = req.params.id;
      await _index.default.Categoria.destroy({
        where: {
          id: id
        }
      });
      return res.status(200).json({
        message: "Categoria Eliminada"
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
};
exports.default = _default;