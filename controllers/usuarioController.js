const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");

const crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo, password, telefono, direccion } = req.body;

    const existeUsuario = await Usuario.findOne({ correo });

    if (existeUsuario) {
      return res.status(400).json({
        mensaje: "El correo ya está registrado"
      });
    }

    let passwordEncriptado = undefined;

    if (password) {
      passwordEncriptado = await bcrypt.hash(password, 10);
    }

    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      password: passwordEncriptado,
      telefono,
      direccion
    });

    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      usuario: nuevoUsuario
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear usuario",
      error: error.message
    });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();

    res.json({
      mensaje: "Lista de usuarios",
      usuarios
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al listar usuarios",
      error: error.message
    });
  }
};

const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener usuario",
      error: error.message
    });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const datosActualizar = { ...req.body };

    if (datosActualizar.password) {
      datosActualizar.password = await bcrypt.hash(datosActualizar.password, 10);
    }

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      datosActualizar,
      { new: true }
    );

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    res.json({
      mensaje: "Usuario actualizado correctamente",
      usuario
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar usuario",
      error: error.message
    });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    res.json({
      mensaje: "Usuario eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar usuario",
      error: error.message
    });
  }
};

module.exports = {
  crearUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
};