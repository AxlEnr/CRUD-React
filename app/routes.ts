import { index, route, type RouteConfigEntry } from "@react-router/dev/routes";

const routes = [
  index("routes/home.tsx"),
  route("/test", "routes/test.tsx")
] satisfies RouteConfigEntry[];

export default routes;
