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
          id: 'af2', name:'monika',nbr:"46 771 793 336", address: "Krachi", timeS: "03/23/2024", timeE: "03/24/2024"
          , img: "https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp"
        },
        { id: 'af3', name: 'akash chanchlani',nbr:"+443474762167", address: "india", timeS: "03/7/2024", timeE: "03/8/2024", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZR5Xjvl5fZY8silHq99to7ujq2XUV5S7a4Q&usqp=CAU" },
      ],
      tint: 1,
    },
    {
      id: 'af4',
      name: 'do',
      items: [
        { id: 'af5', name: 'park', address: "chaina",nbr:"+4434747623467", timeS: "02/3/2024", timeE: "02/4/2024", img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkjQ1dar8xuyOXbCOXk4tHEzRizeDmA9aoQrvAuzD2j6Dsz0E0bg8_0LCrQdSUEN2s-Dk&usqp=CAU' },
        { id: 'af6', name: 'mark', address: "amarica",nbr:"+443474762167", timeS: "01/9/2024", timeE: "01/10/2024", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy95F3FpO_E61ral7Ypotp_w2h_xtqsgOSig&usqp=CAU" },
      ],
      tint: 2,
    },
    {
      id: 'af7',
      name: 'eat',
      items: [
        { id: 'af8', name: 'amir', address: "dubai",nbr:"+443474762167", timeS: "01/5/2024", timeE: "01/6/2024", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQix0aJcHrZfDqlr0N-xaLne6C5Il5-57DIUw&usqp=CAU" },
        { id: 'af9', name: 'hamad', address: "spain",nbr:"+443474762167", timeS: "02/13/2024", timeE: "02/14/2024", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzQBQuIz76W8hvZt8qxOvgCCt0mzKMd0wdzp8w9Jpr0wi1Yx3tbbj49uajKcoGZlfsrgc&usqp=CAU" },
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

    const [img, setImg] = useState("")
    const [name ,setName]= useState("")
    const [address ,setAddress]= useState("")
    const [start ,setStart]= useState("")
    const [end ,setEnd]= useState("")
    const [number ,setNumber]= useState()
    const {setNewData,addNewTodo ,setAddNewTodo} = useContext(AppContext)

  useEffect(()=>{
    localStorage.setItem("data", JSON.stringify(DATA));
  },[])
  
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
            timeE: end ,
            nbr:number
           };
           val[0].items.push(newData);
          setNewData(val)
          setAddNewTodo(false)
          setImg("")
          setName("")
          setAddress("")
          setStart("")
          setEnd("")
          setNumber("")
    };


    return (
        <>
            <div className="w-full  shado rounded-[10px] ">
               {addNewTodo ? 
                <div className="main_time_data_div">
                    <div className="form_Edit h-fit w-full pt-5">
                        <div>
                            <label htmlFor="profile_img" className='profile_img'>
                               {img ? <img src={img} alt="icons"
                                className='w-full rounded-full object-cover h-full' />:<span>profile</span>}
                                <input type="file" id='profile_img' className='display-none' onChange={handelImgeFunc} />
                            </label>
                        </div>
                        <div>
                            <label htmlFor="1">name</label><br />
                            <input type="text" placeholder='name' id='1' value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="2">address</label><br />
                            <input type="text" placeholder='address' value={address} id='2' onChange={(e)=>setAddress(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="3">Number</label><br />
                            <input type="number" placeholder='number' value={number} id='3' onChange={(e)=>setNumber(e.target.value)}/>
                        </div>
                    </div>
                    <div className="time_div flex aitems-center justify-between gap-1 flex-wrap w-full">
                        <div>
                            <label htmlFor="timeData" className="animated-input">Start</label><br />
                            <input
                                type="datetime-local"
                                id="timeData"
                                className='start_time' onChange={(e)=>setStart(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="timeData2" className="animated-input">End</label><br />
                            <input
                                type="datetime-local"
                                id="timeData2"
                                className='start_time'  onChange={(e)=>setEnd(e.target.value)}/>
                        </div>
                    </div>
                    <Button variant="text" className='btn_Add' onClick={handelFunc}>
                      add to card
                    </Button>
                </div> : <div className='flex h-full w-full items-center justify-center'> <p className="text_shadow flex items-center gap-2">
                    <img src={arrowImg} alt="icons" className="img_icon mt-2" /> Select a block to start.
                </p></div>}
            </div>
        </>
    )
}

export default TextBlock
