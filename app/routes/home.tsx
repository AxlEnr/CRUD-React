
import type { Route } from ".react-router/types/app/+types/root";
import { Index } from "../pages/index"
import CartPage from "../pages/cart";
import { Car } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mӕká" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <CartPage />;
}
