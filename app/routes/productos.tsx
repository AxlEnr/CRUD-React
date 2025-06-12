import { PrivateRoute } from "app/components/Navbar/PrivateRoute";
import { ProductosPage } from "app/pages/admin/productos";

export default function Page() {
  return (
      <PrivateRoute filter={() => {
        return localStorage.getItem("rol") === "admin";
      }}>
        <ProductosPage />
      </PrivateRoute>
    );
}
