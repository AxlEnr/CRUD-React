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

interface OrdenConDetalles {
  idOrden: number;
  detalles: OrdenDetalle[];
}

export function OrdenesPage() {
  const apiUrlBase = getEnviroments().apiUrl;

  // Normalizamos la URL base para que siempre termine en "/"
  const apiUrl = apiUrlBase.endsWith("/") ? apiUrlBase : apiUrlBase + "/";

  const [ordenesConDetalles, setOrdenesConDetalles] = useState<OrdenConDetalles[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // IDs de órdenes a consultar
  const ordenesIds = [1,2,3,4,5,6, 7, 8, 9];

  const obtenerDetallesOrdenes = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const promesas = ordenesIds.map(async (idOrden) => {
        const url = `${apiUrl}api/ordenesDetalles/detallesOrden/${idOrden}`;
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token ?? ""}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error al obtener detalles de la orden ${idOrden}: ${res.statusText}`);
        }

        const data: OrdenDetalle[] = await res.json();

        return {
          idOrden,
          detalles: data,
        };
      });

      const resultados = await Promise.all(promesas);
      setOrdenesConDetalles(resultados);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerDetallesOrdenes();
  }, []);

  return (
    <div className="layout">
      <Navbar />
      <div className="layout-body">
        <Dashboard />
        <main className="ordenes-container">
          <h2>Órdenes con detalles</h2>

          {!loading && !error && ordenesConDetalles.length > 0 ? (
            ordenesConDetalles
              .filter(({ detalles }) => detalles.length > 0) // Solo órdenes con detalles
              .map(({ idOrden, detalles }) => (
                <section key={idOrden} className="orden-detalle">
                  <h3>Orden #{idOrden}</h3>
                  <table className="ordenes-table">
                    <thead>
                      <tr>
                        <th>ID Producto</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                        <th>Marca</th>
                        <th>Imagen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detalles.map((detalle) => (
                        <tr key={detalle.id}>
                          <td>{detalle.id_producto}</td>
                          <td>{detalle.producto.nombre}</td>
                          <td>{detalle.cantidad}</td>
                          <td>${parseFloat(detalle.precio_unitario).toFixed(2)}</td>
                          <td>${(detalle.cantidad * parseFloat(detalle.precio_unitario)).toFixed(2)}</td>
                          <td>{detalle.producto.marca}</td>
                          <td>
                            <img
                              src={detalle.producto.imagen_url}
                              alt={detalle.producto.nombre}
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              ))
          ) : loading ? (
            <p className="loading">Cargando órdenes...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <p>No se encontraron órdenes con detalles.</p>
          )}
        </main>
      </div>
    </div>
  );
}
