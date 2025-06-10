import { useState } from "react";

interface CrearUsuarioProps {
  onUsuarioCreado: () => void;  // Función para refrescar la lista o hacer algo después de crear
}

export function CrearUsuario({ onUsuarioCreado }: CrearUsuarioProps) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rol, setRol] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = "TU_API_URL";  // O importa getEnviroments si tienes
  const token = "TU_TOKEN";

  const crearUsuario = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiUrl}api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          apellido,
          edad,
          correo,
          contrasena,
          telefono,
          rol,
        }),
      });

      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

      await res.json();

      // Limpiar campos
      setNombre("");
      setApellido("");
      setEdad("");
      setCorreo("");
      setContrasena("");
      setTelefono("");
      setRol("");

      onUsuarioCreado(); // Notificar que se creó un usuario
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        crearUsuario();
      }}
      style={{
        display: "grid",
        gap: "0.8rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        marginBottom: "1.5rem",
      }}
    >
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      {/* Más inputs aquí igual que antes */}
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
      <input
        type="number"
        placeholder="Edad"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <input
        type="text"
        placeholder="Rol"
        value={rol}
        onChange={(e) => setRol(e.target.value)}
        required
      />

      <button type="submit" disabled={loading} style={{ gridColumn: "1 / -1" }}>
        {loading ? "Creando..." : "Crear Usuario"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
