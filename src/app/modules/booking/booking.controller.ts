import { AppError } from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResoponse from "../../utils/sendResponse";
import { Booking } from "./booking.model";

import { BookingServices } from "./booking.services";

const checkAvailability = catchAsync(async (req, res) => {
  const date = req.query.date ? new Date(req.query.date as string) : new Date();
  console.log(date);

  const result = await BookingServices.findBookingAvailablityIntoDB(date);

  sendResoponse(res, {
    success: true,

    statusCode: 200,
    message: "Availability checked successfully",

    data: result,
  });
});

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);

  sendResoponse(res, {
    success: true,

    statusCode: 200,
    message: "Booking created successful",

    data: result,
  });
});


  const getAllBookings=  catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookingsFromDB();
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
      message: "Bookings retrieved successfully",
  
      data: result,
    });
  });



  const getAllBookingsForuser=  catchAsync(async (req, res) => {
     const {email}=req.user;
     console.log(email);
     
    const result = await BookingServices.getAllBookingsForUserSpecificFromDB(email);
     
     if(result.length==-0){
      return  sendResoponse(res, {
        success:false,
    
        statusCode:404,
        message: "No Bookings Data found ",
    
       
      });
     }
    sendResoponse(res, {
      success: true,
  
      statusCode: 200,
      message: "Bookings  retrieved successfully",
  
      data: result,
    });
  });

  const cancelaBooking= catchAsync(async(req,res)=>{
    const bookingId=req.params.bookingId;
    const result= await BookingServices.cancelABookingByUserIntoDB(bookingId);

    sendResoponse(res, {
        success: true,
    
        statusCode: 200,
        message: "Booking cancelled successfully",
    
        data: result,
      });
  })


export const BookingsController = {
  checkAvailability,
  createBooking,
  getAllBookings,
  getAllBookingsForuser,
  cancelaBooking
};
