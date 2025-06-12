import { useState } from "react";
import Swal from "sweetalert2";
import Navbar from "app/components/Navbar/Navbar";
import { loginUserApi } from "app/services/userService";
import type { UserLogin } from "../../interfaces/users.interface/userLogin";
import { validateEmail } from "app/validators/user/validation";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

export function ForgotPassword() {
  const [loginUser, setLoginUser] = useState<UserLogin>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validationError = validateEmail(loginUser);
      if (validationError) throw new Error("El email colocado es inválido");

      const result = await loginUserApi(loginUser);

      localStorage.setItem("token", result.token);
      localStorage.setItem("rol", result.user.rol);

      Swal.fire({
        title: "Contraseña actualizada",
        text: "Tu contraseña ha sido cambiada con éxito",
        icon: "success",
        confirmButtonText: "Aceptar",
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          confirmButton: "swal-confirm-btn",
        },
        buttonsStyling: false,
      });

      setLoginUser({ email: '', password: '' });
      window.location.href = "/";
    } catch (err: any) {
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
  };

  const HEIGHT = "h-[370px]";

  return (
    <div className="bg-[#101418] min-h-screen text-white">
      <Navbar />

      <main className="flex flex-col lg:flex-row items-center justify-center px-4 py-6 lg:py-20 gap-8">
        <motion.form
          onSubmit={handleSubmit}
          className={`w-full lg:w-[700px] ${HEIGHT} bg-[#1b2028] rounded-xl shadow-xl p-8 flex flex-col justify-between`}
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
          <h2 className="text-3xl font-extrabold text-center text-white mb-1 tracking-tight uppercase">
            Recuperar Contraseña
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-1">
                Correo Electrónico
              </label>
              <div className="flex items-center border border-gray-400 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
                <div className="pl-3">
                  <Mail size={20} className="text-gray-600" />
                </div>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={loginUser.email}
                  onChange={(e) =>
                    setLoginUser({ ...loginUser, email: e.target.value })
                  }
                  className="w-full p-3 bg-transparent focus:outline-none text-black rounded-r-xl"
                  required
                />
              </div>
            </div>

            {/* Password Input with Icon */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1">
                Nueva Contraseña
              </label>
              <div className="flex items-center border border-gray-400 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
                <div className="pl-3">
                  <Lock size={20} className="text-gray-600" />
                </div>
                <input
                  type="password"
                  placeholder="Escribe tu nueva contraseña"
                  value={loginUser.password}
                  onChange={(e) =>
                    setLoginUser({ ...loginUser, password: e.target.value })
                  }
                  className="w-full p-3 bg-transparent focus:outline-none text-black rounded-r-xl"
                  required
                />
              </div>
            </div>

            <motion.div variants={{ hidden: { scale: 0.9 }, visible: { scale: 1 } }}>
              <div className="w-full flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-[var(--secondary-color)] text-black font-bold uppercase text-sm tracking-wider px-6 py-3 rounded-lg transition duration-300 hover:bg-black hover:text-gray-300 hover:border hover:border-gray-300"
                >
                  Recuperar Contraseña
                </button>
              </div>
            </motion.div>
          </form>
        </motion.form>
      </main>
    </div>
  );
}
