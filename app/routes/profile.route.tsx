import { PrivateRoute } from "app/components/Navbar/PrivateRoute";
import Porfile from "../pages/profile";

export default function Cart() {
  return (
    <PrivateRoute filter={() =>{
      return localStorage.getItem("rol") === "cliente" || localStorage.getItem("rol") === "admin";
    }}>
      <Porfile />
    </PrivateRoute>
  );
}
