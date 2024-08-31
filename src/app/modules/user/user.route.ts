import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'





const router= express.Router()



router.get('/get-user',UserController.getUserByEmail)
router.post('/create-admin',validateRequest(UserValidation.userValidationSchema),UserController.createAdmin)



export const userRoutes=router