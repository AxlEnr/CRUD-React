export interface Direccion {
  id: number;
  calle: string;
  numero_exterior: string;
  numero_interior: string;
  ciudad: string;
  estado: string;
  codigo_postal: string;
  pais: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  edad?: number;
  contrasena?: string;
  rol?: string;
}

export interface UsuarioUpdatePayload {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  edad?: string;
  contrasena_actual?: string;
  nueva_contrasena?: string;
}