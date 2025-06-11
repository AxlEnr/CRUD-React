export interface User {
  id: number;
  nombre: string;
  apellido: string | null;
  edad: string | null;
  correo: string;
  contrasena: string;
  telefono: string;
  rol: string;
  fecha_registro: string;  // ISO string
}