import { TFacility, facilityData } from './facility.interface';
import mongoose, { model } from "mongoose";

const facilitySchema= new mongoose.Schema<TFacility,facilityData>({
   name:{
    type:String,
    require:[true,'Title is required']
   },
   description:{
    type:String,
    require:[true,'Title is required']
   },
   pricePerHour:{
    type:Number,
    require:[true,'Title is required']
   },
   location:{
    type:String,
    require:[true,'location is required']
   },
   isDeleted:{
    type:Boolean,
    default:false
    
   }
})


facilitySchema.statics.isFacilityExist= async function(id){
      console.log(id);
      
    return await Facility.findById({_id:id})
}

export const Facility= model<TFacility,facilityData>('Facility',facilitySchema)