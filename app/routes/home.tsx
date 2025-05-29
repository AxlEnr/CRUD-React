import type { Route } from "./+types/home";
import { Index } from "../pages/index" 

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Losiones" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Index />;
}
