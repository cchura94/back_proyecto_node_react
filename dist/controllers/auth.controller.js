"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _index = _interopRequireDefault(require("./../database/models/index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = {
  login: async (req, res) => {
    const {
      email,
      password
    } = req.body;
    let user = await _index.default.User.findOne({
      where: {
        email: email
      }
    });

    // si no existe
    if (!user) return res.status(401).json({
      message: "Credenciales Incorrectas"
    });

    // verificar la contraseña
    const correcto = await _bcrypt.default.compare(password, user.password);
    if (correcto) {
      // generar un token JWT
      const payload = {
        id: user.id,
        email: user.email,
        time: new Date()
      };
      const token = _jsonwebtoken.default.sign(payload, process.env.JWT_SECRET || "MI_CODIGO_SECRETO_JWT", {
        expiresIn: 60 * 60
      });
      return res.status(200).json({
        access_token: token,
        user: user,
        error: false
      });
    }
    return res.status(401).json({
      message: "Credenciales Incorrectas"
    });
  },
  registro: async (req, res) => {
    // /api/user/:nombre | req.params.nombre
    // /api/user?q=juan  | req.query.q
    // /api/user         | req.headers
    // /api/user         | req.body
    console.log(req.body);
    const {
      email,
      password
    } = req.body;

    // select * from users where email = req.body.email limit 1
    let user = await _index.default.User.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      // cifrar el password

      const hash = await _bcrypt.default.hash(password, 12);
      // registrar al user
      user = await _index.default.User.create({
        email,
        password: hash
      });
      return res.status(201).json({
        mensaje: "Usuario Registrado",
        data: user
      });
    } else {
      return res.status(422).json({
        mensaje: "El correo ya existe"
      });
    }
  },
  perfil: (req, res) => {
    return res.send("MI PERFIL");
  },
  logout: (req, res) => {}
};
exports.default = _default;