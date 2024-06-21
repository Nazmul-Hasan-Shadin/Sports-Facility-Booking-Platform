import { z } from "zod";

export const createBookingValidationSchema = z.object({
    body:z.object({
        date: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        user: z.string(),
        facility: z.string(),
        payableAmount: z.number().optional(),
        isBooked: z.enum(['pending', 'confirmed', 'cancelled']).optional()
    })
  });



  export const BookingValidationSchema={
    createBookingValidationSchema
  }
  