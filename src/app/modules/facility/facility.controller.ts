import catchAsync from "../../utils/catchAsync";
import sendResoponse from "../../utils/sendResponse";
import { FacilityServices } from "./facility.services";



const getFacility= catchAsync(async(req,res)=>{
  const result=await FacilityServices.getAllFacilityFromDB(req.query)
   
  if (result.length===0) {
    return sendResoponse(res, {
       success: false,
   
       statusCode: 404,
       message: "No Data Found",
       data: result,
     });
   }
   
  sendResoponse(res, {
    success: true,
    
    statusCode: 200,
    message: "Facility are retrived succesfully",
    data: result,
  });
})

const getSingleFacility= catchAsync(async(req,res)=>{
  const result=await FacilityServices.getSingleFacilityIntoDB(req.params.id)
   
  if (result.length===0) {
    return sendResoponse(res, {
       success: false,
   
       statusCode: 404,
       message: "No Data Found",
       data: result,
     });
   }
   
  sendResoponse(res, {
    success: true,
    
    statusCode: 200,
    message: "Facility is retrived succesfully",
    data: result,
  });
})

const createFacility= catchAsync(async(req,res)=>{
  const result=await FacilityServices.createFacilityIntoDb(req.body)

   
  sendResoponse(res, {
    success: true,
    
    statusCode: 200,
    message: "Facility added succesfully",
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
    deleteFacility,
    getFacility,
    getSingleFacility
}