import { PrivateRoute } from "app/components/Navbar/PrivateRoute";
import { OrdenesPage } from "app/pages/admin/ordenes";
import { filter } from "framer-motion/client";

export default function Ordenes() {
  return (
    <PrivateRoute filter={() => {
          return localStorage.getItem("rol") === "admin";
        }}>
          <OrdenesPage />
        </PrivateRoute>
  )
}
