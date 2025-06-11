import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../styles/components/card';
import type { Usuario } from './profile/types';
import type { UsuarioUpdatePayload } from './profile/types';

interface UserProfileCardProps {
  usuario: Usuario;
  onUpdate: (data: UsuarioUpdatePayload) => Promise<void>;
}

export function UserProfileCard({ usuario, onUpdate }: UserProfileCardProps) {
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [formData, setFormData] = useState<UsuarioUpdatePayload>({
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    telefono: usuario.telefono,
    email: usuario.email,
    edad: usuario.edad?.toString(),
  });
  const [passwordData, setPasswordData] = useState({
    contrasena_actual: '',
    nueva_contrasena: '',
  });
  const [error, setError] = useState('');

  const handleUpdateUser = async () => {
    try {
      await onUpdate(formData);
      setEditMode(false);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar usuario');
    }
  };

  const handleUpdatePassword = async () => {
    if (!passwordData.contrasena_actual || !passwordData.nueva_contrasena) {
      setError('Ambos campos de contraseña son requeridos');
      return;
    }

    try {
      await onUpdate({
        ...formData,
        contrasena_actual: passwordData.contrasena_actual,
        nueva_contrasena: passwordData.nueva_contrasena,
      });
      setPasswordMode(false);
      setPasswordData({ contrasena_actual: '', nueva_contrasena: '' });
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar contraseña');
    }
  };

  return (
    <Card className="bg-gray-800 border border-amber-700 text-amber-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-serif flex justify-between items-center">
          Perfil del Usuario
          <button 
            onClick={() => {
              setEditMode(!editMode);
              setPasswordMode(false);
            }}
            className="text-sm bg-amber-700 hover:bg-amber-600 px-3 py-1 rounded"
          >
            {editMode ? 'Cancelar' : 'Editar'}
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <div className="text-red-400">{error}</div>}
        
        {editMode ? (
          <>
            <div className="space-y-3">
              <div>
                <label className="block font-medium text-amber-200">Nombre:</label>
                <input 
                  value={formData.nombre} 
                  onChange={e => setFormData({ ...formData, nombre: e.target.value })} 
                  className="w-full bg-gray-700 p-2 rounded" 
                />
              </div>
              <div>
                <label className="block font-medium text-amber-200">Apellido:</label>
                <input 
                  value={formData.apellido} 
                  onChange={e => setFormData({ ...formData, apellido: e.target.value })} 
                  className="w-full bg-gray-700 p-2 rounded" 
                />
              </div>
              
              <div>
                <label className="block font-medium text-amber-200">Teléfono:</label>
                <input 
                  value={formData.telefono} 
                  onChange={e => setFormData({ ...formData, telefono: e.target.value })} 
                  className="w-full bg-gray-700 p-2 rounded" 
                />
              </div>
              {formData.edad !== undefined && (
                <div>
                  <label className="block font-medium text-amber-200">Edad:</label>
                  <input 
                    value={formData.edad} 
                    onChange={e => setFormData({ ...formData, edad: e.target.value })} 
                    className="w-full bg-gray-700 p-2 rounded" 
                    type="number"
                  />
                </div>
              )}
              
              <div className="pt-2">
                {!passwordMode ? (
                  <button 
                    onClick={() => setPasswordMode(true)}
                    className="text-sm bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded"
                  >
                    Cambiar Contraseña
                  </button>
                ) : (
                  <div className="space-y-3 border-t border-amber-700 pt-3">
                    <h4 className="font-medium text-amber-200">Cambiar Contraseña</h4>
                    <div>
                      <label className="block font-medium text-amber-200">Contraseña Actual:</label>
                      <input
                        type="password"
                        value={passwordData.contrasena_actual}
                        onChange={e => setPasswordData({...passwordData, contrasena_actual: e.target.value})}
                        className="w-full bg-gray-700 p-2 rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-amber-200">Nueva Contraseña:</label>
                      <input
                        type="password"
                        value={passwordData.nueva_contrasena}
                        onChange={e => setPasswordData({...passwordData, nueva_contrasena: e.target.value})}
                        className="w-full bg-gray-700 p-2 rounded"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleUpdatePassword}
                        className="bg-amber-600 hover:bg-amber-500 px-3 py-1 rounded text-sm"
                      >
                        Guardar Contraseña
                      </button>
                      <button
                        onClick={() => setPasswordMode(false)}
                        className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <button 
              onClick={handleUpdateUser}
              className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded mt-2"
            >
              Guardar Cambios
            </button>
          </>
        ) : (
          <>
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Apellido:</strong> {usuario.apellido}</p>
            
            <p><strong>Teléfono:</strong> {usuario.telefono}</p>
            {usuario.edad && <p><strong>Edad:</strong> {usuario.edad}</p>}
          </>
        )}
      </CardContent>
      <CardFooter className="text-sm text-amber-300">Última actualización desde el sistema.</CardFooter>
    </Card>
  );
}