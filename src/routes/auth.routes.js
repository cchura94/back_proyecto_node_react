import { Router } from "express"
import authController from "./../controllers/auth.controller";

const Route = Router()

Route.post('/auth/login', authController.login);
Route.post('/auth/registro', authController.registro);
Route.get('/auth/perfil', authController.perfil);
Route.post('/auth/salir', authController.logout);

export default Route;