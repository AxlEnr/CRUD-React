// utils/productSearch.ts
import type { Producto } from "app/interfaces/users.interface/productos";
import { getEnviroments } from "../envs/getEnvs";

// Obtenemos la URL base desde las variables de entorno
const apiUrl = getEnviroments().apiUrl;

// Buscar productos filtrados por categoría
export const buscarProductosPorCategoria = async (
  query: string,
  categoriaId: number
): Promise<Producto[]> => {
  try {
    const url = new URL(`${apiUrl}/api/productos/buscar`);
    url.searchParams.append('q', query);
    url.searchParams.append('categoria', categoriaId.toString());

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Error en la búsqueda: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error buscando productos por categoría:", error);
    throw error; // Re-lanzamos el error para manejo superior
  }
};

// Buscar todos los productos sin filtrar por categoría
export const buscarTodosLosProductos = async (
  query: string
): Promise<Producto[]> => {
  try {
    const url = new URL(`${apiUrl}/api/productos/buscar`);
    url.searchParams.append('q', query);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Error en la búsqueda: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error buscando todos los productos:", error);
    throw error; // Re-lanzamos el error para manejo superior
  }
};