import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import { globalErrorHandler } from './app/middleware/globalErrorHandler'
import cookieParser from 'cookie-parser'
import notFound from './app/middleware/notFound'
const app:Application=express()

app.use(express.json())

 
app.use(cors({
  origin:'http://localhost:5173',
  credentials: true
}))
app.use(cookieParser())



app.use('/api',router)



app.get("/", (req: Request, res: Response) => {
    res.send("Server is running!");
  });




app.use(globalErrorHandler)

app.use(notFound)

export default app