import catchAsync from "../../utils/catchAsync";
import sendResoponse from "../../utils/sendResponse";
import { FacilityServices } from "./facility.services";

const createFacility= catchAsync(async(req,res)=>{
  const result=await FacilityServices.createFacilityIntoDb(req.body)

   
  sendResoponse(res, {
    success: true,
    
    statusCode: 200,
    message: "Facility is created succesfully",
    data: result,
  });
})

const updateFacility= catchAsync(async(req,res)=>{
   const id= req.params.id
  const result=await FacilityServices.updateFacilityIntoDB(id,req.body)

   
  sendResoponse(res, {
    success: true,
    
    statusCode: 200,
    message: "Facility is updated succesfully",
    data: result,
  });
})



const deleteFacility= catchAsync(async(req,res)=>{
  const id= req.params.id
 const result=await FacilityServices.deleteFacilityIntoDB(id)

  
 sendResoponse(res, {
   success: true,
   
   statusCode: 200,
   message: "Facility is Deleted succesfully",
   data: result,
 });
})

export const FacilityController={
    createFacility,
    updateFacility,
    deleteFacility
}