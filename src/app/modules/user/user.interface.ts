
 
 export interface TUserName{
    firstName:string,
    middleName:string
    lastName:string,

 }


export type TUser = {
  name: TUserName;
  email: string;
  password: string;
  phone: number;
  role: "admin" | "user";
  address: string;
};


