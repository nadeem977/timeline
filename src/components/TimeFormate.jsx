import React, { useEffect, useState } from 'react'

export const TimeFormate = (time) => {
 
const [timeshow , setTimeshow] = useState("")
    
useEffect(() => {

    const newtime = new Date(time.time);
    const month = newtime.getMonth();
    const hours = newtime.getHours();
    const minutes = newtime.getMinutes();
    const matching = `${hours === 0 ? '12' : hours >= 10 ? hours : '0' + hours}:${minutes >= 10 ? minutes : '0' + minutes}`;
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const newdate = `${monthNames[month]} ${newtime.getDate()} ${matching}`;
    setTimeshow(newdate);
}, [time]);

  return (
    <>
       <div className='bg-green-300 rounded p-1  h-fit' >{timeshow}</div>
    </>
  )
}

 
export const TimeFormateEnd = (time) => {
 
    const [timeshow , setTimeshow] = useState("")
        
    useEffect(() => {
    
        const newtime = new Date(time.time);
        const month = newtime.getMonth();
        const hours = newtime.getHours();
        const minutes = newtime.getMinutes();
        const matching = `${hours === 0 ? '12' : hours >= 10 ? hours : '0' + hours}:${minutes >= 10 ? minutes : '0' + minutes}`;
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const newdate = `${monthNames[month]} ${newtime.getDate()} ${matching}`;
        setTimeshow(newdate);
    }, [time]);
    
      return (
        <>
           <div className='bg-red-300 p-1 rounded cursor-pointer h-fit' >{timeshow}</div>
        </>
      )
    }
    