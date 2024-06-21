import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { BookedStatus } from "./booking.const";

const bookingSchema= new Schema<TBooking>({
     date:{
        type:Date,
        required:[true,'Date is required']
     },
     startTime:{
        type:String,
        required:[true,'start time is required']
     },
     endTime:{
        type:String,
        required:[true,'End time is required']
     },
     user:{
        type:Schema.Types.ObjectId,
        ref:'User'
     },
     facility:{
        type:Schema.Types.ObjectId,
        ref:'Facility'
     },
     payableAmount:{
        type:Number
     },
     isBooked:{
        enum:BookedStatus
     }
     

})

export const Booking= model<TBooking>('Booking',bookingSchema)