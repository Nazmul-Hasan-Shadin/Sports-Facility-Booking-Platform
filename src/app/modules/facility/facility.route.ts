import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { FacilityValidationSchema } from './facility.validation'
import { FacilityController } from './facility.controller'
import auth from '../auth/auth'


const router=express.Router()
 
router.post('/facility',auth('admin'),validateRequest(FacilityValidationSchema.createFacilityValidationSchema),FacilityController.createFacility)
router.put('/facility/:id',auth('admin'),validateRequest(FacilityValidationSchema.updateFacilityValidationSchema),FacilityController.updateFacility)
router.delete('/facility/:id',auth('admin'),FacilityController.deleteFacility)

export  const FacilityRoutes=router