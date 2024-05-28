import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/CreateContext'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { BASE_API_URL } from '../Config';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';








const Dashboard = () => {

  const { planData, GetAllData } = useContext(AppContext)
  const [data, setDate] = useState([])
  const [open, setOpen] = React.useState(false);
  const [palnremov, setPlanremov] = useState(false)
  const [apiHit, setApiHit] = useState(false)
  const [title, setTitle] = useState("")


  const CreatePlans = async () => {
    setApiHit(true)
    try {
      const data = { title: title }
      const res = await axios.post(`${BASE_API_URL}/PlanCreatings`, data)
      setApiHit(false)
      GetAllData()
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const RemovingPlan = async (Id) => {
    setPlanremov(Id)
    try {
      const data = { Id: Id }
      const res = await axios.post(`${BASE_API_URL}/RemovingPlan`, data)
      console.log(res)
      GetAllData()
      setPlanremov("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <div className='modals w-full h-fit max-w-[500px] p-5 pb-8 rounded bg-white outline-none'>
            <h1 className='text-xl text-center my-3 font-semibold'>Plan name</h1>
            <input type="text" placeholder='Plan title...' className='border rounded outline-none w-full p-2' value={title} onChange={(e) => setTitle(e.target.value)} />
            <Button variant="text" className='btn_Add' onClick={CreatePlans}>
              {apiHit ? <CircularProgress className='svgSpiner' /> : " Create plan"}
            </Button>
          </div>
        </Modal>
      </div>
      <div>
        <div className='flex items-center justify-between px-6 py-2 w-full '>
          <h1 className=' text-7xl font_z'>cal</h1>
          <div className='flex items-center gap-6'>
            <Button variant="text" style={{ color: 'black', fontSize: "30px", textTransform: 'capitalize' }}>Sign out</Button>
            <p className=' text-7xl font_z'>A</p></div>
        </div>
        <div className='w-full height p-5'>
          <div className='gridopration gap-5'>
            {planData.map((item, i) => (
              <div className='w-full min-h-[200px] relative cursor-pointer hover:bg-[#dce4f36e]
              cardshados h-full rounded p-4'  key={i}>
                  <div className='absolute top-0 right-0'>
                    {palnremov === item._id ? <CircularProgress className='svgSpiner' /> : <IconButton onClick={() => RemovingPlan(item?._id)}>
                      <CloseIcon />
                    </IconButton>}
                  </div>
                <Link className='w-full h-full flex items-center justify-center' to={`/Dashboard/${item._id}`}>
                <p className='text-1xl capitalize font-semibold '>{item.title}</p>
                </Link>
              </div>
            ))}
            <div className='w-full min-h-[200px] hover:bg-[#dce4f36e] cardshados text-2xl font-semibold rounded cursor-pointer p-4 flex items-center justify-center' onClick={() => setOpen(true)}>
              Add New Plan +
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Dashboard
