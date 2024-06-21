import express, { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResoponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";
import { User } from "../user/user.model";

const signUpUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signUpInToDb(req.body)

  sendResoponse(res, {
    success: true,
    
    statusCode: 200,
    message: "user registered succesfully",
    data: result,
  });
});


const LoginIntoDB=catchAsync(async(req,res)=>{
    const result= await AuthServices.loginIntoDB(req.body)
    sendResoponse(res, {
        success: true,
        statusCode: 200,
         message: "user Logged In succesfully",
         token:result.accessToken,
         data: result.user,
      });
})


export const AuthController = {
  signUpUser,
  LoginIntoDB
};
