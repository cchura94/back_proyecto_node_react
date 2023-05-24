// const express = require("express");
import express from "express"
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en: http://127.0.0.1:${PORT}`)
})