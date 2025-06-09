import Dashboard from "app/components/Dashboard/Dashboard";
import Navbar from "app/components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { getEnviroments } from "app/envs/getEnvs";
import type { User } from "app/interfaces/userInterface";

export function Test() {
  const apiUrl = getEnviroments().apiUrl;
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nombre, setNombre] = useState<string>('');
  const [apellido, setApellido] = useState<string>('');


  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sIjoiYWRtaW4iLCJpYXQiOjE3NDk0Mjk1MzksImV4cCI6MTc0OTYwMjMzOX0.MyQ-1N8dFDrVcfi0SoEcSOhcyRH8outSdYeSvWyG-pA";

  const crearUsuario = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/4`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({nombre, apellido})
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('Usuario creado:', data);

        setNombre('');
        setApellido('');
      } catch (err: any) {
          const message = err instanceof Error ? err.message : 'Error desconocido';
          setError(message);

      } finally {

          setLoading(false);

      }
    };


  return (
    <main>
      <Navbar />
      <Dashboard />
      <h1>PRUEBAS</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        crearUsuario();
        }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        required
        />
        <button type="submit">Enviar</button>
        </form>
      
    </main>
  );
}
