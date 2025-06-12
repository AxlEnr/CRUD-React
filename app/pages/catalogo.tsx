import Navbar from 'app/components/Navbar/Navbar';
import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { FiSearch, FiX } from 'react-icons/fi';
import { getEnviroments } from "app/envs/getEnvs";
import type { Producto } from "app/interfaces/users.interface/productos";
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router';


const apiUrl = getEnviroments().apiUrl;

interface CarritoItem extends Producto {
  cantidad: number;
}

export default function CatalogoRoute() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Producto[]>([]);
  const [mensajeAlerta, setMensajeAlerta] = useState<string | null>(null);
  const [tipoAlerta, setTipoAlerta] = useState<"success" | "error">("success");
  const [productoDetalle, setProductoDetalle] = useState<Producto | null>(null);
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const cargarCarrito = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (token && userId) {
        try {
          const res = await fetch(`${apiUrl}/carrito/usuario/${userId}`, {
            headers: { "Authorization": `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setCarrito(data.items || []);
          } else {
            // Si falla fetch remoto, intentar cargar carrito local
            const local = localStorage.getItem("carrito");
            if (local) setCarrito(JSON.parse(local));
          }
        } catch {
          const local = localStorage.getItem("carrito");
          if (local) setCarrito(JSON.parse(local));
        }
      } else {
        const local = localStorage.getItem("carrito");
        if (local) setCarrito(JSON.parse(local));
      }
    };

    cargarCarrito();
  }, []);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const res = await fetch(`${apiUrl}/productos/todo`, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.status === 401) throw new Error("Token inválido o expirado");
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        const prods = Array.isArray(data) ? data : data.productos || [];
        setProductos(prods);
        setFilteredProducts(prods);
      } catch (error: any) {
        console.error(error);
        mostrarAlerta(error.message || "Error al cargar productos.", "error");
        setProductos([]);
        setFilteredProducts([]);
      }
    };

    cargarProductos();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(productos);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const results = productos.filter((producto) => {
        const nombre = producto.nombre?.toLowerCase() || "";
        const marca = producto.marca?.toLowerCase() || "";
        const descripcion = producto.descripcion?.toLowerCase() || "";
        return (
          nombre.includes(lowerSearch) ||
          marca.includes(lowerSearch) ||
          descripcion.includes(lowerSearch)
        );
      });
      setFilteredProducts(results);
    }
  }, [searchTerm, productos]);

  const mostrarAlerta = (mensaje: string, tipo: "success" | "error") => {
    setMensajeAlerta(mensaje);
    setTipoAlerta(tipo);
    setTimeout(() => setMensajeAlerta(null), 4000);
  };

  const agregarAlCarrito = async (producto: Producto) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      mostrarAlerta("Debes iniciar sesión para agregar productos al carrito", "error");
      <Navigate to="/login" />;
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/carrito/usuario/${userId}/agregar/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ id_producto: producto.id, cantidad: 1 })
      });

      if (!response.ok) throw new Error("Error al agregar al carrito");

      setCarrito(prevCarrito => {
        const index = prevCarrito.findIndex(item => item.id === producto.id);
        if (index >= 0) {
          const updated = [...prevCarrito];
          updated[index].cantidad += 1;
          return updated;
        } else {
          return [...prevCarrito, { ...producto, cantidad: 1 }];
        }
      });

      mostrarAlerta(`"${producto.nombre}" agregado al carrito`, "success");
      // Actualizar localStorage también
      localStorage.setItem("carrito", JSON.stringify(carrito));

    } catch {
      mostrarAlerta("Error al agregar al carrito", "error");
    }
  };

  const abrirDetalle = (producto: Producto) => setProductoDetalle(producto);
  const cerrarDetalle = () => setProductoDetalle(null);
  const clearSearch = () => setSearchTerm("");

  const renderProducto = (producto: Producto) => (
    <motion.div
      key={producto.id}
      whileHover={{ scale: 1.03 }}
      className="cursor-pointer rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-gray-700 bg-[var(--ivory-color)/10] transition-all duration-300"
      onClick={() => abrirDetalle(producto)}
    >
      <div className="h-60 w-full overflow-hidden flex justify-center items-center bg-black bg-opacity-5">
        <img
          src={producto.imagen_url}
          alt={producto.nombre}
          className="object-contain h-full max-h-60 w-auto"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
          }}
        />
      </div>

      <div className="p-6 space-y-3 text-[var(--ivory-color)]">
        <h3 className="text-lg font-bold">{producto.nombre}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{producto.descripcion}</p>
        <div className="text-yellow-500 text-sm">★★★★☆ <span className="text-gray-400">(123)</span></div>

        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-gray-800 px-3 py-1 rounded-full">Marca: {producto.marca}</span>
          <span className="bg-gray-800 px-3 py-1 rounded-full">Capacidad: {producto.capacidad}ml</span>
          <span className={`px-3 py-1 rounded-full ${
            producto.stock > 5 ? 'bg-green-800' : 'bg-red-800'
          }`}>
            Stock: {producto.stock}
          </span>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-700 mt-4">
          <span className="text-2xl font-bold text-white">${producto.precio}</span>
          <button
            className="text-gray-400 hover:text-white text-2xl"
            onClick={(e) => {
              e.stopPropagation();
              agregarAlCarrito(producto);
            }}
            aria-label={`Agregar ${producto.nombre} al carrito`}
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderSection = (idCategoria: number, title: string) => (
    <div className="mb-16" key={idCategoria}>
      <h2 className="text-2xl font-semibold text-[var(--ivory-color)] mb-8 tracking-wide uppercase">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts
          .filter(p => p.id_categoria === idCategoria)
          .map(renderProducto)}
      </div>
    </div>
  );

  return (
    <main>
      <Navbar />

      <section className="p-4 max-w-6xl mx-auto">
        {mensajeAlerta && (
          <div className={`mb-4 p-3 rounded ${tipoAlerta === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {mensajeAlerta}
          </div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl text-center font-extrabold text-[var(--ivory-color)] mb-16 uppercase tracking-[0.15em]"
        >
          Nuestros Productos
        </motion.h1>

        {/* Barra de búsqueda */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 relative"
        >
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos por nombre, marca o descripción..."
              className="w-full bg-transparent border border-gray-700 rounded-lg py-3 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition"
              aria-label="Buscar productos"
            />
            <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Limpiar búsqueda"
              >
                <FiX />
              </button>
            )}
          </div>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-[var(--ivory-color)] mb-8 tracking-wide uppercase">Hombres</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.filter(p => p.id_categoria === 1).map(renderProducto)}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-[var(--ivory-color)] mb-8 tracking-wide uppercase">Mujeres</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.filter(p => p.id_categoria === 2).map(renderProducto)}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-[var(--ivory-color)] mb-8 tracking-wide uppercase">Más Vendidos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.filter(p => p.id_categoria === 3).map(renderProducto)}
          </div>
        </div>
      </section>

      {productoDetalle && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 "
          onClick={cerrarDetalle}
        >
          <div
            className="bg-[var(--ivory-color)/10] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 flex flex-col sm:flex-row gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={productoDetalle.imagen_url}
              alt={productoDetalle.nombre}
              className="rounded-3xl max-w-[300px] object-contain self-center"
            />
            <div className="flex flex-col justify-between w-full">
              <div>
                <h2 className="text-4xl font-bold text-wite-900 mb-6">{productoDetalle.nombre}</h2>
                <p className="text-wite-700 mb-4">{productoDetalle.descripcion}</p>
                <div className="text-wite-600 space-y-2 mt-4">
                  <p><strong>Marca:</strong> {productoDetalle.marca}</p>
                  <p><strong>Capacidad:</strong> {productoDetalle.capacidad} ml</p>
                  <p><strong>Stock:</strong> {productoDetalle.stock}</p>
                  <p className="text-2xl font-bold mt-5">${productoDetalle.precio}</p>
                </div>
              </div>
              <div className="mt-8 flex justify-between items-center gap-6">
                <button
                  className="bg-[var(--secondary-color)] hover:bg-[var(--extra)] text-black px-6 py-3 rounded-xl text-sm font-semibold transition"
                  onClick={() => agregarAlCarrito(productoDetalle)}
                >
                  Agregar al carrito
                </button>
                <button
                  onClick={cerrarDetalle}
                  className="bg-[var(--secondary-color)] hover:bg-[var(--extra)] text-black px-6 py-3 rounded-xl text-sm font-semibold transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mensajeAlerta && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded shadow-lg text-white text-center transition-all duration-300 ${
            tipoAlerta === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {mensajeAlerta}
        </div>
      )}
    </main>
  );
}
