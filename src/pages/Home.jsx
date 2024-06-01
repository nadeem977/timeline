import React, { useContext, useState, useEffect } from 'react';
import TextBlock from '../components/TextBlock';
import SideBar from '../components/SideBar';
import ShowData from '../components/ShowData';
import { Link, useParams } from 'react-router-dom';
import TabelCom from '../components/TabelCom';
import { AppContext } from "../context/CreateContext"

import Modal from '@mui/material/Modal';

const Home = () => {

  const { tableData, setMonthsWithData } = useContext(AppContext)
  const [data, setData] = useState([])
  const { Id } = useParams()
 const [user,setUser]=useState()
 const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

useEffect(()=>{
 const Users = localStorage.getItem("user")
 setUser(JSON.parse(Users))
},[])

  useEffect(() => {
    for (let i = 0; i < tableData?.length; i++) {
      const obj = tableData[i]
      if (obj._id === Id) {
        setData(obj)
        break
      }
    }
  }, [Id, tableData])


  useEffect(() => {
    const consolidatedData = data?.plan?.flatMap((item) => [
      ...(item.stay?.filter((subItem) => subItem?.startDate || subItem?.lastDate) || []),
      ...(item.do?.filter((subItem) => subItem?.startDate || subItem?.lastDate) || []),
      ...(item.eat?.filter((subItem) => subItem?.startDate || subItem?.lastDate) || []),
      ...(item.other?.filter((subItem) => subItem?.startDate || subItem?.lastDate) || []),
    ]);

    const uniqueYears = new Set();
    const filteredData = consolidatedData?.filter((item) => {
      const startYear = item.startDate?.slice(0, 4);
      const endYear = item.lastDate?.slice(0, 4);
      const includeStartDate = startYear && !uniqueYears.has(startYear);
      const includeEndDate = endYear && !uniqueYears.has(endYear);

      if (includeStartDate) {
        uniqueYears.add(startYear);
        return true;
      }
      if (includeEndDate) {
        uniqueYears.add(endYear);
        return true;
      }
      return false;
    });

    if (filteredData?.length > 0) {

      const monthsWithData = filteredData?.flatMap(item => {
        const startMonth = item.startDate ? new Date(item.startDate).toLocaleString('default', { month: 'long' }) : null;
        const endMonth = item.lastDate ? new Date(item.lastDate).toLocaleString('default', { month: 'long' }) : null;
        return [startMonth, endMonth].filter(Boolean);
      });
      setMonthsWithData([...new Set(monthsWithData)]);
    }
  }, [data])


  return (

    <section className="w-full h-[99vh] flex items-center justify-center">
      <ShowData data={data} />
      <div className="main_box w-full h-full flex items-center justify-between">
        <div className="w-6/12 h-full p-10 pt-2">
          <div className="flex items-center justify-between">
            <Link to="/"> <h1 className="text-7xl font_z">cal</h1>
            </Link>
            <h1 className='text-xl font-semibold capitalize font_z'>{data?.title?.slice(0, 12)}</h1>
            <h1 className="text-3xl font_z cursor-pointer">{user? <p onClick={()=>setOpen(true)}>{user?.username.slice(0,1)}</p>:<Link to="/sign-in">sign up</Link>}</h1>
          </div>
          <div className="side_Bar">
            <SideBar />
          </div>
          <TextBlock data={data} />
        </div>
        <TabelCom data={data} />
      </div>
      <div>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className='modalsShow'>
           <h1 className='text-xl font-semibold'><span className='text-gray'>Name:</span> {user?.username}</h1>
           <h1 className='text-xl font-semibold'><span className='text-gray'>Email:</span> {user?.email}</h1>
           <h1 className='text-xl font-semibold'><span className='text-gray'>Phone:</span> {user?.phone}</h1>
        </div>
      </Modal>
    </div>
    </section>

  );
};

export default Home;
