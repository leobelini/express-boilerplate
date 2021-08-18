import { HttpMethod,HttpRequest,HttpResponse } from "../../protocols/http"

export const Hello = new class Hello {
 async handle(req:HttpRequest):Promise<HttpResponse>{
   console.log(req.body)
   return{
     statusCode:200,
     body:"Hello"
   }
 }
}