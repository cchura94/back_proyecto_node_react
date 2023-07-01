"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _authRoutes = _interopRequireDefault(require("./routes/auth.routes.js"));
var _adminRoutes = _interopRequireDefault(require("./routes/admin.routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
require('dotenv').config();
const app = (0, _express.default)();

// habilitamos CORS
app.use((0, _cors.default)());
app.use(_express.default.json()); // para capturar datos (req.body)

// archivos estaticos
app.use(_express.default.static('public'));

// habilitamos las rutas con express (app)
app.use("/api", _authRoutes.default); // rutas o urls de autenticación
app.use("/api", _adminRoutes.default); // rutas o urls de autenticación

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en: http://127.0.0.1:${PORT}`);
});