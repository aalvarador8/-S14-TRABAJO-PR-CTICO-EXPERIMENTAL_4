const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();

const conectarDB = require("./config/db");
require("./config/passport");

const usuarioRoutes = require("./routes/usuarioRoutes");
const authRoutes = require("./routes/authRoutes");
const googleRoutes = require("./routes/googleRoutes");

const app = express();

conectarDB();

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));

app.use(express.json());

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("API Unidad 4 funcionando correctamente");
});

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", authRoutes);
app.use("/auth", googleRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});