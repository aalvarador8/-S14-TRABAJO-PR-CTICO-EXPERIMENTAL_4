import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const listarUsuarios = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMensaje("Primero debes iniciar sesión");
      return;
    }

    try {
      const respuesta = await fetch(`${API_URL}/api/usuarios`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        setUsuarios(data.usuarios || data);
        setMensaje("Usuarios cargados correctamente");
      } else {
        setMensaje(data.mensaje || "No autorizado");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setUsuarios([]);
    setMensaje("Sesión cerrada");
  };

  return (
    <div className="page">
      <div className="card usuarios-card">
        <h1>Usuarios registrados</h1>

        {mensaje && <div className="mensaje">{mensaje}</div>}

        <button onClick={listarUsuarios}>Listar usuarios</button>
        <button className="salir" onClick={cerrarSesion}>Cerrar sesión</button>

        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario._id}>
              <strong>{usuario.nombre}</strong> - {usuario.correo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Usuarios;
