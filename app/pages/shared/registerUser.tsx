import { useState } from "react";
import Swal from "sweetalert2";
import Navbar from "app/components/Navbar/Navbar";
import SubmitButton from "app/components/Button/submitButton";
import type { User } from "app/interfaces/users.interface/createUserInterface";
import { validateFields } from "app/validators/user/validation";
import { checkEmailExists, createUserApi } from "app/services/userService";

export function CreateUser() {
    const [user, setUser] = useState<User>({
        nombre: "",
        apellido: "",
        edad: "",
        correo: "",
        contrasena: "",
        fecha_registro: new Date(),
        telefono: "",
        rol: "cliente",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Validaciones
            const validationError = validateFields(user);
            if (validationError) throw new Error(validationError);

            // Validar si el correo existe
            const exists = await checkEmailExists(user.correo);
            if (exists) {
                Swal.fire({
                    title: "Ese correo ya está registrado",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    customClass: {
                        popup: "swal-popup",
                        title: "swal-title",
                        confirmButton: "swal-confirm-btn",
                    },
                    buttonsStyling: false,
                });
                return;
            }

            // Crear usuario
            await createUserApi(user);

            Swal.fire({
                title: "Tu usuario ha sido creado con éxito",
                icon: "success",
                confirmButtonText: "Aceptar",
                customClass: {
                    popup: "swal-popup",
                    title: "swal-title",
                    confirmButton: "swal-confirm-btn",
                },
                buttonsStyling: false,
            });

            setUser({
                nombre: "",
                apellido: "",
                edad: "",
                correo: "",
                contrasena: "",
                fecha_registro: new Date(),
                telefono: "",
                rol: "cliente",
            });
        } catch (error: any) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                confirmButtonText: "Aceptar",
                customClass: {
                    popup: "swal-popup",
                    title: "swal-title",
                    confirmButton: "swal-confirm-btn",
                },
                buttonsStyling: false,
            });
        }
    };

    return (
        <main>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={user.nombre}
                    onChange={(e) => setUser({ ...user, nombre: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Apellido"
                    value={user.apellido}
                    onChange={(e) => setUser({ ...user, apellido: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Edad"
                    value={user.edad}
                    onChange={(e) => setUser({ ...user, edad: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Número de teléfono"
                    value={user.telefono}
                    onChange={(e) => setUser({ ...user, telefono: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={user.correo}
                    onChange={(e) => setUser({ ...user, correo: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={user.contrasena}
                    onChange={(e) => setUser({ ...user, contrasena: e.target.value })}
                />
                <SubmitButton />
            </form>
        </main>
    );
}
