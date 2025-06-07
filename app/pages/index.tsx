import { useEffect, useState } from 'react';
import { getEnviroments } from 'app/envs/getEnvs';
import type { Profesor } from 'app/interfaces/userInterface';



export function Index() {
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = getEnviroments().apiUrl;

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data.profesores)) {
          throw new Error('La respuesta no contiene un array de profesores');
        }

        setProfesores(data.profesores);
      } catch (err: any) {
        console.error('Error al obtener los profesores:', err);
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchProfesores();
  }, []);


    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    

  return (
    <main>
      <h1 className="text-xl font-bold mb-4">Lista de Profesores</h1>
      <ul>
        {profesores.map((prof, i) => (
          <li key={i} className="mb-2">
            <strong>Nombre:</strong> {prof.nombre} <br />
            <strong>Correo:</strong> {prof.correo}
            <strong>Contrasena: </strong> {prof.contrasena}
          </li>
        ))}
      </ul>
      <div className='w-screen h-screen flex items-center justify-center'>
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2">
          <div className="w-full h-full object-cover relative opacity-40 hover:opacity-100 transition-all">
              <img
                  src="/assets/imgs/menLS.webp"
                  alt="Hombre"
                  className="w-full h-full object-cover "
              />
              <h2 
              className="absolute inset-0 flex items-end justify-center text-white text-6xl font-bold mb-20 primaryFont">
                  Fragancias para hombre
              </h2>
          </div>
          <div className="w-full h-full object-cover opacity-40 hover:opacity-100 relative transition-all">
              <img
                  src="/assets/imgs/wmnLS.jpeg"
                  alt="Mujer"
                  className="w-full h-full object-cover "
              />
              <h2 
              className="absolute inset-0 flex items-end justify-center text-white text-6xl font-bold mb-20 primaryFont">
                  Fragancias para mujer
              </h2>

          </div>
              
          
        </div>        
      </div>

    </main>
  );
}
