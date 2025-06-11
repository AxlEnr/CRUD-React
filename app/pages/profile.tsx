import { useState, useEffect } from 'react';
import { Card } from '../styles/components/card';
import { UserProfileCard } from './UserProfileCard';
import { AddressCard } from './AddressCard';
import { NewAddressForm } from './NewAddressForm';
import type { Direccion, Usuario } from './profile/types';

export default function Profile() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Leer token y userId desde localStorage solo en cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
      setUserId(localStorage.getItem('userId'));
    }
  }, []);

  // Cargar datos de usuario y direcciones
  useEffect(() => {
    if (!token || !userId) return;

    setLoading(true);

    const fetchData = async () => {
      try {
        // Obtener datos del usuario
        const userResponse = await fetch(`${apiUrl}/users/${userId}`, {
          headers: { authorization: `Bearer ${token}` }
        });
        
        if (!userResponse.ok) throw new Error(`Error HTTP: ${userResponse.status}`);
        
        const userData = await userResponse.json();
        setUsuario(userData);

        // Obtener direcciones del usuario
        const addressesResponse = await fetch(`${apiUrl}/direcciones/usuario/${userId}`, {
          headers: { authorization: `Bearer ${token}` }
        });
        
        if (!addressesResponse.ok) throw new Error(`Error HTTP: ${addressesResponse.status}`);
        
        const addressesData = await addressesResponse.json();
        setDirecciones(addressesData);
      } catch (err) {
        console.error('Error al obtener datos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, userId]);

  const handleUpdateUser = async (data: any) => {
    if (!token) return;
    
    try {
      const response = await fetch(`${apiUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          // Incluir campos que el backend espera pero que no se editan
          rol: usuario?.rol || 'user',
          contrasena: data.nueva_contrasena || usuario?.contrasena || '',
          edad: data.edad || usuario?.edad || 0,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar usuario');
      }

      const updatedUser = await response.json();
      setUsuario(updatedUser);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  };

  const handleUpdateDireccion = async (id: number, data: Partial<Direccion>) => {
    if (!token) return;
    
    try {
      const response = await fetch(`${apiUrl}/direcciones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const updatedDireccion = await response.json();
      setDirecciones(direcciones.map(d => d.id === id ? updatedDireccion : d));
    } catch (error) {
      console.error('Error al actualizar dirección:', error);
      throw error;
    }
  };

  const handleCreateDireccion = async (data: Omit<Direccion, 'id'>) => {
    if (!token || !userId) return;
    
    try {
      const response = await fetch(`${apiUrl}/direcciones/usuario/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, id_usuario: userId })
      });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const newDireccion = await response.json();
      setDirecciones([...direcciones, newDireccion]);
    } catch (error) {
      console.error('Error al crear dirección:', error);
      throw error;
    }
  };

  const handleDeleteDireccion = async (id: number) => {
    if (!token) return;

    try {
      const response = await fetch(`${apiUrl}/direcciones/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      setDirecciones(direcciones.filter(d => d.id !== id));
    } catch (error) {
      console.error('Error al eliminar dirección:', error);
      throw error;
    }
  };

  if (loading) {
    return <div className='text-center py-20 text-amber-100'>Cargando Perfil...</div>;
  }

  if (!usuario) {
    return <div className='text-center py-20 text-red-400'>No se encontró el usuario.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Tarjeta de usuario */}
      <UserProfileCard 
        usuario={usuario} 
        onUpdate={handleUpdateUser} 
      />

      {/* Tarjeta de direcciones */}
      <Card className="bg-gray-800 border border-amber-700 text-amber-100 shadow-lg">
        <div className="p-6">
          <h2 className="text-3xl font-serif mb-6">Mis Direcciones</h2>
          
          {direcciones.length === 0 ? (
            <div className="text-center py-4 text-amber-300">
              No tienes direcciones registradas
            </div>
          ) : (
            <div className="space-y-6">
              {direcciones.map(direccion => (
                <AddressCard
                  key={direccion.id}
                  direccion={direccion}
                  onEdit={handleUpdateDireccion}
                  onDelete={handleDeleteDireccion}
                />
              ))}
            </div>
          )}
          
          <NewAddressForm onCreate={handleCreateDireccion} />
        </div>
      </Card>
    </div>
  );
}