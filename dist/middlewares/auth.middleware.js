"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const auth = (req, res, next) => {
  let token = '';
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
    console.log(token);
  }
  if (!token) {
    return res.status(401).json({
      message: "No se proporcionó el token de seguridad"
    });
  }
  _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, (error, decode) => {
    if (error) {
      return res.status(401).json({
        auth: false,
        message: "El token ingresado es incorrecto o ha expirado"
      });
    }
    next();
  });
};
var _default = auth;
exports.default = _default;