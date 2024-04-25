import React from 'react'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'


const Register = () => {


  return (
     <>
      <section className='w-full min-h-[100vh] flex items-center justify-center p-5'>
        <form className=' w-full max-w-[600px] h-git flex flex-col gap-3 bg-white p-5 rounded shados'> 
           <div>
            <label htmlFor="1" className='capitalize'>name</label><br/>
            <input type="text" id='1' placeholder='name' className='w-full p-2 rounded shados mt-1' />
           </div>
           <div>
            <label htmlFor="2" className='capitalize'>email</label><br/>
            <input type="text" id='2' placeholder='email' className='w-full p-2 rounded shados mt-1'/>
           </div>
           <div>
            <label htmlFor="3" className='capitalize'>password</label><br/>
            <input type="text" id='3' placeholder='password' className='w-full p-2 rounded shados mt-1'/>
           </div>
           <div>
            <label htmlFor="3" className='capitalize'>Phone</label><br/>
            <input type="text" id='3' placeholder='Phone' className='w-full p-2 rounded shados mt-1'/>
           </div>
           <Button variant="text" className='btn_Add'>
             sign up
           </Button>
           <p>already have an account please <Link to="/sign-in" className='font-semibold capitalize underline'>sign in</Link></p>
        </form>
      </section>
    </>
  )
}

export default Register
