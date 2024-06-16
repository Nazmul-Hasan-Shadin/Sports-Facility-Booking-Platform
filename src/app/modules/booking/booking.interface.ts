import { Types } from "mongoose"

 
export type isBooked= 'confirmed' | 'unconfirmed' | 'canceled' 

export type TBooking ={
    date:Date,
     startTime:string,
     endTime:string,
     user:Types.ObjectId,
     facility: Types.ObjectId,
     payableAmount:Number,
     isBooked: isBooked

}