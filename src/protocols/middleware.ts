import { NextFunction, Request, Response } from "express";

export interface MiddlewareRequest extends Request { }
export interface MiddlewareResponse extends Response { }
export interface MiddlewareNextFunction extends NextFunction { }

export type MiddlewareHandle = (req: MiddlewareRequest, res: MiddlewareResponse, next: MiddlewareNextFunction) => Promise<void>

export interface Middleware {
  handle: MiddlewareHandle
}
