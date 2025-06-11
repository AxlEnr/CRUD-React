import { useState } from 'react';
import type { Direccion } from './profile/types';

interface NewAddressFormProps {
  onCreate: (data: Omit<Direccion, 'id'>) => Promise<void>;
}

export function NewAddressForm({ onCreate }: NewAddressFormProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Omit<Direccion, 'id'>>({
    calle: '',
    numero_exterior: '',
    numero_interior: '',
    ciudad: '',
    estado: '',
    codigo_postal: '',
    pais: ''
  });

  const handleCreate = async () => {
    try {
      await onCreate(formData);
      setIsCreating(false);
      setFormData({
        calle: '',
        numero_exterior: '',
        numero_interior: '',
        ciudad: '',
        estado: '',
        codigo_postal: '',
        pais: ''
      });
    } catch (err) {
      console.error('Error al crear dirección:', err);
    }
  };

  return (
    <div className="pt-4">
      {isCreating ? (
        <div className="space-y-3">
          <h3 className="text-xl font-medium text-amber-200 mb-3">Nueva Dirección</h3>
          <div>
            <label className="block font-medium text-amber-200">Calle:</label>
            <input
              type="text"
              value={formData.calle}
              onChange={(e) => setFormData({...formData, calle: e.target.value})}
              className="w-full bg-gray-700 border border-amber-700 rounded px-3 py-1 text-amber-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-amber-200">Núm. Exterior:</label>
              <input
                type="text"
                value={formData.numero_exterior}
                onChange={(e) => setFormData({...formData, numero_exterior: e.target.value})}
                className="w-full bg-gray-700 border border-amber-700 rounded px-3 py-1 text-amber-100"
              />
            </div>
            <div>
              <label className="block font-medium text-amber-200">Núm. Interior:</label>
              <input
                type="text"
                value={formData.numero_interior}
                onChange={(e) => setFormData({...formData, numero_interior: e.target.value})}
                className="w-full bg-gray-700 border border-amber-700 rounded px-3 py-1 text-amber-100"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-amber-200">Ciudad:</label>
              <input
                type="text"
                value={formData.ciudad}
                onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                className="w-full bg-gray-700 border border-amber-700 rounded px-3 py-1 text-amber-100"
              />
            </div>
            <div>
              <label className="block font-medium text-amber-200">Estado:</label>
              <input
                type="text"
                value={formData.estado}
                onChange={(e) => setFormData({...formData, estado: e.target.value})}
                className="w-full bg-gray-700 border border-amber-700 rounded px-3 py-1 text-amber-100"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-amber-200">Código Postal:</label>
              <input
                type="text"
                value={formData.codigo_postal}
                onChange={(e) => setFormData({...formData, codigo_postal: e.target.value})}
                className="w-full bg-gray-700 border border-amber-700 rounded px-3 py-1 text-amber-100"
              />
            </div>
            <div>
              <label className="block font-medium text-amber-200">País:</label>
              <input
                type="text"
                value={formData.pais}
                onChange={(e) => setFormData({...formData, pais: e.target.value})}
                className="w-full bg-gray-700 border border-amber-700 rounded px-3 py-1 text-amber-100"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={() => setIsCreating(false)}
              className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreate}
              className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1 rounded text-sm"
            >
              Guardar Dirección
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsCreating(true)}
          className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded"
        >
          + Agregar Nueva Dirección
        </button>
      )}
    </div>
  );
}