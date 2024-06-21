import { Model } from "mongoose"
import { TUser } from "../user/user.interface"


export type TFacility ={
    name:string,
    description:string,
    pricePerHour:number,
    location :string,
    isDeleted:boolean
}


export interface facilityData  extends Model<TFacility>{
    isFacilityExist(id):Promise<TUser | null>
}