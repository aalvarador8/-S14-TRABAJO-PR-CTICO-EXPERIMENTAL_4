const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    apellido: {
      type: String,
      trim: true
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      select: false
    },
    telefono: {
      type: String,
      trim: true
    },
    direccion: {
      type: String,
      trim: true
    },
    googleId: {
      type: String
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local"
    },
    rol: {
      type: String,
      enum: ["usuario", "admin"],
      default: "usuario"
    }
  },
  {
    timestamps: true
  }
);

usuarioSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model("Usuario", usuarioSchema);