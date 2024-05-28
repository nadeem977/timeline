import React, { useContext, useEffect, useState } from 'react';
import starimg from "../assets/star.png";
import arroimg from "../assets/arrows.png";
import { AppContext } from '../context/CreateContext';
import axios from "axios"
import { BASE_API_URL } from '../Config';
import { MonthName } from '../assets/data';


const TabelCom = ({data}) => {


    const [selectedMonth, setSelectedMonth] = useState("");
    const [daysInMonth, setDaysInMonth] = useState([]);
    const { setOpen, GetAllData, monthsWithData, } = useContext(AppContext)
    const [isDraggingOver, setIsDraggingOver] = useState("");
    const [dragData, setDragData] = useState([])
    const [selectedDay, setSelectedDay] = useState("")

 
    useEffect(() => {
        setSelectedDay(new Date().getDate())
        setDragData(data.plan)
    }, [data])
 

    useEffect(() => {
        const Currentmonth = new Date().getMonth();
        if (Currentmonth >= 0) {
            setSelectedMonth(MonthName[Currentmonth].month);
            const currentYear = new Date().getFullYear();
            const date = new Date(currentYear, Currentmonth + 1, 0);
            const numDays = date.getDate();
            const daysInArr = [];
            for (let i = 1; i <= numDays; i++) {
                daysInArr.push(i);
            }
            setDaysInMonth(daysInArr);
        }
    }, []);
    const SHowDetailsFunc = (Data, item, categorys) => {
        setOpen((prev) => ({
            ...prev, active: true, name: Data.name,
            time: item.time.trim(), address: Data.address, start: Data.timeS,
            end: Data.timeE, img: Data.img, id: Data._id, category: categorys,
            monthS: Data?.startDate,
            monthE: Data?.lastDate,
            height: Data?.height,
            lastUpdated: Data?.lastUpdated, expired: Data?.expired
        }))
    }
    const handleDragStart = (event, stayItem) => {
        event.dataTransfer.setData('text/plain', JSON.stringify(stayItem));
    }
    const handleDragOver = (event, index) => {
        event.preventDefault();
        setIsDraggingOver(true);
        setIsDraggingOver(index)
    }
    const handleDrop = async (e, category, time) => {
        e.preventDefault();
        setIsDraggingOver("");
        const droppedItem = JSON.parse(e.dataTransfer.getData('text/plain'));
        const oldCard = { ...droppedItem };
        const cards = droppedItem
        var originalTime = cards.timeS;
        var newHours = parseInt(time);
        var originalDate = new Date(originalTime);
        originalDate.setUTCHours(newHours);
        var updatedTime = originalDate.toISOString().slice(0, 16);
        if (oldCard.start !== time || oldCard.start === time && oldCard.category !== category) {
            setDragData(prevDragData => {
                return prevDragData.map((item) => {
                    if (item.time === time) {
                        item[category.toLowerCase()].push(cards)
                    }
                    if (item.time === oldCard.start) {
                        item[oldCard.category.toLowerCase()] = item[oldCard.category.toLowerCase()].filter(item => item._id !== oldCard._id);
                    }
                    return item
                })
            });
            const updatedData = dragData
            if (updatedData && cards) {
                cards.start = time
                cards.category = category
                cards.timeS = updatedTime
                for (let i = 0; i < updatedData.length; i++) {
                    const newData = updatedData[i]
                    if (newData.time === time) {
                        try {
                            await axios.post(`${BASE_API_URL}/DragAndDrop`, { data: cards, olddata: oldCard,projectId:data._id })
                            GetAllData() 
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            }
        }
    };
    const handleMonthChange = (e) => {
        const mahina = e.target.value;
        setSelectedMonth(mahina);
        const formattedMonth = mahina.charAt(0).toUpperCase() + mahina.slice(1).toLowerCase();
        const currentYear = new Date().getFullYear();
        const date = new Date(currentYear, new Date(Date.parse(formattedMonth + " 1, " + currentYear)).getMonth() + 1, 0);
        const numDays = date.getDate();
        const daysInArr = [];
        for (let i = 1; i <= numDays; i++) {
            daysInArr.push(i);
        }
        setDaysInMonth(daysInArr);
    };
    const handleSorting = async (e) => {
        console.log(selectedMonth)
        if (e) {
            try {
                setSelectedDay(e.target.value)
                const datas = { month: selectedMonth, day: e.target.value,projectId:data._id };
                const response = await axios.post(`${BASE_API_URL}/sortingData`, datas);
                setDragData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    };


   
    const calculateTimeDifference = (startTime, endTime,category,time) => {    
        const start = new Date(startTime);
        const end = new Date(endTime);  
        const currentDay = parseInt(selectedDay, 10); 
        const diffInMs = end - start;
        const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const endDay = end.getDate();
        let result =24;
        if (currentDay === endDay) {
            result = diffInHours;
        }
        let height = result*45;
        return height;
    };
   
 
    return (
        <>

            <div className='h-full w-6/12 mr-5 py-6 flex flex-col gap-4 pb-[2.5rem]'>
                <div className='main_card_div heit w-full  overflow-auto'>
                    <table className='w-full overflow-hidden'>
                        <thead>
                            <tr>
                                <th className='btn_card'>stay</th>
                                <th className='btn_card'>do</th>
                                <th className='btn_card'>eat</th>
                                <th className='btn_card'>other</th>
                                <th className='p-0 w-[150px]'>
                                    <div className='flex w-full items-center shados rounded-full overflow-hidden'>
                                        <select value={selectedMonth} onChange={handleMonthChange} className='w-6/12 focus:outline-none shadow-none'>
                                            {MonthName.map((item, i) => {
                                                const isDisabled = !monthsWithData.includes(item.month);
                                                return (
                                                    <option key={i} className='font-[600]'
                                                        value={item.month} disabled={isDisabled}>{item.month}</option>
                                                );
                                            })}
                                        </select>
                                        <select className='w-6/12 focus:outline-none shadow-none'
                                         onChange={handleSorting}>
                                            {daysInMonth?.map((day) => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </select>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dragData?.map((item, i) => (
                                <tr key={i}>
                                    <td className={`stay_div ${isDraggingOver === i ? 'dragover' : ''}`}
                                        onDragOver={(e) => handleDragOver(e, i)}
                                        onDrop={(e) => { handleDrop(e, 'stay', item.time) }}>
                                        {item.stay.map((stayItem, j) => {

                                            return (
                                                <div key={j}>
                                                    {stayItem.start === item.time.trim() ? (
                                                        <div className='card_div' style={{ height: calculateTimeDifference(stayItem.timeS, stayItem.timeE,stayItem.category ,item.time)}}
                                                            onClick={() => SHowDetailsFunc(stayItem, item, "Stay")}
                                                            onDragStart={(e) => handleDragStart(e, stayItem)}
                                                            draggable> 
                                                            {stayItem.name}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            )
                                        })}

                                    </td>
                                    <td
                                        className={`stay_div ${isDraggingOver === i ? 'dragover' : ''}`}
                                        onDragOver={(e) => handleDragOver(e, i)}
                                        onDrop={(e) => { handleDrop(e, 'do', item.time) }} >
                                        {item.do.map((stayItem, j) => (
                                            <div key={j}>
                                                {stayItem.start === item.time.trim() ? (
                                                    <div className='card_div' style={{ height: calculateTimeDifference(stayItem.timeS, stayItem.timeE ,stayItem.category,item.time)}}
                                                        onClick={() => SHowDetailsFunc(stayItem, item, "Do")}
                                                        onDragStart={(e) => handleDragStart(e, stayItem)}
                                                        draggable> 
                                                        {stayItem.name}
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </td>
                                    {/* Eat  */}
                                    <td
                                        className={`stay_div ${isDraggingOver === i ? 'dragover' : ''}`}
                                        onDragOver={(e) => handleDragOver(e, i)}
                                        onDrop={(e) => { handleDrop(e, 'eat', item.time) }}>
                                        {item.eat.map((stayItem, j) => (
                                            <div key={j}>
                                                {stayItem.start === item.time.trim() ? (
                                                    <div className='card_div' style={{ height: calculateTimeDifference(stayItem.timeS, stayItem.timeE,stayItem.category ,item.time)}}
                                                        onClick={() => SHowDetailsFunc(stayItem, item, "Eat")}
                                                        onDragStart={(e) => handleDragStart(e, stayItem)}
                                                        draggable> 
                                                        {stayItem.name}
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </td>
                                    {/* Other  */}
                                    <td
                                        className={`stay_div ${isDraggingOver === i ? 'dragover' : ''}`}
                                        onDragOver={(e) => handleDragOver(e, i)}
                                        onDrop={(e) => { handleDrop(e, 'other', item.time) }}>
                                        {item.other.map((stayItem, j) => (
                                            <div key={j}>
                                                {stayItem.start === item.time.trim() ? (
                                                    <div className='card_div' style={{ height:calculateTimeDifference(stayItem.timeS, stayItem.timeE,stayItem.category ,item.time)}}
                                                        onClick={() => SHowDetailsFunc(stayItem, item, "Other")}
                                                        onDragStart={(e) => handleDragStart(e, stayItem)}
                                                        draggable > 
                                                        {stayItem.name}
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </td>
                                    <td className='stay_div text-center'>{item.time}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                <div className='input_divs flex justify-between items-center rounded-full px-2 py-1'>
                    <img src={starimg} alt="icons" width={30} />
                    <img src={arroimg} alt="icons" width={20} />
                </div>
            </div>
        </>
    );
};

export default TabelCom;
