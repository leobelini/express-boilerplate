import { ControllerHello } from "../controllers/hello"
import { Route } from "../core/route"
import { HttpMethod } from "../protocols/http"

Route.Add(HttpMethod.GET, "/teste", ControllerHello.handle,[])

Route.Group('/user/:id?', () => {
  Route.Add(HttpMethod.POST, "/", ControllerHello.handle)
},[])
