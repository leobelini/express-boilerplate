import { HttpRequest, HttpResponse } from "../../protocols/http"

class Hello {
  async handle(req: HttpRequest): Promise<HttpResponse> {

    return {
      statusCode: 200,
      body: {
        body: req.body,
        params: req.params,
        query: req.query,
      }
    }
  }
}


export const ControllerHello = new Hello()