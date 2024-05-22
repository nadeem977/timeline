import React, { useContext, useEffect, useState } from 'react'
import arrowImg from '../assets/arrow.png';
import Button from '@mui/material/Button'
import { AppContext } from '../context/CreateContext';
import { BASE_API_URL } from '../Config';
import axios from "axios"


const TextBlock = () => {

  const [img, setImg] = useState(null)
  const [showImg, setShowimg] = useState(null)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [category, setCategory] = useState("Stay")
  const { addNewTodo, setAddNewTodo, cardId, setOpen, GetAllData } = useContext(AppContext)
  const [droppedBoxId, setDroppedBoxId] = useState(null);


  const handleDrop = (e) => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData('boxId');
    setDroppedBoxId(droppedId);
  };
  const allowDrop = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (droppedBoxId) {
      setAddNewTodo(true)
      setDroppedBoxId(null)
    }
  }, [droppedBoxId])
  const handelImgeFunc = (e) => {
    setImg(e.target.files[0])
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      setShowimg(evt.target.result);
    };
    reader.readAsDataURL(image);
  }; 
  const handelFunc = async () => {
    try { 
      let dat = new Date(start);
      const minuts = dat.getMinutes()
      const hours = dat.getHours()
      const monthIndex = dat.getMonth();
      let endDate = new Date(end)
      const endmonht = endDate.getMonth();
      const enddate = endDate.getDate();
      const date = dat.getDate();
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const monthName = monthNames[monthIndex];
      const lastmonth = monthNames[endmonht]
      const formattedDate = `${monthName} ${date}`;
      const formattedend = `${lastmonth} ${enddate}`
      const matching = `${hours === 0 ? '12:00' : hours >= 10 ?  hours+':00':'0'+hours+":00"}`
      const headers = { "Content-Type": "multipart/form-data" };
      const object = {
        name:name,
        address:address,
        image:img,
        timeS:start,
        timeE:end,
        date:formattedDate,
        lastDate:formattedend,
        start:matching,
        minutes:minuts,
        category:category,
        height:45,
        }    
      const res = await axios.post(`${BASE_API_URL}/userSchedule`, object, { headers });
      console.log(res)
      GetAllData()
      setAddNewTodo(false);
      setImg(null);
      setName("");
      setShowimg(null)
      setAddress("");
      setStart("");
      setEnd("");
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    if (cardId != null) {
      setAddNewTodo(true)
      setOpen((prev) => ({ ...prev, active: false }))
      setImg(cardId.img)
      setShowimg(cardId.img)
      setName(cardId.name)
      setAddress(cardId.address)
      setStart(cardId.start.trim())
      setEnd(cardId.end.trim())
      setCategory(cardId.category)
    } else {
      setImg(null)
      setName("")
      setAddress("")
      setStart("")
      setEnd("")
    }
  }, [cardId])
  const updateItemsByCardId = async () => {
    try { 
      let dat = new Date(start);
      const minuts = dat.getMinutes()
      const hours = dat.getHours()
      const monthIndex = dat.getMonth();
      const date = dat.getDate();
      let endDate = new Date(end)
      const endmonht = endDate.getMonth();
      const enddate = endDate.getDate();
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const lastmonth = monthNames[endmonht]
      const formattedend = `${lastmonth} ${enddate}`
      const monthName = monthNames[monthIndex];
      const formattedDate = `${monthName} ${date}`;
      const matching = `${hours === 0 ? '12:00' : hours >= 10 ?  hours+':00':'0'+hours+":00"}`
      const object = {
        name:name,
        address:address,
        image:img,
        timeS:start,
        timeE:end,
        date:formattedDate,
        lastDate:formattedend,
        start:matching,
        height:cardId.height,
        lastUpdated:cardId.lastUpdated,
        expired:cardId.expired,
        minutes:minuts,
        category:category,
        _id:cardId.id,  
        oldTime:cardId.time,
        oldCategory:cardId.category,
        oldImg:cardId.img,
        oldId:cardId.id
        }  
        const headers = { "Content-Type": "multipart/form-data" };
        await axios.post(`${BASE_API_URL}/UpdateData`, object,{headers});
      GetAllData()
      setAddNewTodo(false);
      setImg(null);
      setName("");
      setShowimg(null)
      setAddress("");
      setStart("");
      setEnd("");
    } catch (error) {
      console.log(error)
    }
   
  }
 
  return (
    <>
      <div className="w-full  shado rounded-[10px] h-full flex items-center justify-center">
        {addNewTodo ?
          <div className="main_time_data_div">
            <div className="form_Edit h-fit w-full pt-5">
              <div>
                <label htmlFor="profile_img" className='profile_img'> 
                {showImg ? showImg.length > 1000 ? <img src={showImg} alt="icons"  className='w-full object-cover h-full' />
                : <img src={`${IMAGE_URL}/${showImg}`}  alt="image"
                 className='w-full object-cover h-full' /> : <span>profile</span>
                }
                  <input type="file" name="image" accept="image/*" id='profile_img' className='display-none' onChange={handelImgeFunc} />
                </label>
              </div>
              <div>
                <label htmlFor="1">name</label><br />
                <input type="text" placeholder='name' id='1' value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="2">address</label><br />
                <input type="text" placeholder='address' value={address} id='2' onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div>
                <label className='m-0'>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Stay">Stay</option>
                  <option value="Do">Do</option>
                  <option value="Eat">Eat</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="time_div flex aitems-center justify-between gap-1 flex-wrap w-full">
              <div>
                <label htmlFor="timeData" className="animated-input">Start</label><br />
                <input
                  type="datetime-local"
                  id="timeData"
                  className='start_time' value={start} onChange={(e) => setStart(e.target.value)} />
              </div>
              <div>
                <label htmlFor="timeData2" className="animated-input">End</label><br />
                <input
                  type="datetime-local"
                  id="timeData2"
                  className='start_time' value={end} onChange={(e) => setEnd(e.target.value)} />
              </div>
            </div>
            {cardId != null ? <Button variant="text" className='btn_Add' onClick={updateItemsByCardId}>
              edit
            </Button>
              :
              <Button variant="text" className='btn_Add' onClick={handelFunc}>
                save changings
              </Button>}
          </div> : <div className='flex h-full w-full items-center justify-center'
            onDrop={handleDrop}
            onDragOver={allowDrop}
            >
            <p className="text_shadow flex items-center gap-2">
              <img src={arrowImg} alt="icons" className="img_icon mt-2" /> Select a block to start.
            </p></div>}
      </div>
    </>
  )
}

export default TextBlock
