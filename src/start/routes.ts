import { Hello } from "../controllers/hello";
import { Route } from "../core/route";
import { HttpMethod } from "../protocols/http";

Route.Add(HttpMethod.GET, "/teste", Hello.handle)

Route.Group('/user', () => {
  Route.Add(HttpMethod.POST, "/", Hello.handle)
})
