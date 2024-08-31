
import mongoose from "mongoose";
import config from "./app/config";
import app from './app';
import {Server} from 'http'
let server:Server;

async function main() {
   
    
    await mongoose.connect(config.db_uri as string,{
      dbName:'sports-booking-platform'
    });
    console.log('connected');
    
    server=app.listen(config.port,()=>{
        console.log('mama iserver is running');
        
     })
  
  }


main()




