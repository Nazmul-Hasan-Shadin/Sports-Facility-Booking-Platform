import express from 'express'
import { UserController } from './user.controller'





const router= express.Router()



router.get('/get-user',UserController.getUserByEmail)




export const userRoutes=router