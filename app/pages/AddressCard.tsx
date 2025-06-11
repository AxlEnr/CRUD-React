import { useState } from 'react';
import { Card } from '../styles/components/card';
import type { Direccion } from './profile/types';

interface AddressCardProps {
  direccion: Direccion;
  onEdit: (id: number, data: Partial<Direccion>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function AddressCard({ direccion, onEdit, onDelete }: AddressCardProps) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Direccion>>({
    calle: direccion.calle,
    numero_exterior: direccion.numero_exterior,
    numero_interior: direccion.numero_interior,
    ciudad: direccion.ciudad,
    estado: direccion.estado,
    codigo_postal: direccion.codigo_postal,
    pais: direccion.pais
  });

  const handleSave = async () => {
    try {
      await onEdit(direccion.id, formData);
      setEditMode(false);
    } catch (err) {
      console.error('Error al guardar dirección:', err);
    }
  };

  return (
    <div className="border-b border-amber-700 pb-4">
      {editMode ? (
        <div className="space-y-3">
          <div>
            <label className="block font-medium text-amber-200">Calle:</label>
            <input
              type="text"
              value={formData.calle || ''}
              onChange={(e) => setFormData({...formData, calle: e.target.value})}
              className="w-full bg-gray-700 border border-amber-700 rounded px-3 py-1 text-amber-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-amber-200">Núm. Exterior:</label>
              <input
                type="text"
                value={formData.numero_exterior || ''}
                onChange={(e) => setFormData({...formData, numero_exterior: e.target.value})}
                className="w-full bg-gray-700 border border-amber-700 rounded px-3 py-1 text-amber-100"
              />
            </div>
            <div>
              <label className="block font-medium text-amber-200">Núm. Interior:</label>
              <input
                type="text"
                value={formData.numero_interior || ''}
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
                value={formData.ciudad || ''}
                onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                className="w-full bg-gray-700 border border-amber-700 rounded px-3 py-1 text-amber-100"
              />
            </div>
            <div>
              <label className="block font-medium text-amber-200">Estado:</label>
              <input
                type="text"
                value={formData.estado || ''}
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
                value={formData.codigo_postal || ''}
                onChange={(e) => setFormData({...formData, codigo_postal: e.target.value})}
                className="w-full bg-gray-700 border border-amber-700 rounded px-3 py-1 text-amber-100"
              />
            </div>
            <div>
              <label className="block font-medium text-amber-200">País:</label>
              <input
                type="text"
                value={formData.pais || ''}
                onChange={(e) => setFormData({...formData, pais: e.target.value})}
                className="w-full bg-gray-700 border border-amber-700 rounded px-3 py-1 text-amber-100"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1 rounded text-sm"
            >
              Guardar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="font-medium text-lg mb-2">{direccion.calle} {direccion.numero_exterior}{direccion.numero_interior ? `, Int. ${direccion.numero_interior}` : ''}</div>
          <div>{direccion.ciudad}, {direccion.estado}</div>
          <div>C.P. {direccion.codigo_postal}</div>
          <div>{direccion.pais}</div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={() => setEditMode(true)}
              className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1 rounded text-sm"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(direccion.id)}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}