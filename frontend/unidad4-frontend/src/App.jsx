import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Usuarios from "./pages/Usuarios";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <h2>Unidad 4</h2>
        <div>
          <Link to="/register">Registrar</Link>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/usuarios">Usuarios</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;