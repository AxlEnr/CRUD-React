import { useState, useEffect } from "react";
import { getEnviroments } from "app/envs/getEnvs";
import Dashboard from "app/components/Dashboard/Dashboard";
import Navbar from "app/components/Navbar/Navbar";
import "../../styles/OrdenesPage.css";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: number;
  marca: string;
  capacidad: number;
  id_categoria: number;
  imagen_url: string;
  fecha_creacion: string;
}

interface OrdenDetalle {
  id: number;
  id_orden: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: string;
  producto: Producto;
}

interface Orden {
  id: number;
  id_usuario: number;
  id_direccion: number;
  fecha_creacion: string;
  estado: string;
  total: string;
  detalles: OrdenDetalle[];
}

export function OrdenesPage() {
  const apiUrlBase = getEnviroments().apiUrl;
  const apiUrl = apiUrlBase.endsWith("/") ? apiUrlBase : apiUrlBase + "/";

  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const obtenerOrdenes = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${apiUrl}ordenes/allOrdenes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error al obtener órdenes: ${res.statusText}`);
      }

      const data = await res.json();

      setOrdenes(data);
    } catch (err: any) {
      setError(err.message || "Error desconocido al obtener órdenes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerOrdenes();
  }, []);

  return (
    <div className="layout">
      <Navbar />
      <div className="layout-body">
        <Dashboard />
        <main className="ordenes-container">
          <h2>Historial de Órdenes</h2>

          {loading ? (
            <p className="loading">Cargando órdenes...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : ordenes.length === 0 ? (
            <p>No se encontraron órdenes.</p>
          ) : (
            ordenes
              .filter((orden) => orden.detalles && orden.detalles.length > 0)
              .map((orden) => (
                <section key={orden.id} className="orden-detalle">
                  <div className="orden-header">
                    <h3> Orden #{orden.id}</h3>
                    <div className="orden-meta">
                      <span>Fecha: {new Date(orden.fecha_creacion).toLocaleDateString()}</span>
                      <span> Estado: {orden.estado}</span>
                      <span> Total: ${parseFloat(orden.total).toFixed(2)}</span>
                    </div>
                  </div>
                  <table className="ordenes-table">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                        <th>Marca</th>
                        <th>Imagen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orden.detalles.map((detalle) => (
                        <tr key={detalle.id}>
                          <td>
                            <div className="producto-info">
                              <span className="producto-nombre">{detalle.producto.nombre}</span>
                              <span className="producto-id"> ID: {detalle.id_producto}</span>
                            </div>
                          </td>
                          <td>{detalle.cantidad}</td>
                          <td>${parseFloat(detalle.precio_unitario).toFixed(2)}</td>
                          <td>${(detalle.cantidad * parseFloat(detalle.precio_unitario)).toFixed(2)}</td>
                          <td>{detalle.producto.marca}</td>
                          <td>
                            <img
                              src={detalle.producto.imagen_url}
                              alt={detalle.producto.nombre}
                              className="producto-imagen"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              ))
          )}
        </main>
      </div>
    </div>
  );
}
