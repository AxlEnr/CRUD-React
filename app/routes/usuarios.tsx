import { PrivateRoute } from "app/components/Navbar/PrivateRoute";
import { UsuariosPage } from "app/pages/admin/usuarios";

export default function Home() {
  return (
    <PrivateRoute filter={() => {
      return localStorage.getItem("rol") === "admin";
    }}>
      <UsuariosPage />
    </PrivateRoute>
  );
}