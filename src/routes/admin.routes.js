import categoriaController from "../controllers/categoria.controller";
import authMiddleware from "../middlewares/auth.middleware"

const { Router } = require("express");

const Route = Router()

// rutas categoria
Route.get('/categoria', authMiddleware, categoriaController.listar);
Route.post('/categoria', authMiddleware, categoriaController.guardar);
Route.get('/categoria/:id', authMiddleware, categoriaController.mostrar);
Route.put('/categoria/:id', authMiddleware, categoriaController.modificar);
Route.delete('/categoria/:id', authMiddleware, categoriaController.eliminar);



export default Route;