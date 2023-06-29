import categoriaController from "../controllers/categoria.controller";
import productoController from "../controllers/producto.controller";
import userController from "../controllers/usuario.controller";
import clienteController from "../controllers/cliente.controller";
import authMiddleware from "../middlewares/auth.middleware";
import pedidoController from "../controllers/pedido.controller";

const { Router } = require("express");

const Route = Router()

// rutas categoria
Route.get('/categoria', authMiddleware, categoriaController.listar);
Route.post('/categoria', authMiddleware, categoriaController.guardar);
Route.get('/categoria/:id', authMiddleware, categoriaController.mostrar);
Route.put('/categoria/:id', authMiddleware, categoriaController.modificar);
Route.delete('/categoria/:id', authMiddleware, categoriaController.eliminar);

// rutas producto
Route.get('/producto', authMiddleware, productoController.listar);
Route.post('/producto', authMiddleware, productoController.guardar);
Route.get('/producto/:id', authMiddleware, productoController.mostrar);
Route.put('/producto/:id', authMiddleware, productoController.modificar);
Route.delete('/producto/:id', authMiddleware, productoController.eliminar);

// rutas producto
Route.get('/usuario', authMiddleware, userController.listar);
Route.post('/usuario', authMiddleware, userController.guardar);
Route.get('/usuario/:id', authMiddleware, userController.mostrar);
Route.put('/usuario/:id', authMiddleware, userController.modificar);
Route.delete('/usuario/:id', authMiddleware, userController.eliminar);

Route.get('/cliente', authMiddleware, clienteController.index);
Route.post('/cliente', authMiddleware, clienteController.store);
Route.get('/cliente/:id', authMiddleware, clienteController.show);
Route.put('/cliente/:id', authMiddleware, clienteController.update);
Route.delete('/cliente/:id', authMiddleware, clienteController.destroy);

// para pedido
Route.post('/pedido/nuevo-cliente', authMiddleware, pedidoController.nuevoCliente);
Route.get('/pedido/buscar-cliente', authMiddleware, pedidoController.buscarCliente);

Route.get('/pedido', authMiddleware, pedidoController.index);
Route.post('/pedido', authMiddleware, pedidoController.store);
Route.get('/pedido/:id', authMiddleware, pedidoController.show);

export default Route;