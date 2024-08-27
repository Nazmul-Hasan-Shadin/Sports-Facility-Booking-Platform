import express from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middleware/validateRequest'
import { UserValidation } from '../user/user.validation'
import { AuthValidation } from './auth.validation'


const router= express.Router()



router.post('/signup',validateRequest(UserValidation.userValidationSchema),AuthController.signUpUser)

router.post('/login',validateRequest(AuthValidation.loginValidationSchema),AuthController.LoginIntoDB)


export const AuthRoutes=router