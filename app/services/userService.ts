import { getEnviroments } from "app/envs/getEnvs";
import type { User } from "app/interfaces/users.interface/createUserInterface";
import type { UserLogin } from "app/interfaces/users.interface/userLogin";

const apiUrl = getEnviroments().apiUrl;

export const checkEmailExists = async (correo: string): Promise<boolean> => {
  const response = await fetch(`${apiUrl}/users/`);
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  const users = await response.json();
  if (!Array.isArray(users)) throw new Error("Respuesta inválida");
  return users.some((user: User) => user.correo === correo);
};

export const createUserApi = async (user: User): Promise<User> => {
  const response = await fetch(`${apiUrl}/users/Crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  console.log(response)
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

  return response.json();
};

export const loginUserApi = async (user: UserLogin): Promise<LoginResponse> => {
  const response = await fetch(`${apiUrl}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

  const data = await response.json();
  return data;
};

