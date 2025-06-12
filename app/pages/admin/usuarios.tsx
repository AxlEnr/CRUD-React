import { useState, useEffect } from "react";
import { getEnviroments } from "app/envs/getEnvs";
import type { User } from "app/interfaces/users.interface/userInterface";
import "../../styles/usuarios.css";
import Dashboard from "app/components/Dashboard/Dashboard";
import Navbar from "app/components/Navbar/Navbar";

export function UsuariosPage() {
  const apiUrl = getEnviroments().apiUrl;

  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);


  const obtenerUsuarios = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiUrl}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener usuarios");

      const data = await res.json();
      setUsuarios(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cuando ya haya token, obtener usuarios
  useEffect(() => {
    if (token) {
      obtenerUsuarios(token);
    }
  }, [token]);

  return (
    <div className="layout">
      <Navbar />
      <div className="layout-body">
        <Dashboard />
        <main className="usuarios-container">
          <h2>Usuarios</h2>

          {error && <p className="error">{error}</p>}
          {loading ? (
            <p className="loading">Cargando usuarios...</p>
          ) : (
            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Edad</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Rol</th>
                  <th>Contraseña</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido}</td>
                    <td>{usuario.edad || "N/A"}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.telefono || "N/A"}</td>
                    <td>{usuario.rol}</td>
                    <td>{usuario.contrasena ? "******" : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
}
