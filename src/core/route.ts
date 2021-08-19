import { HttpMethod, HttpResponse } from "../protocols/http"
import { Middleware } from "../protocols/middleware"

type TypeHandle = (req: any) => Promise<HttpResponse>

interface iRoute {
  method: HttpMethod,
  path: string,
  handle: TypeHandle 
  middleware?: Middleware[]
}

class CRoute {
  public routes: iRoute[] = []
  private groupRoutes: iRoute[] = []
  private inGrouped: boolean = false

  Add(method: HttpMethod, _path: string, handle: TypeHandle, middleware?: Middleware[]) {
    
    const item: iRoute = {
      method: method,
      path: _path,
      handle: handle,
      middleware:middleware
    }

    if (this.inGrouped)
      this.groupRoutes.push(item)
    else
      this.routes.push(item)

    return item
  }

  Group(basePath: string, callRoutes: () => void, middleware?: Middleware[]) {
    this.inGrouped = true
    callRoutes()

    this.routes.push(...this.groupRoutes.map(route => {
      route.path = this.joinURL([basePath, route.path])
      if(middleware)
        route.middleware = [...route.middleware||[],...middleware]
      return route
    }))

    this.inGrouped = false
    this.groupRoutes = []
  }

  private joinURL(paths: string[]) {
    const separator = '/'
    let replace = new RegExp(separator + '{1,}', 'g')
    let url = paths.join(separator).replace(replace, separator)

    if (url[url.length - 1] === separator)
      url = url.slice(0, -1)

    return url
  }
}

export const Route = new CRoute()