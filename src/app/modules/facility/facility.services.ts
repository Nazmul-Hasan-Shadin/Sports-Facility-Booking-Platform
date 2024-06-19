import { TFacility } from "./facility.interface";
import { Facility } from "./facility.models";

const  createFacilityIntoDb=async(payload:TFacility)=>{
    const result= await Facility.create(payload)
     return result
}

const updateFacilityIntoDB=async(id:string,payload:TFacility)=>{
         
    const result= await Facility.findOneAndUpdate({_id:id},payload,{new:true})
    return result
}

const deleteFacilityIntoDB=async(id:string)=>{
         
    const result= await Facility.findOneAndUpdate({_id:id},{
        isDeleted:true
    })
    return result
}




export const FacilityServices={
    createFacilityIntoDb,
    updateFacilityIntoDB,
    deleteFacilityIntoDB
}