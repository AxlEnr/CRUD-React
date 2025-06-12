import { useState } from "react";
import Swal from "sweetalert2";
import Navbar from "app/components/Navbar/Navbar";
import SubmitButton from "app/components/Button/submitButton";
import type { User } from "app/interfaces/users.interface/createUserInterface";
import { validateFields } from "app/validators/user/validation";
import { checkEmailExists, createUserApi } from "app/services/userService";
import { motion } from "framer-motion";

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
      const validationError = validateFields(user);
      if (validationError) throw new Error(validationError);

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

  const HEIGHT = "h-[550px]"; 

  
  const icons = {
    nombre: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.305 0 4.466.666 6.222 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    apellido: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 7a4 4 0 014 4v1H8v-1a4 4 0 014-4z" />
      </svg>
    ),
    edad: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m-6 0a9 9 0 119-9 9 9 0 01-9 9z" />
      </svg>
    ),
    telefono: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l3.5 7-2.75 1.5a11.042 11.042 0 006.25 6.25l1.5-2.75L19 19v2a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
      </svg>
    ),
    correo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8-4H8m12 8H4m16-8v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8m16 0L12 16 4 8" />
      </svg>
    ),
    contrasena: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zM6 11v6h12v-6" />
      </svg>
    ),
  };

  return (
    <div className="bg-[#101418] min-h-screen text-white">
      <Navbar />

      <main className="flex flex-col lg:flex-row items-center justify-center px-4 py-10 lg:py-20 gap-8">
        <motion.form
          onSubmit={handleSubmit}
          className={`w-full lg:w-[480px] ${HEIGHT} bg-[#1b2028] rounded-xl shadow-xl p-8 flex flex-col justify-between`}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1, duration: 0.5, ease: "easeOut" },
            },
          }}
        >
          <div>
            <motion.h2
              className="text-white text-[32px] font-bold text-center mb-4 tracking-tight"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              ¡Bienvenido!
            </motion.h2>
            <motion.p
              className="text-[#9aa9bc] text-center mb-8"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              ¿Aún no tienes una cuenta? Regístrate aquí.
            </motion.p>

     
            <div className="space-y-3">
              {[
                { name: "nombre", placeholder: "Nombre", type: "text" },
                { name: "apellido", placeholder: "Apellido", type: "text" },
                { name: "edad", placeholder: "Edad", type: "text" },
                { name: "telefono", placeholder: "Número de teléfono", type: "text" },
                { name: "correo", placeholder: "Correo Electrónico", type: "email" },
                { name: "contrasena", placeholder: "Contraseña", type: "password" },
              ].map(({ name, placeholder, type }) => (
                <div
                  key={name}
                  className="flex items-center bg-[#161616] border border-[#394556] rounded-lg overflow-hidden px-3 py-2"
                >
                  <div className="mr-3">{icons[name as keyof typeof icons]}</div>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={user[name as keyof User] as string}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        [name]: e.target.value,
                      })
                    }
                    className="bg-transparent outline-none border-none w-full text-white placeholder:text-gray-400"
                  />
                </div>
              ))}
            </div>
          </div>

          <motion.div variants={{ hidden: { scale: 0.9 }, visible: { scale: 1 } }}>
              <div className="w-full flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-[var(--secondary-color)] text-black font-bold uppercase text-sm tracking-wider px-6 py-3 rounded-lg transition duration-300 hover:bg-black hover:text-gray-300 hover:border hover:border-gray-300"
                >
                  Registrarme
                </button>
              </div>
            </motion.div>
        </motion.form>


        <motion.div
          className={`hidden lg:flex w-1/3 h-[550px] relative bg-center bg-no-repeat bg-cover overflow-hidden bg-[#161512] rounded-xl shadow-lg`}
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuByOTCwY1beDd0nMfvnET2dGVb0pS1gQ6jxtle4NfHEEyisykDmkM0iNzzqpBb8xgowxyyjChQKfL-oFfPQI7cEFM6kwSeKNDB6gvavnENS4A7GTU-2lcybrl6VL-PsJoqHZ_TXaNOLSxVhrg9rz_RBahGwqTR_lkggOrRE3y3nkl0Ciqr2jBPkJClL7I5On7aYZQ682Qg48pr41y9_OYfWVXEQvS_vTLMmUnK-p65gg--rA55XgRjFXFWYs612W8g4CpijheiMPmDg")',
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="absolute bottom-4 right-4 text-white text-sm font-medium">
            <a href="/login">Iniciar Sesión</a>
          </h3>
        </motion.div>
      </main>
    </div>
  );
}
