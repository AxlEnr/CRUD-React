import Dashboard from "app/components/Dashboard/Dashboard";
import Navbar from "app/components/Navbar/Navbar";
import { getEnviroments } from "app/envs/getEnvs";
import type { User } from "app/interfaces/users.interface/createUserInterface";


export function Test() {

/*
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
*/

  return (
    <main>
      <Navbar />
      <Dashboard />
      
    </main>
  );
}
