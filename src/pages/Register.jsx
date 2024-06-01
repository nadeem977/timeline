import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { Link ,useNavigate } from 'react-router-dom'
import isPasswordValid, { BASE_API_URL } from '../Config'
import { useSnackbar } from "notistack";
import axios from "axios"


const Register = () => {



  const [user, setUser] = useState({ name: "", email: "", password: "", phone: "" })
  const[validemail,setValidemail] = useState("")
  const [validpaswords, setValidpaswords] = useState('')
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()

  const Regstration = async () => {
    setValidpaswords("")
    setValidemail("")
    if (!validateEmail(user?.email)) {
      setValidemail("Please enter a valid email address");
      return;
    }
    const Validpwd = isPasswordValid(user?.password)
    try { 
      if(Validpwd?.valid){
        const data = {
          username: user?.name, email: user?.email, password: user?.password, phone: user?.phone
        }
        const res = await axios.post(`${BASE_API_URL}/registration`, data)
        enqueueSnackbar("User registred successfuly", { variant: 'success' });
        setUser((prev) => ({ ...prev, name:"",email:"",password:"",phone:"" }))
        navigate('/sign-in');
      }else{
        setValidpaswords(Validpwd?.message)
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error?.response?.data, { variant: 'error' });
    }
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }




  return (
    <>
      <section className='w-full min-h-[100vh] flex items-center justify-center p-5'>
        <form className=' w-full max-w-[600px] h-git flex flex-col gap-3 bg-white p-5 rounded shados'>
          <div>
            <label htmlFor="1" className='capitalize'>name</label><br />
            <input type="text" id='1' placeholder='name' className='w-full p-2 rounded shados mt-1' onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="2" className='capitalize'>email</label><br />
            <input type="text" id='2' placeholder='email' className='w-full p-2 rounded shados mt-1' onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))} />
            <p className='text-red-500 text-[16px]'>{validemail}</p>
          </div>
          <div>
            <label htmlFor="3" className='capitalize'>password</label><br />
            <input type="text" id='3' placeholder='password' className='w-full p-2 rounded shados mt-1' onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))} />
            <p className='text-red-500 text-[16px]'>{validpaswords}</p>
          </div>
          <div>
            <label htmlFor="3" className='capitalize'>Phone</label><br />
            <input type="text" id='3' placeholder='Phone' className='w-full p-2 rounded shados mt-1' onChange={(e) => setUser((prev) => ({ ...prev, phone: e.target.value }))} />
          </div>
          <Button variant="text" className='btn_Add' onClick={Regstration}>
            sign up
          </Button>
          <p>already have an account please <Link to="/sign-in" className='font-semibold capitalize underline'>sign in</Link></p>
        </form>
      </section>
    </>
  )
}

export default Register
