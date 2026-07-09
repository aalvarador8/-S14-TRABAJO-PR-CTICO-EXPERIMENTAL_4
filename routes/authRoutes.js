const express = require("express");
const router = express.Router();

const {
  registrar,
  login,
  perfil
} = require("../controllers/authController");

const { verificarToken } = require("../middleware/authMiddleware");

router.post("/register", registrar);
router.post("/login", login);
router.get("/perfil", verificarToken, perfil);

module.exports = router;