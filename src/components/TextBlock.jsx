import React, { useContext, useEffect, useState } from 'react'
import arrowImg from '../assets/arrow.png';
import Button from '@mui/material/Button'
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../context/CreateContext';


const DATA = [
  {
    id: 'af1',
    name: 'stay',
    items: [
      {
        id: 'af2', name: 'monika', address: "Krachi", timeS: "2024-03-25T17:25", timeE: "2024-03-26T18:25"
        , img: "https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp"
      },
      { id: 'af3', name: 'akash chanchlani', address: "india", timeS: "2024-03-25T6:00", timeE: "2024-03-25T7:00", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZR5Xjvl5fZY8silHq99to7ujq2XUV5S7a4Q&usqp=CAU" },
    ],
    tint: 1,
  },
  {
    id: 'af4',
    name: 'do',
    items: [
      { id: 'af5', name: 'park', address: "chaina", timeS: "2024-03-25T12:00", timeE: "2024-03-25T1:00", img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkjQ1dar8xuyOXbCOXk4tHEzRizeDmA9aoQrvAuzD2j6Dsz0E0bg8_0LCrQdSUEN2s-Dk&usqp=CAU' },
      { id: 'af6', name: 'mark', address: "amarica", timeS: "2024-03-25T11:10", timeE: "2024-03-25T12:10", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy95F3FpO_E61ral7Ypotp_w2h_xtqsgOSig&usqp=CAU" },
    ],
    tint: 2,
  },
  {
    id: 'af7',
    name: 'eat',
    items: [
      { id: 'af8', name: 'amir', address: "dubai", timeS: "2024-03-25T1:00", timeE: "2024-03-25T1:00", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQix0aJcHrZfDqlr0N-xaLne6C5Il5-57DIUw&usqp=CAU" },
      { id: 'af9', name: 'hamad', address: "spain", timeS: "2024-03-25T17:00", timeE: "2024-03-25T18:00", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzQBQuIz76W8hvZt8qxOvgCCt0mzKMd0wdzp8w9Jpr0wi1Yx3tbbj49uajKcoGZlfsrgc&usqp=CAU" },
    ],
    tint: 3,
  },
  {
    id: 'af10',
    name: 'other',
    items: [
    ],
    tint: 4,
  },
];
const DATABlanck = [
  {
    id: 'af1',
    name: 'stay',
    items: [

    ],
    tint: 1,
  },
  {
    id: 'af4',
    name: 'do',
    items: [

    ],
    tint: 2,
  },
  {
    id: 'af7',
    name: 'eat',
    items: [

    ],
    tint: 3,
  },
  {
    id: 'af10',
    name: 'other',
    items: [
    ],
    tint: 4,
  },
];

const TextBlock = () => {

  const [img, setImg] = useState(null)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const { setNewData, addNewTodo, setAddNewTodo, cardId, setOpen, open ,setCardId} = useContext(AppContext)
  const [droppedBoxId, setDroppedBoxId] = useState(null);
  
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData('boxId');
    setDroppedBoxId(droppedId);
  };
  const allowDrop = (e) => {
    e.preventDefault();
  };
useEffect(()=>{
  if(droppedBoxId){
    setAddNewTodo(true)
    setDroppedBoxId(null)
  }
},[droppedBoxId])

  useEffect(() => {
    const existingData = localStorage.getItem("data");
    if (!existingData) {
      localStorage.setItem("data", JSON.stringify(DATABlanck));
    }
  }, []);
  const handelImgeFunc = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      setImg(evt.target.result);
    };
    reader.readAsDataURL(image);
  };
  const handelFunc = () => {
    const val = JSON.parse(localStorage.getItem("data"));
    const newData = {
      id: uuidv4(),
      name: name,
      address: address,
      img: img,
      timeS: start,
      timeE: end,
    };
    val[0].items.push(newData);
    setNewData(val)
    setAddNewTodo(false)
    setImg(null)
    setName("")
    setAddress("")
    setStart("")
    setEnd("")
    console.log(start)
  };
  useEffect(() => {
    if (cardId != null) {
      setAddNewTodo(true)
      setOpen((prev) => ({ ...prev, active: false }))
      setImg(open.img)
      setName(open.name)
      setAddress(open.address)
      setStart(open.start)
      setEnd(open.end)
    }else{
      setImg(null)
      setName("")
      setAddress("")
      setStart("")
      setEnd("")
    }
  }, [cardId])

  const updateItemsByCardId = () => {
    let updatedItems = {
      name: name,
      address: address,
      timeS: start,
      timeE: end,
      img: img
    };
  
    const getexistingData = JSON.parse(localStorage.getItem("data"));
    if (getexistingData) {
      const updatedData = getexistingData.map(card => {
        if (card.items && card.items.length > 0) {
          const updatedCard = { ...card };
          updatedCard.items = updatedCard.items.map(item => {
            if (item.id === cardId.id) {
              return { ...item, ...updatedItems };
            }
            return item;
          });
          return updatedCard;
        }
        return card;
      });
      setNewData(updatedData);
      setAddNewTodo(false)
      setCardId(null)
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
                  {img ? <img src={img} alt="icons"
                    className='w-full object-cover h-full' /> : <span>profile</span>}
                  <input type="file" id='profile_img' className='display-none' onChange={handelImgeFunc} />
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
        onDragOver={allowDrop}>
            <p className="text_shadow flex items-center gap-2">
              <img src={arrowImg} alt="icons" className="img_icon mt-2" /> Select a block to start.
            </p></div>}
      </div>
    </>
  )
}

export default TextBlock
