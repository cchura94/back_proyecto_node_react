"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _models = _interopRequireDefault(require("./../database/models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = {
  index: async (req, res) => {
    try {
      const q = req.query.q ? req.query.q : '2023-06-29 01:35:54';
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const offset = (page - 1) * limit;
      const pedidos = await _models.default.Pedido.findAndCountAll({
        include: [_models.default.Cliente, _models.default.Producto],
        offset: offset,
        limit: limit
      });
      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  },
  store: async (req, res) => {
    try {
      /*
      {
          clienteId: 10,
          items: [
              {productoId: 2, cantidad: 1},
              {productoId: 5, cantidad: 2},
              {productoId: 1, cantidad: 1}
          ]
      }
      */
      const {
        clienteId,
        items
      } = req.body;
      const fecha = new Date();

      // nuevo Pedido
      const pedido = await _models.default.Pedido.create({
        fecha: fecha,
        estado: 1,
        clienteId: clienteId
      });

      // guardar los productos de venta asociado a pedido
      items.forEach(async producto => {
        // agregamos cada producto al pedido
        await pedido.addProducto(producto.productoId, {
          through: {
            cantidad: producto.cantidad
          }
        });
      });
      return res.status(201).json({
        message: 'Pedido registrado',
        pedido: pedido
      });
    } catch (error) {
      return res.status(422).json({
        message: error.message
      });
    }
  },
  show: async (req, res) => {
    try {
      const id = req.params.id;
      const pedido = await _models.default.Pedido.find({
        where: {
          id: id
        },
        include: [_models.default.Cliente, _models.default.Producto]
      });
      if (pedido.id) {
        return res.status(200).json(pedido);
      } else {
        return res.status(404).json({
          message: "Pedido no existe"
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  },
  update: async (req, res) => {},
  destroy: async (req, res) => {},
  nuevoCliente: async (req, res) => {
    try {
      const {
        nombre_completo,
        correo,
        ci_nit,
        telefono
      } = req.body;
      const cliente = await _models.default.Cliente.create({
        nombre_completo,
        correo,
        ci_nit,
        telefono
      });
      if (cliente.id) {
        return res.status(201).json({
          message: 'Cliente registrado',
          cliente: cliente
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  },
  buscarCliente: async (req, res) => {
    try {
      const q = req.query.buscar;
      const cliente = await _models.default.Cliente.findOne({
        where: {
          nombre_completo: {
            [_sequelize.Op.like]: `%${q}%`
          }
        }
      });
      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }
};
exports.default = _default;