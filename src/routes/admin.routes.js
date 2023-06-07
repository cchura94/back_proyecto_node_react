import categoriaController from "../controllers/categoria.controller";

const { Router } = require("express");

const Route = Router()

// rutas categoria
Route.get('/categoria', categoriaController.listar);
Route.post('/categoria', categoriaController.guardar);
Route.get('/categoria/:id', categoriaController.mostrar);
Route.put('/categoria/:id', categoriaController.modificar);
Route.delete('/categoria/:id', categoriaController.eliminar);



export default Route;