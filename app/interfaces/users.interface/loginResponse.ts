interface LoginResponse {
  token: string;
  user: {
    id: string;
    correo: string;
    rol: string;
  }
}
