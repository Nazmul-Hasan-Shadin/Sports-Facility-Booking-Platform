import { Types } from "mongoose";
import { AppError } from "../../errors/AppError";
import { Facility } from "../facility/facility.models";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import {
  calculateAvailableSlots,
  calculatePayableAmount,
  hasTimeConflictOfBookingSlotTim,
} from "./booking.utils";

const findBookingAvailablityIntoDB = async (query: Record<string, unknown>) => {
  //  console.log('iam date inside services ', date);  //here i find this format date 2024-06-21T13:35:13.769Z
  const date = query.date
    ? new Date(query.date as string)
    : new Date(new Date().toISOString().split("T")[0]);

  if (query.facility) {
    if (!(await Facility.isFacilityExist(query?.facility))) {
      throw new AppError(404, "Facility doesnot exist");
    }
  }


  const hasexisteBookingAlready= await Booking.find({facility:query?.facility,date:date})
  // const hasexisteBookingAlready = await Booking.find({ date });

  // console.log(hasexisteBookingAlready, "hasexisteBookingAlready");

  const availableSlots = calculateAvailableSlots(hasexisteBookingAlready);

  return availableSlots;
};

const createBookingIntoDB = async (email: string, payload: TBooking) => {
  // console.log(payload.startTime,);

  if (!(await Facility.isFacilityExist(payload.facility))) {
    throw new AppError(404, "Facility doesnot exist");
  }
  if (!payload.startTime) {
    throw new Error("startTime is required");
  }
  if (!payload.endTime) {
    throw new Error("EndTime is required");
  }
  //  find user by email  then retrieve userId for referencing
  const findUserId = await User.findOne({ email });
  if (!findUserId) {
    throw new AppError(
      404,
      "user doesnot exist .please login again .this issue arise you are trying other set other user id . Dont nee provide userID its autometic "
    );
  }

  const extractUserId = findUserId._id as Types.ObjectId;

  const assignedBookingTimes = await Booking.find({date:payload.date});

  const newBookingTime = {
    startTime: payload.startTime,
    endTime: payload.endTime,
  };

  if (hasTimeConflictOfBookingSlotTim(assignedBookingTimes, newBookingTime)) {
    throw new AppError(
      400,
      "This Facility is not available at that time ! Choose other time"
    );
  }

  // const startTimeParts = payload?.startTime?.split(":");
  // const startHour = parseInt(startTimeParts[0]);
  // const startMin = parseInt(startTimeParts[1]);

  // const newDate = new Date(`2002-11-26`);
  // newDate.setHours(startHour, startMin, 0, 0); //here 00 from time format 10:34:00

  // payload.startTime = newDate.toISOString();

  // if (isNaN(newDate.getTime())) {
  //   throw new AppError(400, "Invalid Time format");
  // }

  // const endTimeParts = payload?.endTime?.split(":");
  // const endHour = parseInt(endTimeParts[0]);
  // const endMinute = parseInt(endTimeParts[1]);

  // const endDateTime = new Date(`2002-11-26`);
  // endDateTime.setHours(endHour, endMinute, 0, 0);

  // if (isNaN(endDateTime.getTime())) {
  //   throw new AppError(400, "Invalid Time format");
  // }

  // payload.endTime = endDateTime.toISOString();

  const PayableAmoute = calculatePayableAmount(
    payload.startTime,
    payload.endTime
  );
  payload.user = extractUserId;
  payload.payableAmount = PayableAmoute;

  payload.isBooked = "confirmed";
  const result = await Booking.create(payload);
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find()
    .populate({ path: "facility", select: "-__v" })
    .populate({
      path: "user",
      select: "-password -createdAt -updatedAt -__v",
    });
  return result;
};

const getAllBookingsForUserSpecificFromDB = async (email: string) => {
  // find user then collect user id from user colloection
  const findExistUserByEmail = await User.findOne({ email: email });
  console.log("iam user existing", findExistUserByEmail);

  if (!findExistUserByEmail) {
    throw new Error("User not found");
  }

  //  search all bookings by user id

  const result = await Booking.find({
    user: findExistUserByEmail._id,
  }).populate("facility");

  return result;
};

const cancelABookingByUserIntoDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    {
      isBooked: "canceled",
    },
    {
      new: true,
    }
  ).populate("facility");

  return result;
};

export const BookingServices = {
  findBookingAvailablityIntoDB,
  createBookingIntoDB,
  getAllBookingsFromDB,
  getAllBookingsForUserSpecificFromDB,
  cancelABookingByUserIntoDB,
};
