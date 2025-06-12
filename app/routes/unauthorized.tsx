// app/routes/unauthorized.routes.tsx
export default function UnauthorizedPage() {
  const handleGoBack = () => {
    window.location.href = "/Home";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso no autorizado</h1>
        <p className="text-gray-700 mb-6">
          No tienes permisos para acceder a esta página
        </p>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Volver al inicio de sesión
        </button>
      </div>
    </div>
  );
}