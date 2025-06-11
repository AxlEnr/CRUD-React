import React, { useState } from "react";

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensaje enviado. ¡Gracias por contactarnos!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl shadow">
      <input
        type="text"
        name="name"
        value={form.name}
        placeholder="Nombre"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        placeholder="Correo"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl"
        required
      />
      <textarea
        name="message"
        value={form.message}
        placeholder="Mensaje"
        onChange={handleChange}
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-xl"
        required
      />
      <button
        type="submit"
        className="w-full bg-primary text-white p-3 rounded-xl hover:bg-primary-dark transition"
      >
        Enviar
      </button>
    </form>
  );
};
