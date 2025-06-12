import { index, route, type RouteConfigEntry } from "@react-router/dev/routes";

const routes = [
  index("routes/home.routes.tsx"),//PUBLICA
  route("/register", "routes/shared/registerUser.routes.tsx"),//PUBLICA
  route("/login", "routes/shared/loginUser.routes.tsx"),//PUBLICA
  route("/forgot-password", "routes/shared/recuperarPassword.tsx"),//PUBLICA
  route("/unauthorized", "routes/unauthorized.tsx"),//PUBLICA
  route("/productos", "routes/productos.tsx"),//ADMIN
  route("/cart", "routes/cart.routes.tsx"),//CLIENTS
  route("/usuarios", "routes/usuarios.tsx"),//ADMIN
  route("/profile", "routes/profile.route.tsx"),//ROL ADMIN AND CLIENT
  route('/ordenes', 'routes/ordenes.tsx'),//ADMIN
  route("/contact", "routes/contacto.tsx"),//PUBLICA
  route("/aboutus", "routes/nosotros.tsx"),//PUBLICA
  route('/checkout', 'routes/user/checkout.routes.tsx'),
  route("/catalogo", "routes/catalogo.routes.tsx"),


  route("/home", "routes/home2.routes.tsx"),
] satisfies RouteConfigEntry[];

export default routes;
