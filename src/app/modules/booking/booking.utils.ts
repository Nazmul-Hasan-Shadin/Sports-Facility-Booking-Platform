import { TBooking, TTimeSlot } from "./booking.interface"



export const generateTimeSlotForaDay=(startTime:string,endTime:string,slotDuration:number)=>{
    console.log('hi iam start time',startTime);
    console.log('iam endtime',endTime);
    
     const slots:TTimeSlot[]=[];
     let current= new Date(`2002-11-26T${startTime}`) //its time Sat Jan 01 2000 20:09:00 GMT+0600 (Bangladesh Standard Time)
     const end=new Date(`2002-11-26T${endTime}`)
      console.log(current,'current ');
      
     while(current<end){
        console.log('iam enterd inside while loop 1st step')
        const slotStartTime=new Date(current)
        current.setMinutes(current.getMinutes()+slotDuration)

        const slotEndTime= new Date(current)

        if (slotEndTime<= end) {
         console.log('iam enter insditd if loop under while')
            slots.push({
                startTime:slotStartTime.toTimeString().slice(0,5), //20:09:00 GMT+0600 (Bangladesh Standard Time)
                endTime:slotEndTime.toTimeString().slice(0,5)
            })
        }

     }
      
     return slots


}





 export const calculateAvailableSlots=(bookings:TBooking[]):TTimeSlot[]=>{
        
    const totalSlots=generateTimeSlotForaDay("08:00","18:00", 120)
    console.log(totalSlots,'totalslots');
    
    const availableSlots= totalSlots.filter(slot=>{
        return !bookings.some(booking=>{
            const bookingStart= new Date(`2002-11-26T${booking.startTime}`)
            const bookingEnd= new Date(`2002-11-26T${booking.endTime}`)

            const slotStart= new Date(`2002-11-26T${slot.startTime}`)
            const slotEnd= new Date(`2002-11-26T${slot.endTime}`)

            return (bookingStart <slotEnd && bookingEnd > slotStart)

        })
    })
    return availableSlots
 }


 export  const calculatePayableAmount = (startTime: string, endTime: string): number => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60); 

    const ratePerMinute = 20; 
    const totalPayableAmount = durationInMinutes * ratePerMinute;

    return totalPayableAmount;
};