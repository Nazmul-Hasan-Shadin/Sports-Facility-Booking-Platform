import { AppError } from "../../errors/AppError";
import { Facility } from "../facility/facility.models";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import {
  calculateAvailableSlots,
  calculatePayableAmount,
} from "./booking.utils";

const findBookingAvailablityIntoDB = async (date: Date) => {
  const hasexisteBookingAlready = await Booking.find({ date });

  console.log(hasexisteBookingAlready, "hasexisteBookingAlready");

  const availableSlots = calculateAvailableSlots(hasexisteBookingAlready);

  return availableSlots;
};

const createBookingIntoDB = async (payload: TBooking) => {
  console.log(payload.startTime);

  if (!(await Facility.isFacilityExist(payload.facility))) {
    throw new AppError(404, "Facility doesnot exist");
  }

  const startTimeParts = payload.startTime.split(":");
  const startHour = parseInt(startTimeParts[0]);
  const startMin = parseInt(startTimeParts[1]);

  const newDate = new Date(`2002-11-26`);
  newDate.setHours(startHour, startMin, 0, 0); //here 00 from time format 10:34:00

  payload.startTime = newDate.toISOString();

  if (isNaN(newDate.getTime())) {
    throw new AppError(400, "Invalid Time format");
  }

  const endTimeParts = payload.endTime.split(":");
  const endHour = parseInt(endTimeParts[0]);
  const endMinute = parseInt(endTimeParts[1]);

  const endDateTime = new Date(`2002-11-26`);
  endDateTime.setHours(endHour, endMinute, 0, 0);

  if (isNaN(endDateTime.getTime())) {
    throw new AppError(400, "Invalid Time format");
  }

  payload.endTime = endDateTime.toISOString();

  const PayableAmoute = calculatePayableAmount(
    payload.startTime,
    payload.endTime
  );
  payload.payableAmount = PayableAmoute;

  payload.isBooked = "confirmed";
  const result = await Booking.create(payload);
  return result;
};


 
const getAllBookingsFromDB=async()=>{
    const result= await Booking.find().populate('facility').populate('user')
    return result
}



export const BookingServices = {
  findBookingAvailablityIntoDB,
  createBookingIntoDB,
  getAllBookingsFromDB
};
