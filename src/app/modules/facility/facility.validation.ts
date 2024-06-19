
import { z } from "zod";

const createFacilityValidationSchema = z.object({
    body:z.object({
        name: z.string().nonempty({ message: 'Title is required' }),
        description: z.string().nonempty({ message: 'Description is required' }),
        pricePerHour: z.number().positive({ message: 'Price per hour must be a positive number' }),
        location: z.string().nonempty({ message: 'Location is required' }),
        isDeleted: z.boolean().optional().default(false),
    })
  });

  const updateFacilityValidationSchema = z.object({
    body:z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        pricePerHour: z.number().positive().optional(),
        location: z.string().optional(),
        isDeleted: z.boolean().default(false).optional(),
    })
  });



  export const FacilityValidationSchema={
    createFacilityValidationSchema,
    updateFacilityValidationSchema
  }