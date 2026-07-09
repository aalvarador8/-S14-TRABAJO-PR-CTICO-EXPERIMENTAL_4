import { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

function Register() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    telefono: "",
    direccion: ""
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registrar = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        localStorage.setItem("token", data.token);
        setMensaje("Usuario registrado correctamente");
      } else {
        setMensaje(data.mensaje || "Error al registrar");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Crear cuenta</h1>
        <p>Registra un nuevo usuario</p>

        {mensaje && <div className="mensaje">{mensaje}</div>}

        <form onSubmit={registrar}>
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
          <input name="correo" type="email" placeholder="Correo" value={form.correo} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
          <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
          <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />

          <button type="submit">Registrar</button>
        </form>

        <p className="link-text">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;