import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TextBlock from '../components/TextBlock';
import TimeLine from '../components/TimeLine';
import SideBar from '../components/SideBar';
import { AppContext } from '../context/CreateContext';
import ShowData from '../components/ShowData';


const Home = () => {



  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState({});
  const { newData, setOpen} = useContext(AppContext)
  useEffect(() => {
    if (newData) {
      localStorage.setItem('data', JSON.stringify(newData));
    }
    const DATA = JSON.parse(localStorage.getItem("data"))
    buildAndSave(DATA);
  }, [newData]);



  const buildAndSave =(data) =>{
    const groups = {};
    for (let i = 0; i < data.length; ++i) {
      const currentGroup = data[i];
      groups[currentGroup.id] = i;
    }
    setItems(data);
    setGroups(groups);
  }

  const dragEndFunction = (result) => {
    const { destination, draggableId, source, type, } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const sourceDroppableIndex = groups[source.droppableId];
    const targetDroppableIndex = groups[destination.droppableId];
    const sourceItems = items[sourceDroppableIndex].items.slice();
    const targetItems = source.droppableId !== destination.droppableId ? items[targetDroppableIndex].items.slice() : sourceItems;
    const [deletedItem,] = sourceItems.splice(source.index, 1);
    targetItems.splice(destination.index, 0, deletedItem);
    const workValue = items.slice();
    workValue[sourceDroppableIndex] = {
      ...items[sourceDroppableIndex],
      items: sourceItems,
    };
    workValue[targetDroppableIndex] = {
      ...items[targetDroppableIndex],
      items: targetItems,
    };
    setItems(workValue);
    localStorage.setItem('data', JSON.stringify(workValue));
  }

  return (
    <DragDropContext
      onDragEnd={dragEndFunction}>
      <section className="w-full h-[99vh] flex items-center justify-center">
      <ShowData/>
        <div className="main_box w-full h-full flex items-center justify-between">
          <div className="w-6/12 h-full p-10 pt-2">
            <div className="flex items-center justify-between">
              <h1 className="text-7xl font_z">cal</h1> <h1 className="text-7xl font_z">A</h1>
            </div>
            <div className="side_Bar">
              <SideBar />
            </div>
            <TextBlock />
          </div>
          <div className="w-6/12 h-full pb-10 pt-3 pr-10 flex justify-between">
            <div className="main_card_div w-full">

              <div className="cards_box">
                {items.map((group, groupIndex) => (
                  <Droppable key={group.id} droppableId={group.id}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='card' key={groupIndex}>
                        <button className='btn_card'>{group.name}</button>
                        <div className='stay_div' style={{ borderRadius: groupIndex === 0 ? "20px 20px 0px 20px" : "" }}>
                          {group.items.map((item, index) => (
                            <Draggable draggableId={item.id} index={index} key={item.id}>
                              {(provided) => (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}>
                                  <div className="card_div">
                                    <div className='my-1 '>
                                      <img src={item.img} alt={item.name}
                                        className='w-[30px] h-[30px] cursor-pointer rounded-full object-cover m-auto'  
                                         onClick={() => {
                                          setOpen((prev)=>({...prev,active:true,name:item.name,address:item.address,start:item.timeS,end:item.timeE,nbr:item.nbr,img:item.img,id:item.id}));
                                        }}  />
                                     <p className='capitalize'>{item.name}</p>
                                    </div>
                                    
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
              <TimeLine />
            </div>
          </div>
        </div>
      </section>
    </DragDropContext>
  );
};

export default Home;
