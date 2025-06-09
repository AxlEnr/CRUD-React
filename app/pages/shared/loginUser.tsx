import { loginUserApi } from "app/services/userService";
import type { UserLogin } from "../../interfaces/users.interface/userLogin"
import { validateEmail } from "app/validators/user/validation";
import { useState } from "react"
import Swal from "sweetalert2";
import SubmitButton from "app/components/Button/submitButton";

export function LoginUser(){
    const [loginUser, setLoginUser] = useState<UserLogin>({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        try{
            const validationError = validateEmail(loginUser);
            if (validationError) throw new Error ("El email colocado es invalido");

            const result = await loginUserApi(loginUser);

            localStorage.setItem("token", result.token);
            localStorage.setItem("rol", result.user.rol);

            setLoginUser({
                email: '',
                password: '',
            })

            window.location.href = "/"
        } catch (err: any){
            Swal.fire({
                title: "Error",
                text: err.message,
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

    }

    return (
        <main>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
            }}>

                <input
                type="email"
                placeholder="Correo Electrónico"
                value={loginUser.email}
                onChange={(e) => setLoginUser({...loginUser, email: e.target.value})}
                />

                <input
                placeholder="Contraseña"
                type="password"
                value={loginUser.password}
                onChange={(e) => setLoginUser({...loginUser, password:  e.target.value})}
                />

                <SubmitButton />

            </form>
        </main>
    )
}