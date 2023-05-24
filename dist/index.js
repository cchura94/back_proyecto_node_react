"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// const express = require("express");

const app = (0, _express.default)();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en: http://127.0.0.1:${PORT}`);
});