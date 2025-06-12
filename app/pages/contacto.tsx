import Navbar from 'app/components/Navbar/Navbar';
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from 'framer-motion';

export function Contactanos() {
  return (
    <main className="min-h-screen bg-black text-[var(--ivory-color)] font-[var(--primary-font)] relative">
      <Navbar />

      {/* Imagen de fondo principal */}
      <div
        className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-[#101418] @[480px]:rounded-lg min-h-80"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 25%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXGjTya1ZMqmpjAuTnfk4Yj_XG-kYqA0byJ12ck_uglFxOU18ilJQs3fBNb63mkZD8jvtuHsWchLJL78ZympKN1eKccAaRIs26Ex7K0FMWRIIsoaXTU04Eou7S81mKUowu8YQ7JHjhOk_ActMDwa9uAEwGgrnpRARH03BI-ljPJ1IZTyXlHxp6diZna5I4kilBaumk2EW91F3DOTw5Bj2l6EvxxVqqjPU_k2eFF0TQrmjF2L8MwUhmCArY-jKOegTni56sbVji19hL")',
        }}
      />

      <section className="max-w-4xl mx-auto px-6 py-24 text-center space-y-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl text-center font-extrabold text-[var(--ivory-color)] mb-16 uppercase tracking-[0.15em]"
        >
          Contáctanos
        </motion.h1>

        {/* Sección de descripción */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-gray-800 to-black p-9 rounded-2xl shadow-2xl space-y-8 text-lg leading-relaxed text-gray-300 backdrop-blur"
        >
          <p>
           En <span className="text-[var(--secondary-color)] font-semibold tracking-wider">Maeka</span>, estamos aquí para ayudarte. Si tienes alguna pregunta, comentario o simplemente deseas hablar con nosotros, no dudes en escribirnos. 
          </p>
          <p>
           Nuestro equipo está comprometido en brindarte una atención excepcional.
          </p>
        </motion.div>

        <motion.form
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.15,
                duration: 0.5,
                ease: 'easeOut',
              },
            },
          }}
          onSubmit={(e) => e.preventDefault()} // evitar reload para demo
        >
          {[
            { label: "Nombre", placeholder: "Tu nombre", type: "text" },
            { label: "Correo electrónico", placeholder: "Tu correo electrónico", type: "email" },
            { label: "Asunto", placeholder: "Asunto del mensaje", type: "text" }
          ].map((field, idx) => (
            <motion.div
              key={idx}
              className="px-4"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <label className="flex flex-col text-left text-white text-base font-medium pb-2">
                {field.label}
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="mt-1 rounded-lg border border-[#394556] bg-[#1b2028] p-4 text-white placeholder:text-[#9aa9bc] focus:outline-none focus:border-[var(--secondary-color)] transition duration-200"
                  required
                />
              </label>
            </motion.div>
          ))}

          <motion.div
            className="px-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <label className="flex flex-col text-left text-white text-base font-medium pb-2">
              Mensaje
              <textarea
                placeholder="Escribe tu mensaje aquí..."
                className="mt-1 rounded-lg border border-[#394556] bg-[#1b2028] p-4 text-white placeholder:text-[#9aa9bc] min-h-[9rem] resize-none focus:outline-none focus:border-[var(--secondary-color)] transition duration-200"
                required
              ></textarea>
            </label>
          </motion.div>

          <motion.div
            className="px-4 text-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <button
              type="submit"
              className="bg-[var(--secondary-color)] text-black font-bold uppercase text-sm tracking-wider px-10 py-3 rounded-lg transition duration-300 hover:bg-black hover:text-gray-300 hover:border hover:border-gray-300"
            >
              Enviar mensaje
            </button>
          </motion.div>
        </motion.form>


         <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-transparent p-9 rounded-2xl shadow-2xl space-y-5 text-lg leading-relaxed text-gray-300 backdrop-blur"
          >
            <h2 className="text-white text-2xl font-bold mb-10 tracking-tight">Información de contacto</h2>
            
            <p className="flex items-center text-white font-normal gap-3">
              <Phone color="white" size={20} />
              Teléfono: (555) 123-4567
            </p>
            
            <p className="flex items-center text-white font-normal gap-3">
              <Mail color="white" size={20} />
              Correo: contacto@maeka.com
            </p>
            
            <p className="flex items-center text-white font-normal gap-3">
              <MapPin color="white" size={20} />
              Dirección: Calle Fragancia 123, Scentville, CA 90210
            </p>
          </motion.div>

        <motion.div
          className="px-4 pt-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
        >
          <div
            className="w-full aspect-video bg-center bg-cover rounded-lg shadow-lg"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAG8NZjarUpNetL7kwaDyP5R3xXE8XNgALcn_zmZpzYEqYp7s6VOyXK35HGwlIf1XZKL4_g7FRL5VmJpKzRuhX2eXNQP_isybxfzBjkk4cbu2FyDXy0FfL8KHY2q8ShH8MkfKsCWx27z4TCdY70wEIbm1s5E-Dqr1-qzQnhqVWnSNwxwyxjYPILCh6UzUTpxSGoMwppqIjeDHZmpNzNPdheAOEbxlgnOoEH22YUIgvNHmyuR_flzs3Znm4reROziN6yWa_jhW5lzxw1")',
            }}
          ></div>
        </motion.div>
      </section>
    </main>
  );
}
