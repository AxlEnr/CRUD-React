import { index, route, type RouteConfigEntry } from "@react-router/dev/routes";

const routes = [
  index("routes/home.routes.tsx"),
  route("/test", "routes/test.routes.tsx"),
  route("/register", "routes/shared/registerUser.routes.tsx"),
  route("/login", "routes/shared/loginUser.routes.tsx"),
  route("/forgot-password", "routes/shared/recuperarPassword.tsx"),
  route("/unauthorized", "routes/unauthorized.tsx"),
  // Protegidas pero ya lo manejas dentro del archivo
  route("/productos", "routes/productos.tsx"),
  route("/cart", "routes/cart.routes.tsx"),
  route("/usuarios", "routes/usuarios.tsx"),
  route("/profile", "routes/profile.route.tsx"),
  route('/ordenes', 'routes/ordenes.tsx')
  route("/contact", "routes/contacto.tsx"),
  route("/aboutus", "routes/nosotros.tsx"),
  route('/checkout', 'routes/user/checkout.routes.tsx'),


  route("/home", "routes/home2.routes.tsx"),
] satisfies RouteConfigEntry[];

export default routes;
