import { index, route, type RouteConfigEntry } from "@react-router/dev/routes";

const routes = [
  index("routes/home.routes.tsx"),
  route("/test", "routes/test.routes.tsx"),
  route("/cart", "routes/cart.routes.tsx"),
  route("/home", "routes/home2.routes.tsx"),
  route("/register", "routes/shared/registerUser.routes.tsx"),
  route("/login", "routes/shared/loginUser.routes.tsx"),
  route("/usuarios", "routes/usuarios.tsx"),
  route("/profile", "routes/profile.route.tsx"),
  route("/productos", "routes/productos.tsx"),
  route('/checkout', 'routes/user/checkout.routes.tsx')

] satisfies RouteConfigEntry[];

export default routes;
