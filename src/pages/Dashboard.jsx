import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { AppContext } from '../context/CreateContext'

const Dashboard = () => {

 const {planData} = useContext(AppContext)
const [data ,setDate] =useState([])
 
useEffect(()=>{
   
  if (planData) {
    for (let obj of planData) {
      if (obj) {
        if (obj.stay && obj.stay.length > 0) {
          setDate((prev) => ([...prev, ...obj.stay.map((item) => item)]));
        }
        if (obj.do && obj.do.length > 0) {
          setDate((prev) => ([...prev, ...obj.do.map((item) => item)]));
        }
        if (obj.eat && obj.eat.length > 0) {
          setDate((prev) => ([...prev, ...obj.eat.map((item) => item)]));
        }
      }
 
    }
  }
},[planData])
  return (
    <>
      <div>
        <div className='flex items-center justify-between px-6 py-2 w-full '>
          <h1 className=' text-7xl font_z'>cal</h1>
          <div className='flex items-center gap-6'>
            <Button variant="text" style={{ color: 'black', fontSize: "30px", textTransform: 'capitalize' }}>Sign out</Button>
            <p className=' text-7xl font_z'>A</p></div>
        </div> 
        <div className='w-full height p-5'>
          <div className='gridopration gap-5'>
            {data.map((item, i) => (
              <div className='w-full min-h-[200px] 
                 cardshados flex items-center justify-center h-full rounded p-4' key={i}>
                <p className='text-1xl capitalize font-semibold'>{item.name}</p>
              </div>
            ))}
          <div className='w-full h-full cardshados text-2xl font-semibold rounded cursor-pointer p-4 flex items-center justify-center'>
            Add New Plan +
          </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Dashboard
