import { PrivateRoute } from "app/components/Navbar/PrivateRoute";
import Checkout from "app/pages/user/checkout";

export default function CheckoutRoute(){
    return (
        <PrivateRoute filter={() =>{
          return localStorage.getItem("rol") === "cliente";
        }}>
          < Checkout/>
        </PrivateRoute>
      );
}