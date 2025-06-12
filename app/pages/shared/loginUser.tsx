import { loginUserApi } from "app/services/userService"; 
import type { UserLogin } from "../../interfaces/users.interface/userLogin";
import { validateEmail } from "app/validators/user/validation";
import { useState } from "react";
import Swal from "sweetalert2";
import Navbar from "app/components/Navbar/Navbar";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

export function LoginUser() {
  const [loginUser, setLoginUser] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validationError = validateEmail(loginUser);
      if (validationError) throw new Error("El email colocado es inválido");

      const result = await loginUserApi(loginUser);

      localStorage.setItem("token", result.token);
      localStorage.setItem("rol", result.user.rol);
      localStorage.setItem("userId", result.user.id);  // <-- AGREGADO

      setLoginUser({ email: "", password: "" });
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

  const HEIGHT = "h-[500px]";

  return (
    <div className="bg-[#101418] min-h-screen text-white">
      <Navbar />

      <main className="flex flex-col lg:flex-row items-center justify-center px-4 py-10 lg:py-20 gap-8">
        <motion.div
          className={`hidden lg:flex w-1/3 ${HEIGHT} relative bg-center bg-no-repeat bg-cover overflow-hidden bg-[#181611] rounded-xl shadow-lg`}
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCxke0gJ_w1vhddmzHYf1AEeGPjz4edrEW_iIlSkIKnLNvUpcll09x58B5EgZZ_qXfl9Kird169K0aXozt7Zyq0B0gAgLPFfA_nsGmUzdZD3RxwFf28HjJvXmtBJ3yhaO9jfccsdr7J8LFp-P2MjcY0h9BHfOSsIYLe-Y_btDVhwwoho6NY8JggJ9Jcnd1HFBmCICBScTPvK3PpvTFoZYrPwUDdEX7KqgrqijA1s9yrA03BbxvraOzmxvp7n1xlizXMfgrPn2orXOxC")',
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="absolute bottom-4 left-4 text-white text-sm font-medium">
            <a href="/register">Registrarse</a>
          </h3>
        </motion.div>

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
              transition: { staggerChildren: 0.1, duration: 0.5, ease: "easeOut" }
            }
          }}
        >
          <div>
            <motion.h2
              className="text-white text-[32px] font-bold text-center mb-4 tracking-tight"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              ¡Inicia Sesión!
            </motion.h2>
            <motion.p
              className="text-[#9aa9bc] text-center mb-12"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              ¿Ya tienes una cuenta? Inicia sesión aquí.
            </motion.p>

            <motion.div
              className="mb-5 flex items-center bg-black border border-[#394556] rounded-lg overflow-hidden"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="px-4 bg-black flex items-center justify-center">
                <Mail size={24} className="text-[#9aa9bc]" />
              </div>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="flex-1 h-14 px-4 bg-black text-white placeholder:text-[#9aa9bc] focus:outline-none"
                value={loginUser.email}
                onChange={(e) =>
                  setLoginUser({ ...loginUser, email: e.target.value })
                }
                required
              />
            </motion.div>

            <motion.div
              className="mb-10 flex items-center bg-black border border-[#394556] rounded-lg overflow-hidden"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="px-4 bg-black flex items-center justify-center">
                <Lock size={24} className="text-[#9aa9bc]" />
              </div>
              <input
                type="password"
                placeholder="Contraseña"
                className="flex-1 h-14 px-4 bg-black text-white placeholder:text-[#9aa9bc] focus:outline-none"
                value={loginUser.password}
                onChange={(e) =>
                  setLoginUser({ ...loginUser, password: e.target.value })
                }
                required
              />
            </motion.div>
          </div>

          <div>
            <motion.div
              className="flex items-center justify-between mb-8"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <label className="flex items-center text-sm text-white">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-5 w-5 mr-2 rounded border-[#394556] bg-transparent checked:bg-[#000d1e] checked:border-[#000d1e]"
                />
                Recuérdame
              </label>
              <a
                href="/forgot-password"
                className="text-[#9aa9bc] text-sm underline hover:text-white transition-all"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </motion.div>

            <motion.div variants={{ hidden: { scale: 0.9 }, visible: { scale: 1 } }}>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="bg-[var(--secondary-color)] text-black font-bold uppercase text-sm tracking-wider px-6 py-3 rounded-lg transition duration-300 hover:bg-black hover:text-gray-300 hover:border hover:border-gray-300"
                >
                  Iniciar Sesión
                </button>
              </div>
            </motion.div>
          </div>
        </motion.form>
      </main>
    </div>
  );
}
