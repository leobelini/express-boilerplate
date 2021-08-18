export interface HttpResponse {
  statusCode: number
  body?: any
}

export interface HttpRequest<Body = any, Query = any, Param = any> {
  body: Body,
  query: Query,
  param: Param,
}

export enum HttpMethod {
  ALL = 'all',
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
  OPTIONS = 'options',
  HEAD = 'head'
}