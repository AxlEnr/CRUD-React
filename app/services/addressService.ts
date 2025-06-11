import { getEnviroments } from "app/envs/getEnvs";

export const getAdresses: (() => Promise<any> ) = async () => {
      try {
        const apiUrl = getEnviroments().apiUrl;
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("userId");

        const addressesResponse = await fetch(`${apiUrl}/direcciones/usuario/${userId}`, {
          headers: { authorization: `Bearer ${token}` }
        });
        
        if (!addressesResponse.ok) throw new Error(`Error HTTP: ${addressesResponse.status}`);
        
        return addressesResponse.json();
      } catch (err) {
        console.error('Error al obtener datos:', err);
      } 
};