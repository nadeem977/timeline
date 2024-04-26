import React, { useContext, useEffect, useState } from 'react';
import starimg from "../assets/star.png";
import arroimg from "../assets/arrows.png";
import { AppContext } from '../context/CreateContext';
import axios from "axios"
import { BASE_API_URL } from '../Config';


const TabelCom = () => {

    const { tableData, setOpen, GetAllData } = useContext(AppContext)
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [dragData, setDragData] = useState([])

    useEffect(() => {
        setDragData(tableData)
    }, [tableData])

    const SHowDetailsFunc = (Data, item, categorys) => {
        setOpen((prev) => ({
            ...prev, active: true, name: Data.name,
            time: item.time.trim(), address: Data.address, start: Data.timeS,
            end: Data.timeE, img: Data.img, id: Data._id, category: categorys
        }))
    }
    const handleDragStart = (event, stayItem) => {
        event.dataTransfer.setData('text/plain', JSON.stringify(stayItem));
    }
    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDraggingOver(true);
    }
    const handleDragLeave = () => {
        setIsDraggingOver(false);
    }









    const handleDrop = async (e, category, time) => {
        e.preventDefault();
        setIsDraggingOver(false);
        const droppedItem = JSON.parse(e.dataTransfer.getData('text/plain'));
        const oldCard = { ...droppedItem };
        const cards = droppedItem

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
            for (let i = 0; i < updatedData.length; i++) {
                const newData = updatedData[i]
                if (newData.time === time) {
                    try {
                        const data = {
                            time: time,
                            stay: category === "stay" ? cards : newData.stay,
                            do: category === "do" ? cards : newData.do,
                            eat: category === "eat" ? cards : newData.eat,
                            other: category === "other" ? cards : newData.other
                        }
                        const res = await axios.post(`${BASE_API_URL}/DragAndDrop`, { data: data, olddata: oldCard })
                        GetAllData()
                        console.log("response", res)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        }
    };








    return (
        <>

            <div className='h-full w-6/12 mr-5 py-6 flex flex-col gap-4 pb-[2.5rem]'>
                <div className='main_card_div heit w-full  overflow-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th className='btn_card'>stay</th>
                                <th className='btn_card'>do</th>
                                <th className='btn_card'>eat</th>
                                <th className='btn_card'>other</th>
                                <th className='btn_card'>timeline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dragData.map((item, i) => (
                                <tr key={i}>
                                    <td className={`stay_div ${isDraggingOver ? 'drag-over' : ''}`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={(e) => { handleDrop(e, 'stay', item.time) }}>
                                        {item.stay.map((stayItem, j) => (
                                            <div key={j}>
                                                {stayItem.start === item.time.trim() ? (
                                                    <div className='card_div'
                                                        onClick={() => SHowDetailsFunc(stayItem, item, "Stay")}
                                                        onDragStart={(e) => handleDragStart(e, stayItem)}
                                                        draggable>
                                                        {stayItem.name}
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </td>
                                    <td
                                        className={`stay_div ${isDraggingOver ? 'drag-over' : ''}`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={(e) => { handleDrop(e, 'do', item.time) }} >
                                        {item.do.map((stayItem, j) => (
                                            <div key={j}>
                                                {stayItem.start === item.time.trim() ? (
                                                    <div className='card_div'
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
                                        className={`stay_div ${isDraggingOver ? 'drag-over' : ''}`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={(e) => { handleDrop(e, 'eat', item.time) }}>
                                        {item.eat.map((stayItem, j) => (
                                            <div key={j}>
                                                {stayItem.start === item.time.trim() ? (
                                                    <div className='card_div'
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
                                        className={`stay_div ${isDraggingOver ? 'drag-over' : ''}`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={(e) => { handleDrop(e, 'other', item.time) }}>
                                        {item.other.map((stayItem, j) => (
                                            <div key={j}>
                                                {stayItem.start === item.time.trim() ? (
                                                    <div className='card_div'
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
