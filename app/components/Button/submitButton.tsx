export default function SubmitButton() {
  return (
    <button
      type="submit"
      className="px-6 py-2 rounded-full font-semibold text-[#fff8e7] bg-[#002b5b]
                 hover:bg-[#d4af37] hover:text-[#002b5b]
                 focus:outline-none focus:ring-4 focus:ring-[#d4af37]/50
                 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
    >
      Enviar
    </button>
  );
}
