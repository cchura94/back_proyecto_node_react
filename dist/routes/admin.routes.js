"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _categoria = _interopRequireDefault(require("../controllers/categoria.controller"));
var _producto = _interopRequireDefault(require("../controllers/producto.controller"));
var _usuario = _interopRequireDefault(require("../controllers/usuario.controller"));
var _cliente = _interopRequireDefault(require("../controllers/cliente.controller"));
var _auth = _interopRequireDefault(require("../middlewares/auth.middleware"));
var _pedido = _interopRequireDefault(require("../controllers/pedido.controller"));
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// subida de archvios o imagenes

const storage = _multer.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/imagenes');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = (0, _multer.default)({
  storage: storage
});
const {
  Router
} = require("express");
const Route = Router();

// actualizar imagen productos
Route.post('/producto/:id/actualizar-imagen', _auth.default, upload.single("imagen"), _producto.default.actualizarImagen);

// rutas categoria
Route.get('/categoria', _auth.default, _categoria.default.listar);
Route.post('/categoria', _auth.default, _categoria.default.guardar);
Route.get('/categoria/:id', _auth.default, _categoria.default.mostrar);
Route.put('/categoria/:id', _auth.default, _categoria.default.modificar);
Route.delete('/categoria/:id', _auth.default, _categoria.default.eliminar);

// rutas producto
Route.get('/producto', _auth.default, _producto.default.listar);
Route.post('/producto', _auth.default, _producto.default.guardar);
Route.get('/producto/:id', _auth.default, _producto.default.mostrar);
Route.put('/producto/:id', _auth.default, _producto.default.modificar);
Route.delete('/producto/:id', _auth.default, _producto.default.eliminar);

// rutas producto
Route.get('/usuario', _auth.default, _usuario.default.listar);
Route.post('/usuario', _auth.default, _usuario.default.guardar);
Route.get('/usuario/:id', _auth.default, _usuario.default.mostrar);
Route.put('/usuario/:id', _auth.default, _usuario.default.modificar);
Route.delete('/usuario/:id', _auth.default, _usuario.default.eliminar);
Route.get('/cliente', _auth.default, _cliente.default.index);
Route.post('/cliente', _auth.default, _cliente.default.store);
Route.get('/cliente/:id', _auth.default, _cliente.default.show);
Route.put('/cliente/:id', _auth.default, _cliente.default.update);
Route.delete('/cliente/:id', _auth.default, _cliente.default.destroy);

// para pedido
Route.post('/pedido/nuevo-cliente', _auth.default, _pedido.default.nuevoCliente);
Route.get('/pedido/buscar-cliente', _auth.default, _pedido.default.buscarCliente);
Route.get('/pedido', _auth.default, _pedido.default.index);
Route.post('/pedido', _auth.default, _pedido.default.store);
Route.get('/pedido/:id', _auth.default, _pedido.default.show);
var _default = Route;
exports.default = _default;