import { HttpMethod, HttpResponse } from "../protocols/http"

interface Route {
  method: HttpMethod,
  path: string,
  handle: (req: any) => Promise<HttpResponse>
}


class CRoute {
  public routes: Route[] = []
  private groupRoutes: Route[] = []
  private inGrouped: boolean = false

  Add(method: HttpMethod, _path: string, handle: (req: any) => Promise<HttpResponse>) {
    const item = {
      method: method,
      path: _path,
      handle: async (req: any) => await handle(req)
    }

    if (this.inGrouped)
      this.groupRoutes.push(item)
    else
      this.routes.push(item)

    return item
  }

  Group(basePath: string, callRoutes: () => void) {
    this.inGrouped = true
    callRoutes()

    this.routes.push(...this.groupRoutes.map(route => {
      route.path = this.joinURL([basePath, route.path])
      return route
    }))

    this.inGrouped = false
    this.groupRoutes = []
  }

  private joinURL(paths: string[]) {
    const separator = '/'
    let replace = new RegExp(separator + '{1,}', 'g')
    let url = paths.join(separator).replace(replace, separator)

      if (url[url.length-1] === separator)
        url = url.slice(0, -1)

    return url
  }
}

export const Route = new CRoute()