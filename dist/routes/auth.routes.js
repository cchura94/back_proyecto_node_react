"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _auth = _interopRequireDefault(require("./../controllers/auth.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Route = (0, _express.Router)();
Route.post('/auth/login', _auth.default.login);
Route.post('/auth/registro', _auth.default.registro);
Route.get('/auth/perfil', _auth.default.perfil);
Route.post('/auth/salir', _auth.default.logout);
var _default = Route;
exports.default = _default;