import Navbar from 'app/components/Navbar/Navbar';
import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';

import { getEnviroments } from "app/envs/getEnvs";
const apiUrl = getEnviroments().apiUrl;

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

interface CarritoItem extends Producto {
  cantidad: number;
}

export function Index() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [mensajeAlerta, setMensajeAlerta] = useState<string | null>(null);
  const [tipoAlerta, setTipoAlerta] = useState<"success" | "error">("success");
  const [productoDetalle, setProductoDetalle] = useState<Producto | null>(null);
  const [productoParaCarrito, setProductoParaCarrito] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState<number>(1);
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const cargarCarrito = async () => {
      if (token && userId) {
        try {
          const response = await fetch(`${apiUrl}/carrito/usuario/${userId}`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setCarrito(data.items || []);
          }
        } catch (error) {
          console.error("Error al cargar carrito:", error);
          const carritoGuardado = localStorage.getItem("carrito");
          if (carritoGuardado) {
            setCarrito(JSON.parse(carritoGuardado));
          }
        }
      } else {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
          setCarrito(JSON.parse(carritoGuardado));
        }
      }
    };

    cargarCarrito();
  }, []);

  useEffect(() => {
    const containers = document.querySelectorAll('.video-container');
    containers.forEach(container => {
      const video = container.querySelector('video');
      container.addEventListener('mouseenter', () => video?.play());
      container.addEventListener('mouseleave', () => video?.pause());
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${apiUrl}/productos/todo`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Token inválido o expirado");
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => {
        const productos = Array.isArray(data) ? data : data.productos || [];
        setProductos(productos);
      })
      .catch((error) => {
        console.error(error);
        setProductos([]);
        mostrarAlerta(error.message || "Error al cargar productos.", "error");
      });
  }, []);

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
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/carrito/usuario/${userId}/agregar/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          id_producto: producto.id,
          cantidad: 1 // Cantidad fija de 1 por cada clic
        })
      });

      if (!response.ok) {
        throw new Error("Error al agregar al carrito");
      }

      // Actualizar carrito local
      const nuevoCarrito = [...carrito];
      const indice = nuevoCarrito.findIndex(item => item.id === producto.id);
      
      if (indice >= 0) {
        nuevoCarrito[indice].cantidad += 1;
      } else {
        nuevoCarrito.push({...producto, cantidad: 1});
      }

      setCarrito(nuevoCarrito);
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      mostrarAlerta(`"${producto.nombre}" agregado al carrito`, "success");
    } catch (error) {
      console.error(error);
      mostrarAlerta("Error al agregar al carrito", "error");
    }
  };


  const abrirDetalle = (producto: Producto) => {
    setProductoDetalle(producto);
    setCantidad(1);
  };

  const cerrarDetalle = () => {
    setProductoDetalle(null);
  };

  const abrirConfirmarCarrito = (producto: Producto) => {
    setProductoParaCarrito(producto);
    setCantidad(1);
  };

  const cerrarConfirmarCarrito = () => {
    setProductoParaCarrito(null);
  };

  const confirmarAgregarCarrito = () => {
    if (productoParaCarrito && cantidad > 0) {
      agregarAlCarrito(productoParaCarrito);
      cerrarConfirmarCarrito();
    } else {
      mostrarAlerta("Selecciona una cantidad válida.", "error");
    }
  };

  const eliminarDelCarrito = async (id: number) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      mostrarAlerta("Debes iniciar sesión para modificar el carrito", "error");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/carrito/usuario/${userId}/eliminar/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Error al eliminar del carrito");
      }

      // Actualizar estado local
      const nuevoCarrito = carrito.filter(item => item.id !== id);
      setCarrito(nuevoCarrito);
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    } catch (error) {
      console.error(error);
      mostrarAlerta("Error al eliminar del carrito", "error");
    }
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + Number(item.precio) * item.cantidad, 0);

 const renderProducto = (producto: Producto) => (
    <motion.div
      key={producto.id}
      whileHover={{ scale: 1.03 }}
      className="cursor-pointer bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl border border-gray-200"
      onClick={() => abrirDetalle(producto)}
    >
      <img
        src={producto.imagen_url}
        alt={producto.nombre}
        className="mx-auto h-88 w-auto object-contain"
      />
      <div className="p-6 space-y-3">
        <h3 className="text-lg font-bold text-gray-800">{producto.nombre}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{producto.descripcion}</p>
        <div className="flex items-center gap-2 text-yellow-500 text-sm">
          ★★★★☆ <span className="text-gray-400">(123)</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm mt-1">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Marca: {producto.marca}</span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Capacidad: {producto.capacidad}ml</span>
          <span className={`px-3 py-1 rounded-full ${producto.stock > 5 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            Stock: {producto.stock}
          </span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-3">
          <span className="text-2xl font-bold text-black">${producto.precio}</span>
          <button
            className="text-gray-600 hover:text-black-800 text-2xl"
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


  return (
    <main>
      <Navbar />

      <section className="video-section mb-16">
        <div className="logo-image">
          <img src="/assets/imgs/maeka.png" className="background-image" alt="logo" />
        </div>
        <div className="video-container">
          <img src="/assets/imgs/Dior.jpg" className="background-image" alt="Hombre" />
          <video src="/assets/videos/hombre.mp4" className="video" muted preload="auto" playsInline loop />
        </div>
        <div className="video-container">
          <img src="/assets/imgs/gdior.webp" className="background-image" alt="Mujer" />
          <video src="/assets/videos/mujer.mp4" className="video" muted preload="auto" playsInline loop />
        </div>
      </section>

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

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-[var(--ivory-color)] mb-8 tracking-wide uppercase">Hombres</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.filter(p => p.id_categoria === 1).map(renderProducto)}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-[var(--ivory-color)] mb-8 tracking-wide uppercase">Mujeres</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.filter(p => p.id_categoria === 2).map(renderProducto)}
          </div>
        </div>

       <div className="mb-10">
          <h2 className="text-2xl font-semibold text-[var(--ivory-color)] mb-8 tracking-wide uppercase">Más Vendidos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productos.filter(p => p.id_categoria === 3).map(renderProducto)}
          </div>
        </div>
      </section>

{/* Modal detalle producto */}
      {productoDetalle && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={cerrarDetalle}
          role="dialog"
          aria-modal="true"
          aria-labelledby="detalleTitulo"
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 flex flex-col sm:flex-row gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={productoDetalle.imagen_url}
              alt={productoDetalle.nombre}
              className="rounded-3xl max-w-[300px] object-contain self-center "
            />
            <div className="flex flex-col justify-between">
              <div>
                <h2 id="detalleTitulo" className="text-4xl font-bold text-gray-900 mb-10 mt-6">{productoDetalle.nombre}</h2>
                <p className="text-gray-700 mb-4">{productoDetalle.descripcion}</p>
                <div className="text-gray-600 space-y-1 mt-4">
                  <p><strong>Marca:</strong> {productoDetalle.marca}</p>
                  <p><strong>Capacidad:</strong> {productoDetalle.capacidad} ml</p>
                  <p><strong>Stock:</strong> {productoDetalle.stock}</p>
                  <p className="text-2xl font-bold mt-5">${productoDetalle.precio}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button
                  className="bg-[var(--secondary-color)] text-white px-4 py-2 rounded hover:bg-[var(--extra)] transition space-x-1"
                  onClick={() => agregarAlCarrito(productoDetalle)}
                >
                  Agregar al carrito
                </button>
              </div>

              <button
                onClick={cerrarDetalle}
                className="mt-4 text-gray-500 hover:text-gray-800 self-end"
                aria-label="Cerrar detalle de producto"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}



{/* Mensaje de alerta */}
      {mensajeAlerta && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded shadow-lg text-black text-center transition-all duration-300 ${
            tipoAlerta === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          role="alert"
          aria-live="assertive"
        >
          {mensajeAlerta}
        </div>
      )}
    </main>
  );
}

export default Index;