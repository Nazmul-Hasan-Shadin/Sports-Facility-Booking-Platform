import { TBooking, TTimeSlot } from "./booking.interface";

export const generateTimeSlotForaDay = (
  startTime: string,
  endTime: string,
  slotDuration: number
) => {
  const slots: TTimeSlot[] = [];
  let current = new Date(`2002-11-26T${startTime}`); //its time Sat Jan 01 2000 20:09:00 GMT+0600 (Bangladesh Standard Time)
  const end = new Date(`2002-11-26T${endTime}`);
  console.log(current, "current ");

  while (current < end) {
    console.log("iam enterd inside while loop 1st step");
    const slotStartTime = new Date(current);
    current.setMinutes(current.getMinutes() + slotDuration);

    const slotEndTime = new Date(current);

    if (slotEndTime <= end) {
      console.log("iam enter insditd if loop under while");
      slots.push({
        startTime: slotStartTime.toTimeString().slice(0, 5), //20:09:00 GMT+0600 (Bangladesh Standard Time)
        endTime: slotEndTime.toTimeString().slice(0, 5),
      });
    }
  }

  return slots;
};

export const hasTimeConflictOfBookingSlotTim = (
  assignedBookinsTime: TBooking[],
  newBookingTime: { startTime: string; endTime: string }
) => {
  for (const bookingTime of assignedBookinsTime) {
    const existStartTime = new Date(`2002-11-26T${bookingTime.startTime}`);
    const existEndTime = new Date(`2002-11-26T${bookingTime.endTime}`);
    console.log(bookingTime, "iam booking time of for loop");

    const newTime = new Date(`2002-11-26T${newBookingTime.startTime}`);
    const newEndTime = new Date(`2002-11-26T${newBookingTime.endTime}`);

    if (newTime < existEndTime && newEndTime > existStartTime) {
      return true;
    }
  }
};

export const calculateAvailableSlots = (bookings: TBooking[]): TTimeSlot[] => {
  const totalSlots = generateTimeSlotForaDay("08:00", "18:00", 120);
  console.log(totalSlots, "totalslots");

  const availableSlots = totalSlots.filter((slot) => {
    return !bookings.some((booking) => {
      console.log(booking);

      const bookingStart = new Date(`2002-11-26T${booking.startTime}`);
      console.log("bookingStart", bookingStart);

      const bookingEnd = new Date(`2002-11-26T${booking.endTime}`);

      const slotStart = new Date(`2002-11-26T${slot.startTime}`);
      console.log("slotStart", slotStart);
      const slotEnd = new Date(`2002-11-26T${slot.endTime}`);

      return bookingStart < slotEnd && bookingEnd > slotStart;
    });
  });
  return availableSlots;
};

export const calculatePayableAmount = (
  startTime: string,
  endTime: string
): number => {
  // Parse start and end times
  const start = new Date(`2002-11-26T${startTime}`);
  const end = new Date(`2002-11-26T${endTime}`);

  // Calculate duration in minutes
  const durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);

  // Hourly rate
  const ratePerHour = 20;

  // Calculate payable amount
  const totalPayableAmount = (durationInMinutes / 60) * ratePerHour;

  // Round to two decimal places (optional, depending on your needs)
  return Math.round(totalPayableAmount * 100) / 100;
};
