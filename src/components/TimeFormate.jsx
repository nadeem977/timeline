import React, { useEffect, useState } from 'react'

export const TimeFormate = ({times,monthS}) => {
 
const [timeshow , setTimeshow] = useState("")
 
useEffect(() => { 
    const newtime = new Date(times);
    const hours = newtime.getHours();
    const minutes = newtime.getMinutes();
    const matching = `${hours === 0 ? '00' : hours >= 10 ? hours : '0' + hours}:${minutes >= 10 ? minutes : '0' + minutes}`;
    const newdate = `${monthS} ${matching}`;
    setTimeshow(newdate);
}, [times,monthS]);

  return (
    <>
       <div className='bg-green-300 rounded p-1  h-fit' >{timeshow}</div>
    </>
  )
}

 
export const TimeFormateEnd = ({times,monthE}) => {
 
    const [timeshow , setTimeshow] = useState("")
        
    useEffect(() => {
    
        const newtime = new Date(times);
        const hours = newtime.getHours();
        const minutes = newtime.getMinutes();
        const matching = `${hours === 0 ? '00' : hours >= 10 ? hours : '0' + hours}:${minutes >= 10 ? minutes : '0' + minutes}`;
        const newdate = `${monthE} ${matching}`;
        setTimeshow(newdate);
    }, [times,monthE]);
    
      return (
        <>
           <div className='bg-red-300 p-1 rounded cursor-pointer h-fit' >{timeshow}</div>
        </>
      )
    }
    