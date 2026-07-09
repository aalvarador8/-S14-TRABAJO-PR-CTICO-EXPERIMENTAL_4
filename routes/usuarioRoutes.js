const express = require("express");
const router = express.Router();

const {
  crearUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
} = require("../controllers/usuarioController");

const { verificarToken } = require("../middleware/authMiddleware");

// Ruta pública para crear usuario
router.post("/", crearUsuario);

// Rutas protegidas con JWT
router.get("/", verificarToken, listarUsuarios);
router.get("/:id", verificarToken, obtenerUsuario);
router.put("/:id", verificarToken, actualizarUsuario);
router.delete("/:id", verificarToken, eliminarUsuario);

module.exports = router;