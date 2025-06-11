import React, { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Dashboard from "app/components/Dashboard/Dashboard";
import Navbar from "app/components/Navbar/Navbar";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: number;
  marca: string;
  capacidad: number;
  id_categoria: number | null;
  imagen_url: string;
}

export function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [productoActual, setProductoActual] = useState<Producto | null>(null);
  const [mensajeAlerta, setMensajeAlerta] = useState<string | null>(null);
  const [tipoAlerta, setTipoAlerta] = useState<"success" | "error">("success");
  const [productoParaEliminar, setProductoParaEliminar] = useState<Producto | null>(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sIjoiYWRtaW4iLCJpYXQiOjE3NDk0Mjk1MzksImV4cCI6MTc0OTYwMjMzOX0.MyQ-1N8dFDrVcfi0SoEcSOhcyRH8outSdYeSvWyG-pA";

  useEffect(() => {
    fetch("http://20.175.206.106:8080/api/productos/todo")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => {
        const productos = Array.isArray(data) ? data : Array.isArray(data.productos) ? data.productos : [];
        setProductos(productos);
      })
      .catch(() => {
        setProductos([]);
        mostrarAlerta("Error al cargar productos.", "error");
      });
  }, []);

  const mostrarAlerta = (mensaje: string, tipo: "success" | "error") => {
    setMensajeAlerta(mensaje);
    setTipoAlerta(tipo);
    setTimeout(() => setMensajeAlerta(null), 4000);
  };

  const abrirFormulario = (producto: Producto | null) => {
    setProductoActual(producto ? { ...producto, precio: producto.precio.toString() } : {
      id: 0,
      nombre: "",
      descripcion: "",
      precio: "",
      stock: 0,
      marca: "",
      capacidad: 0,
      id_categoria: null,
      imagen_url: "",
    });
    setFormVisible(true);
  };

  const cerrarFormulario = () => {
    setProductoActual(null);
    setFormVisible(false);
  };

  const manejarCambio = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!productoActual) return;
    const { name, value } = e.target;
    setProductoActual(prev => prev ? {
      ...prev,
      [name]: name === "id_categoria" ? (value === "" ? null : Number(value))
        : name === "stock" || name === "capacidad" ? Number(value)
        : value
    } : null);
  };

  const manejarSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productoActual) return;

    const metodo = productoActual.id && productoActual.id !== 0 ? "PUT" : "POST";
    const url = metodo === "PUT"
      ? `http://20.175.206.106:8080/api/productos/actualizar/${productoActual.id}`
      : "http://20.175.206.106:8080/api/productos/crear";

    const precioNumerico = Number(productoActual.precio);

    const payload = {
      nombre: productoActual.nombre,
      descripcion: productoActual.descripcion,
      precio: isNaN(precioNumerico) ? 0 : precioNumerico,
      stock: productoActual.stock,
      marca: productoActual.marca,
      capacidad: productoActual.capacidad,
      id_categoria: productoActual.id_categoria,
      imagen_url: productoActual.imagen_url,
    };

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Error al guardar: ${res.status} - ${await res.text()}`);

      const data = await res.json();

      if (metodo === "PUT") {
        setProductos(prev => prev.map(p => p.id === productoActual.id ? data : p));
        mostrarAlerta("Producto actualizado correctamente.", "success");
      } else {
        setProductos(prev => [...prev, data]);
        mostrarAlerta("Producto creado correctamente.", "success");
      }

      cerrarFormulario();
    } catch (err: any) {
      mostrarAlerta(err.message || "Error al guardar el producto.", "error");
    }
  };

  const solicitarEliminarProducto = (producto: Producto) => setProductoParaEliminar(producto);
  const cancelarEliminar = () => setProductoParaEliminar(null);

  const confirmarEliminar = async () => {
    if (!productoParaEliminar) return;

    try {
      const res = await fetch(`http://20.175.206.106:8080/api/productos/eliminar/${productoParaEliminar.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`Error al eliminar: ${res.status} - ${await res.text()}`);

      setProductos(prev => prev.filter(p => p.id !== productoParaEliminar.id));
      mostrarAlerta("Producto eliminado correctamente.", "success");
    } catch (err: any) {
      mostrarAlerta(err.message || "Error al eliminar el producto.", "error");
    } finally {
      setProductoParaEliminar(null);
    }
  };

  return (
    <main>
      <Navbar />
      <Dashboard />

      <div className="p-4 max-w-5xl mx-auto">
        {mensajeAlerta && (
          <div className={`mb-4 p-3 rounded ${
            tipoAlerta === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {mensajeAlerta}
          </div>
        )}

        <button onClick={() => abrirFormulario(null)} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
          Agregar Producto
        </button>

        {formVisible && productoActual && (
          <form onSubmit={manejarSubmit} className="border p-4 rounded mb-4 shadow" key={productoActual.id}>
            <h2 className="text-lg font-semibold mb-3">
              {productoActual.id !== 0 ? "Editar Producto" : "Nuevo Producto"}
            </h2>

            <input type="text" name="nombre" placeholder="Nombre" value={productoActual.nombre} onChange={manejarCambio} className="border p-2 w-full mb-2 rounded" required />
            <textarea name="descripcion" placeholder="Descripción" value={productoActual.descripcion} onChange={manejarCambio} className="border p-2 w-full mb-2 rounded" required />
            <input type="text" name="precio" placeholder="Precio" value={productoActual.precio} onChange={manejarCambio} className="border p-2 w-full mb-2 rounded" required />
            <input type="number" name="stock" placeholder="Stock" value={productoActual.stock} onChange={manejarCambio} className="border p-2 w-full mb-2 rounded" required min={0} />
            <input type="text" name="marca" placeholder="Marca" value={productoActual.marca} onChange={manejarCambio} className="border p-2 w-full mb-2 rounded" required />
            <input type="number" name="capacidad" placeholder="Capacidad (ml)" value={productoActual.capacidad} onChange={manejarCambio} className="border p-2 w-full mb-2 rounded" required min={0} />
            <input type="number" name="id_categoria" placeholder="ID Categoría" value={productoActual.id_categoria ?? ""} onChange={manejarCambio} className="border p-2 w-full mb-2 rounded" />
            <input type="text" name="imagen_url" placeholder="URL de Imagen" value={productoActual.imagen_url} onChange={manejarCambio} className="border p-2 w-full mb-2 rounded" required />

            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Guardar</button>
              <button type="button" onClick={cerrarFormulario} className="px-4 py-2 bg-gray-500 text-white rounded">Cancelar</button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {productos.map((producto) => (
            <div key={producto.id} className="border rounded-lg p-3 shadow-sm relative">
              <img src={producto.imagen_url} alt={producto.nombre} className="w-full h-auto max-h-70 rounded" />
              <h2 className="text-md font-semibold mt-2">{producto.nombre}</h2>
              <p className="text-xs text-gray-600 truncate">{producto.descripcion}</p>
              <p className="text-xs mt-1">Marca: {producto.marca}</p>
              <p className="text-xs">Capacidad: {producto.capacidad}ml</p>
              <p className="text-xs">Precio: ${producto.precio}</p>
              <p className="text-xs">Stock: {producto.stock}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => abrirFormulario(producto)} className="px-3 py-1 text-sm bg-yellow-400 rounded">Editar</button>
                <button onClick={() => solicitarEliminarProducto(producto)} className="px-3 py-1 text-sm bg-red-500 text-white rounded">Eliminar</button>
              </div>
            </div>
          ))}
        </div>

        {productoParaEliminar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded shadow-lg">
              <p>¿Seguro que deseas eliminar el producto "{productoParaEliminar.nombre}"?</p>
              <div className="mt-4 flex gap-2">
                <button onClick={confirmarEliminar} className="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
                <button onClick={cancelarEliminar} className="px-4 py-2 bg-gray-400 text-white rounded">Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}