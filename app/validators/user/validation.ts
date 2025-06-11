import type { User } from "app/interfaces/users.interface/createUserInterface";
import type { UserLogin } from "app/interfaces/users.interface/userLogin";

export const validateFields = (user: User): string | null => {
    if (
        !user.nombre.trim() ||
        !user.apellido.trim() ||
        !user.correo.trim() ||
        !user.contrasena.trim() ||
        !user.edad.trim() ||
        !user.telefono.trim()
    ) return "Todos los campos son obligatorios";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.correo)) return "Correo electrónico no válido";

    if (user.contrasena.length < 6) return "La contraseña debe tener al menos 6 caracteres";

    const edad = Number(user.edad);
    if (isNaN(edad) || edad < 0 || edad > 120) return "Edad inválida";

    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(user.telefono)) return "El número de teléfono debe tener exactamente 10 dígitos";

    return null; // todo bien
};

export const validateEmail = (user: UserLogin): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) return "Correo electrónico no válido";

    return null;
}
