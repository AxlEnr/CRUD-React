import Navbar from 'app/components/Navbar/Navbar';
import { motion } from 'framer-motion';

export function Sobrenosotros() {
  return (
    <main className="min-h-screen bg-black text-[var(--ivory-color)] font-[var(--primary-font)] tracking-wide relative overflow-hidden">
      <Navbar />

      <div
        className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-[#101418] @[480px]:rounded-lg min-h-80"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 25%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAojwADDipdCCf9SE9TjokP3QLz_UmGUzpNhuWEcnICICv3WQDdWqR45tyqjf_OYP1i_mB_onmZShWw_GLWtENsykCmFiDnZkiLmYSfvwV0PQHyPwsfOoI69ZxIh1rkwipfkuUyARnv4Ea_VNAJgb34cNcRddkAhUmFevCwQIolygxfFLEAazYAFtVpw5RBm6CkyCVFHbVwNXDdP79PLvJEZoOPtZzjMwMywe6GsxSCD6XhI4ILJ9uawze6fqmb2FJCMgH5pw5hlTe3")',
        }}
      />

      <section className="relative px-6 pt-24 pb-24 max-w-5xl mx-auto">
        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl text-center font-extrabold text-[var(--ivory-color)] mb-16 uppercase tracking-[0.15em]"
        >
          Sobre Nosotros
        </motion.h1>

        {/* Sección de descripción */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-gray-800 to-black p-9 rounded-2xl shadow-2xl space-y-8 text-lg leading-relaxed text-gray-300 backdrop-blur"
        >
          <p>
            En <span className="text-[var(--secondary-color)] font-semibold tracking-wider">Maeka</span>, el perfume no es solo aroma: es una manifestación de elegancia, esencia personal y memoria imborrable.
          </p>
          <p>
            Somos una casa especializada en perfumería de lujo para damas y caballeros. Seleccionamos fragancias exclusivas que reflejan lo clásico, lo moderno y lo exquisito.
          </p>
          <p>
            Nuestra colección nace de una curaduría meticulosa, representando casas perfumistas de renombre internacional, comprometidas con la autenticidad y el arte olfativo.
          </p>
          <p>
            Porque cada fragancia cuenta una historia. Y en <span className="text-[var(--secondary-color)] font-semibold">Maeka</span>, queremos ayudarte a encontrar la tuya.
          </p>
        </motion.div>

        {/* ¿Por qué elegirnos? */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-[var(--secondary-color)] mb-6 uppercase tracking-[0.1em]">
            ¿Por qué elegirnos?
          </h2>
          <ul className="space-y-5 text-[var(--ivory-color)] text-[1.05rem] leading-relaxed">
            <li className="border-b border-[var(--gray-blue-color)] pb-2">Fragancias 100% originales y certificadas</li>
            <li className="border-b border-[var(--gray-blue-color)] pb-2">Presentaciones de lujo y embalaje impecable</li>
            <li className="border-b border-[var(--gray-blue-color)] pb-2">Asesoría olfativa personalizada</li>
            <li className="pb-2">Envíos discretos, protegidos y rápidos a toda la República</li>
          </ul>
        </motion.div>

        {/* Misión */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-[#101418] p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-[22px] text-[var(--secondary-color)] font-bold leading-tight tracking-[-0.015em] mb-3">
            Nuestra Misión
          </h2>
          <p className="text-base font-normal text-gray-300 leading-relaxed">
            En Maeka, nuestra misión es elevar lo cotidiano mediante el poder del aroma. Creemos que la fragancia es más que un toque final; es una expresión de identidad, un potenciador del estado de ánimo y una creadora de recuerdos. Nos esforzamos por crear fragancias que empoderen a las personas a abrazar su identidad única y dejen una huella memorable en el mundo. Nuestro compromiso con la calidad, la artesanía y la sostenibilidad garantiza que cada botella de Maeka sea un testimonio de nuestra dedicación a la excelencia.
          </p>
        </motion.div>

        {/* Galería final */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex w-full grow bg-[#101418] @container p-4 mt-16 rounded-xl"
        >
          <div className="w-full gap-2 overflow-hidden bg-[#101418] @[480px]:gap-3 aspect-[3/2] rounded-lg grid grid-cols-[2fr_1fr_1fr]">
            <div
              className="w-full bg-center bg-no-repeat bg-cover rounded-md row-span-2"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDVTgUXwBK6KGhnx7gYVdwDytU7s1YfLb7-ph4nwovqk9npsgJMOCx_d44VxU6yD87FnEWFjuyz6LywePy_ERg0fVMObMnm6NciEDX5VbT9aZK_mxAwxunL6_m5dBnnlQjoji7c8TXVtMYlEo36d0hFxZ4b62T7rxumXmZ49l4HyhQHPc-C0hWBW13iVsCZq1jbnFt4yHjoq0Nl2oleEHIQb1Sm3LMvOKheiDn_A48foXfiXbARsvzpsx2dFkcEDE5asRwT14UtPRyI")',
              }}
            />
            <div
              className="w-full bg-center bg-no-repeat bg-cover rounded-md col-span-2 row-span-2"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjg_9fIKAQ3N6qB9mfWS5WQ-4qzYgIyGjn7S1QV9YrDivae3GoJ-gr2fuCVDGf3ZWPntkC23yIPyrR5UFu_T0Nb6OUphvL_ZDQD9zShxHOhGefisaybbGgZvMNKCSxpw2AGlzKQ1KbdE95-AGleF5azSOHYZGpwZ69FaBZvHHacyzfC18sjCsSEgBL62tmgJ0mzwZ9TpMljCjhrWvyo5MENcBRt9yV5jOUz239hptJ59-1er-T5F2Br54OKFa-g06lmjsLvdNfrXcD")',
              }}
            />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
