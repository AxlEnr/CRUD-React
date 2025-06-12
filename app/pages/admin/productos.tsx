import React, { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

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
  const [productosOriginales, setProductosOriginales] = useState<Producto[]>([]); // Para mantener copia de todos los productos
  const [formVisible, setFormVisible] = useState(false);
  const [productoActual, setProductoActual] = useState<Producto | null>(null);
  const [mensajeAlerta, setMensajeAlerta] = useState<string | null>(null);
  const [tipoAlerta, setTipoAlerta] = useState<"success" | "error">("success");
  const [productoParaEliminar, setProductoParaEliminar] = useState<Producto | null>(null);
  const [busqueda, setBusqueda] = useState("");

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sIjoiYWRtaW4iLCJpYXQiOjE3NDk0Mjk1MzksImV4cCI6MTc0OTYwMjMzOX0.MyQ-1N8dFDrVcfi0SoEcSOhcyRH8outSdYeSvWyG-pA";

  useEffect(() => {
    fetch("http://localhost:8080/api/productos/todo")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => {
        const productos = Array.isArray(data)
          ? data
          : Array.isArray(data.productos)
            ? data.productos
            : [];
        setProductos(productos);
        setProductosOriginales(productos); // Guardamos copia de todos los productos
      })
      .catch(() => {
        setProductos([]);
        mostrarAlerta("Error al cargar productos.", "error");
      });
  }, []);

  // Efecto para filtrar productos según la búsqueda
  useEffect(() => {
    if (busqueda.trim() === "") {
      setProductos(productosOriginales);
    } else {
      const resultados = productosOriginales.filter(
        (producto) =>
          producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          producto.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
          producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      );
      setProductos(resultados);
    }
  }, [busqueda, productosOriginales]);

  const mostrarAlerta = (mensaje: string, tipo: "success" | "error") => {
    setMensajeAlerta(mensaje);
    setTipoAlerta(tipo);
    setTimeout(() => {
      setMensajeAlerta(null);
    }, 4000);
  };

  const abrirFormulario = (producto: Producto | null) => {
    setProductoActual(
      producto
        ? { ...producto, precio: producto.precio.toString() }
        : {
          id: 0,
          nombre: "",
          descripcion: "",
          precio: "",
          stock: 0,
          marca: "",
          capacidad: 0,
          id_categoria: null,
          imagen_url: "",
        }
    );
    setFormVisible(true);
  };

  const cerrarFormulario = () => {
    setProductoActual(null);
    setFormVisible(false);
  };

  const manejarCambio = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!productoActual) return;
    const { name, value } = e.target;

    setProductoActual((prev) =>
      prev
        ? {
          ...prev,
          [name]:
            name === "id_categoria"
              ? value === ""
                ? null
                : Number(value)
              : name === "stock" || name === "capacidad"
                ? Number(value)
                : value,
        }
        : null
    );
  };

  const manejarSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productoActual) return;

    const metodo =
      productoActual.id && productoActual.id !== 0 ? "PUT" : "POST";
    const url =
      metodo === "PUT"
        ? `http://localhost:8080/api/productos/actualizar/${productoActual.id}`
        : "http://localhost:8080/api/productos/crear";

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

      if (!res.ok) {
        const errorTexto = await res.text();
        throw new Error(`Error al guardar: ${res.status} - ${errorTexto}`);
      }

      const data = await res.json();

      if (metodo === "PUT") {
        setProductos((prev) =>
          prev.map((p) => (p.id === productoActual.id ? data : p))
        );
        mostrarAlerta("Producto actualizado correctamente.", "success");
      } else {
        setProductos((prev) => [...prev, data]);
        mostrarAlerta("Producto creado correctamente.", "success");
      }

      cerrarFormulario();
    } catch (err: any) {
      mostrarAlerta(err.message || "Error al guardar el producto.", "error");
    }
  };


  const solicitarEliminarProducto = (producto: Producto) => {
    setProductoParaEliminar(producto);
  };

  const cancelarEliminar = () => {
    setProductoParaEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!productoParaEliminar) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/productos/eliminar/${productoParaEliminar.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorTexto = await res.text();
        throw new Error(`Error al eliminar: ${res.status} - ${errorTexto}`);
      }

      setProductos((prev) =>
        prev.filter((p) => p.id !== productoParaEliminar.id)
      );
      mostrarAlerta("Producto eliminado correctamente.", "success");
    } catch (err: any) {
      mostrarAlerta(err.message || "Error al eliminar el producto.", "error");
    } finally {
      setProductoParaEliminar(null);
    }
  };

  // ... (mantén todas tus funciones existentes como abrirFormulario, cerrarFormulario, etc.)

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar productos por nombre, marca o descripción..."
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {mensajeAlerta && (
        <div
          className={`mb-4 p-3 rounded ${tipoAlerta === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
            }`}
        >
          {mensajeAlerta}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <button
          onClick={() => abrirFormulario(null)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Agregar Producto
        </button>
      </div>

      {/* ... (mantén el resto de tu JSX existente, como el formulario, la lista de productos y el modal de confirmación) */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div
              key={producto.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={producto.imagen_url}
                alt={producto.nombre}
                className="w-full h-48 object-cover rounded mb-3"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300';
                }}
              />
              <h2 className="text-lg font-semibold">{producto.nombre}</h2>
              <p className="text-sm text-gray-600 line-clamp-2 my-2">
                {producto.descripcion}
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p><span className="font-medium">Marca:</span> {producto.marca}</p>
                <p><span className="font-medium">Capacidad:</span> {producto.capacidad}ml</p>
                <p><span className="font-medium">Stock:</span> {producto.stock}</p>
                <p><span className="font-medium">Precio:</span> ${producto.precio}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => abrirFormulario(producto)}
                  className="px-3 py-1 bg-yellow-500 rounded text-white text-sm hover:bg-yellow-600 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => solicitarEliminarProducto(producto)}
                  className="px-3 py-1 bg-red-600 rounded text-white text-sm hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">
              {busqueda ? "No se encontraron productos que coincidan con tu búsqueda" : "No hay productos disponibles"}
            </p>
          </div>
        )}
      </div>

      {/* Modal de confirmación y formulario (mantén tu código existente) */}
      {/* ... */}
    </div>
  );
}