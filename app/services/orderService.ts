import { getEnviroments } from "app/envs/getEnvs";
import type { Order } from "app/interfaces/orders/order.interface";

const apiUrl = getEnviroments().apiUrl;
export const createOrder = async (order: Order ) => {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${apiUrl}/ordenes/crearOrden`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(order),
    });

    if (!response.ok) throw new Error(`${response.status}`);

    return response.json();
}

export const getOrders = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${apiUrl}/ordenes/ordenes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
    });

    if (!response.ok) throw new Error(`${response.status}`);

    const data = response.json();
    return data;
}

export const countOrders = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const response = await fetch(`${apiUrl}/carrito/usuario/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error(`${response.status}`);

  const data = await response.json();

  const detallesCount = data.detalles.length;

  return detallesCount;
};
