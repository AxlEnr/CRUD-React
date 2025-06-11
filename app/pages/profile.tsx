import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../styles/components/card';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  rol: string;
  apellido: string;
}

export default function Profile() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';	
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      console.error("Token o ID de usuario no encontrados en localStorage");
      setLoading(false);
      return;
    }

    fetch(`${apiUrl}/users/${userId}`, {
      headers: {
        'authorization': `Bearer ${token}`,
      }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        setUsuario(data);
        setLoading(false);
    })
    .catch(err => {
        console.error('Error al obtener el usuario:', err);
        setLoading(false);
    });
}, []);

  if (loading) {
    return <div className='text-cemter py-20 text-amber-100'>Cargando Perfil...</div>;
  }

  if (!usuario) {
    return <div className='text-cemter py-20 text-amber-100'>No se encontró el usuario.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Card className="bg-gray-800 border border-amber-700 text-amber-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-serif">Perfil del Usuario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><span className="font-medium text-amber-200">Nombre:</span> {usuario.nombre}</div>
          <div><span className="font-medium text-amber-200">Apellido:</span> {usuario.apellido}</div>
          <div><span className="font-medium text-amber-200">Teléfono:</span> {usuario.telefono}</div>
        </CardContent>
        <CardFooter className="text-sm text-amber-300">
          Última actualización desde el sistema.
        </CardFooter>
      </Card>
    </div>
  );
}

