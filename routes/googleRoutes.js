const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user._id,
        correo: req.user.correo,
        rol: req.user.rol
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      mensaje: "Login con Google correcto",
      token,
      usuario: req.user
    });
  }
);

module.exports = router;