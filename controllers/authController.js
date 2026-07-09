const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario._id,
      correo: usuario.correo,
      rol: usuario.rol
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );
};

const registrar = async (req, res) => {
  try {
    const { nombre, apellido, correo, password } = req.body;

    const existeUsuario = await Usuario.findOne({ correo });

    if (existeUsuario) {
      return res.status(400).json({
        mensaje: "El correo ya está registrado"
      });
    }

    const passwordEncriptado = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      password: passwordEncriptado
    });

    const token = generarToken(usuario);

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      token,
      usuario
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al registrar usuario",
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const usuario = await Usuario.findOne({ correo }).select("+password");

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    const passwordCorrecto = await bcrypt.compare(password, usuario.password);

    if (!passwordCorrecto) {
      return res.status(401).json({
        mensaje: "Contraseña incorrecta"
      });
    }

    const token = generarToken(usuario);

    res.json({
      mensaje: "Login correcto",
      token
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error en el login",
      error: error.message
    });
  }
};

const perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id);

    res.json({
      mensaje: "Perfil del usuario autenticado",
      usuario
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener perfil",
      error: error.message
    });
  }
};

module.exports = {
  registrar,
  login,
  perfil
};