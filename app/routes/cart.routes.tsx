import {PrivateRoute}  from "app/components/Navbar/PrivateRoute";
import CartPage from "../pages/cart";


export default function Cart() {
  return (
    <PrivateRoute filter={() =>{
      return localStorage.getItem("rol") === "cliente";
    }}>
      <CartPage />
    </PrivateRoute>
  );
}
