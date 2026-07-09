import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    correo: "",
    password: ""
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        localStorage.setItem("token", data.token);
        setMensaje("Login correcto");
        navigate("/usuarios");
      } else {
        setMensaje(data.mensaje || "Error al iniciar sesión");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  const loginGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Iniciar sesión</h1>
        <p>Accede con tu cuenta registrada</p>

        {mensaje && <div className="mensaje">{mensaje}</div>}

        <form onSubmit={iniciarSesion}>
          <input name="correo" type="email" placeholder="Correo" value={form.correo} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />

          <button type="submit">Entrar</button>
        </form>

        <button className="google" onClick={loginGoogle}>
          Iniciar con Google
        </button>

        <p className="link-text">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;