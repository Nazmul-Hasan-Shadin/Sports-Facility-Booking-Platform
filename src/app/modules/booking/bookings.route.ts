import express from "express";
import { BookingsController } from "./booking.controller";
import validateRequest from "../../middleware/validateRequest";
import { BookingValidationSchema } from "./booking.validation";
import auth from "../auth/auth";

const router = express.Router();

router.get("/check-availability", BookingsController.checkAvailability);
router.get("/bookings", auth("admin"), BookingsController.getAllBookings);
router.get(
  "/bookings/user",
  auth("user"),
  BookingsController.getAllBookingsForuser
);
router.post(
  "/bookings",
  auth("user"),
  validateRequest(BookingValidationSchema.createBookingValidationSchema),
  BookingsController.createBooking
);
router.delete(
  "/bookings/:bookingId",
  auth("user"),
  BookingsController.cancelaBooking
);

export const BookinsgsRoutes = router;
