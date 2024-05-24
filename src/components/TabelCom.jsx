import React, { useContext, useEffect, useState } from 'react';
import starimg from "../assets/star.png";
import arroimg from "../assets/arrows.png";
import { AppContext } from '../context/CreateContext';
import axios from "axios"
import { BASE_API_URL } from '../Config';
import { MonthName } from '../assets/data';


const TabelCom = () => {


    const [selectedMonth, setSelectedMonth] = useState("");
    const [daysInMonth, setDaysInMonth] = useState([]);
    const { tableData, setOpen, GetAllData, monthsWithData, } = useContext(AppContext)
    const [isDraggingOver, setIsDraggingOver] = useState("");
    const [dragData, setDragData] = useState([])
    const [selectedDay, setSelectedDay] = useState("")
  


    useEffect(() => {
        setDragData(tableData)
    }, [tableData])

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
                            await axios.post(`${BASE_API_URL}/DragAndDrop`, { data: cards, olddata: oldCard })
                            GetAllData()
                            // handelsorting()
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
        if (e) {
            try {
                setSelectedDay(e.target.value)
                const data = { month: selectedMonth, day: e.target.value };
                const response = await axios.post(`${BASE_API_URL}/sortingData`, data);
                setDragData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    };



    const calculateTimeDifference = (startTime, endTime,) => {
        let Hours = 0
        const now = new Date();
        const start = new Date(startTime);
        const end = new Date(endTime);
        const addedDate = parseInt(selectedDay) || now.getDate()
        const diffFromStart = now - start;
        const hoursFromStart = Math.floor((diffFromStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (addedDate === start.getDate() && addedDate === now.getDate()) {
            Hours = hoursFromStart;
        } else if (addedDate === now.getDate()) {
            Hours = hoursFromStart;
        } else if (addedDate > end.getDate() || addedDate < start.getDate()) {
            Hours = 0;
        } else if (addedDate > start.getDate() && addedDate < now.getDate()) {
            Hours = 24;
        } else if (addedDate < end.getDate() && addedDate > now.getDate()) {
            Hours = 2;
        } else if (addedDate === end.getDate() && addedDate > now.getDate()) {
            Hours = 2;
        } else {
            Hours = 24;
        } 
        let height = 0;
        const increment = 45;
        for (let i = 1; i < Hours; i++) {
            height += increment;
        }
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
                                        <select className='w-6/12 focus:outline-none shadow-none' onChange={handleSorting}>
                                            {daysInMonth?.map((day) => (
                                                <option key={day} value={day}>{day}</option>
                                            ))}
                                        </select>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dragData.map((item, i) => (
                                <tr key={i}>
                                    <td className={`stay_div ${isDraggingOver === i ? 'dragover' : ''}`}
                                        onDragOver={(e) => handleDragOver(e, i)}
                                        onDrop={(e) => { handleDrop(e, 'stay', item.time) }}>
                                        {item.stay.map((stayItem, j) => {

                                            return (
                                                <div key={j}>
                                                    {stayItem.start === item.time.trim() ? (
                                                        <div className='card_div' style={{ height: calculateTimeDifference(stayItem.timeS, stayItem.timeE) || 45 }}
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
                                                    <div className='card_div' style={{ height: calculateTimeDifference(stayItem.timeS, stayItem.timeE) || 45}}
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
                                                    <div className='card_div' style={{ height: calculateTimeDifference(stayItem.timeS, stayItem.timeE) || 45}}
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
                                                    <div className='card_div' style={{ height: calculateTimeDifference(stayItem.timeS, stayItem.timeE)  || 45}}
                                                        onClick={() => SHowDetailsFunc(stayItem, item, "Other")}
                                                        onDragStart={(e) => handleDragStart(e, stayItem)}
                                                        draggable >
                                                             {console.log( calculateTimeDifference(stayItem.timeS, stayItem.timeE))}
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
