import { NextFunction, Request, Response } from "express";
import { TErrorSource } from "../interface/error";
import { ZodError } from "zod";

export const globalErrorHandler = async (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {



  let statusCode=err.statusCode || 500

  let message= err.message || 'something went wrong'
  let errorMessage:TErrorSource[]=[
    {
      path:'',
      message:'something went wrong'
    }
  ]

   if(err instanceof ZodError){
    const manageZodError= 
   }

   





  return res.status(400).json( {
    success: false,
    message: err.message,
    mongooseErr: err,
  })
};
