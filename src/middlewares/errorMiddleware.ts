import { NextFunction, Request, Response } from "express";
import { InternalError } from "../exceptions/internalError";
import { DriverError } from "../exceptions/driverError";

export const errorMiddleware = (
  error: Error & Partial<InternalError> & Partial<DriverError>, 
  request: Request, 
  response: Response, 
  next: NextFunction
) => {
  console.log(error)
  let title = ""
  let detail = ""
  
  let statusCode = error.statusCode ?? 500
  title = error.title ? error.title : 'Internal Server Error'
  detail = error.detail ? error.detail : 'Um error não esperado ocorreu.'
  
	return response.status(statusCode).json({ title, detail })

}