"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _models = _interopRequireDefault(require("./../database/models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = {
  listar: async (req, res) => {
    try {
      // /api/producto?q=teclado&page=1&limit=10
      const q = req.query.q;
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const offset = (page - 1) * limit;
      const productos = await _models.default.Producto.findAndCountAll({
        where: {
          nombre: {
            [_sequelize.Op.like]: `%${q}%`
          }
        },
        include: [_models.default.Categoria],
        offset: offset,
        limit: limit
      });
      return res.status(200).json(productos);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  },
  guardar: async (req, res) => {
    try {
      const datos = req.body;
      const producto = await _models.default.Producto.create(datos);
      if (producto.id) {
        return res.status(201).json({
          message: 'Producto Registrado'
        });
      }
    } catch (error) {
      return res.status(422).json({
        message: error.message
      });
    }
  },
  mostrar: async (req, res) => {
    try {
      const id = req.params.id;
      const producto = await _models.default.Producto.findByPk(id);
      if (producto.id) {
        return res.status(200).json(producto);
      } else {
        return res.status(404).json({
          message: "Producto no existe"
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
      const producto = await _models.default.Producto.findByPk(id);
      if (producto) {
        await _models.default.Producto.update(req.body, {
          where: {
            id: id
          }
        });
        return res.status(200).json({
          message: "Producto Actualizada"
        });
      } else {
        return res.status(404).json({
          message: "El Producto no existe"
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
      await _models.default.Producto.destroy({
        where: {
          id: id
        }
      });
      return res.status(200).json({
        message: "Producto Eliminado"
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  },
  actualizarImagen: async (req, res) => {
    console.log(req.file);
    const id = req.params.id;
    let datos = {};
    if (req.file) {
      datos.imagen = 'imagenes/' + req.file.filename;
    }
    console.log(datos.imagen);
    await _models.default.Producto.update(datos, {
      where: {
        id
      }
    });
    return res.status(200).json({
      message: 'Imagen Actualizada'
    });
  }
};
exports.default = _default;