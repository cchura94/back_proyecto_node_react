import express from "express"
require('dotenv').config()

import rutasAuth from "./routes/auth.routes.js"

const app = express();

app.use(express.json()) // para capturar datos (req.body)

// habilitamos las rutas con express (app)
app.use("/api", rutasAuth) // rutas o urls de autenticación


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en: http://127.0.0.1:${PORT}`)
})