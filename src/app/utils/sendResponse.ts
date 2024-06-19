import { Response } from "express";

const sendResoponse=<T>(res:Response,data:{
    statusCode:number,
    success:boolean,
    message?:string,
    token?:string,
    data:T
})=>{
    res.status(data?.statusCode).json({

        success:data.success,
        statusCode:data.statusCode,
        message:data.message,
        token:data.token,
        data:data.data
    })
}

export default sendResoponse