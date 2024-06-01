import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { Link ,useNavigate} from 'react-router-dom'
import { BASE_API_URL } from '../Config'
import axios from "axios"
import { useSnackbar } from "notistack";


const Login = () => {

  const [userdata, setUserData] = useState({ email: "", password: "" })
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()



  const loginUser = async () => {
    try {
      const data = { email: userdata.email, password: userdata.password }
      const respo = await axios.post(`${BASE_API_URL}/login`,data)
      setUserData((prev)=>({...prev,email:"",password:""}))
      enqueueSnackbar("User Login successfuly", { variant: 'success' });
      navigate('/');
      localStorage.setItem("user",JSON.stringify(respo?.data))
    } catch (error) {
      console.log(error) 
      enqueueSnackbar(error?.response?.data, { variant: 'error' });
    }
  }


  return (
    <>
      <section className='w-full min-h-[100vh] flex items-center justify-center p-5'>
        <form className=' w-full max-w-[600px] h-git flex flex-col gap-3 bg-white p-5 rounded shados'>
          <div>
            <label htmlFor="2" className='capitalize'>email</label><br />
            <input type="text" id='2' placeholder='email' className='w-full p-2 rounded shados mt-1' value={userdata.email} onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="3" className='capitalize'>password</label><br />
            <input type="text" id='3' placeholder='password' className='w-full p-2 rounded shados mt-1' value={userdata.password} onChange={(e) => setUserData((prev) => ({ ...prev, password: e.target.value }))} />
          </div>
          <Button variant="text" className='btn_Add' onClick={loginUser}>
            sign in
          </Button>
          <p>don't have an account please <Link to="/sign-up" className='font-semibold capitalize underline'>sign up</Link></p>
        </form>
      </section>
    </>
  )
}

export default Login
