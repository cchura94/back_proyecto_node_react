"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
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
      const usuarios = await _models.default.User.findAndCountAll({
        attributes: ['id', 'email', 'createdAt'],
        where: {
          email: {
            [_sequelize.Op.like]: `%${q}%`
          }
        },
        offset: offset,
        limit: limit
      });
      const {
        password,
        ...rest
      } = usuarios;
      return res.status(200).json(rest);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  },
  guardar: async (req, res) => {
    try {
      const datos = req.body;
      const hash = await _bcrypt.default.hash(datos.password, 12);
      // registrar al user
      const user = await _models.default.User.create({
        email: datos.email,
        password: hash
      });
      if (user.id) {
        return res.status(201).json({
          message: 'Usuario Registrado'
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
      const user = await _models.default.User.findByPk(id);
      if (user.id) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({
          message: "User no existe"
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
      const user = await _models.default.User.findByPk(id);
      if (user) {
        if (req.body.password) {
          let hash = await _bcrypt.default.hash(req.body.password, 12);
          await _models.default.User.update({
            email: req.body.email,
            password: hash
          }, {
            where: {
              id: id
            }
          });
        } else {
          await _models.default.User.update(req.body, {
            where: {
              id: id
            }
          });
        }
        return res.status(200).json({
          message: "user Actualizado"
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
      await _models.default.User.destroy({
        where: {
          id: id
        }
      });
      return res.status(200).json({
        message: "User Eliminado"
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
};
exports.default = _default;