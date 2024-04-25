import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AppContext } from '../context/CreateContext';
import TimeLine from '../components/TimeLine';



const CardsComponent = () => {


    const [items, setItems] = useState([]);
    const [groups, setGroups] = useState({});
    const { newData, setOpen } = useContext(AppContext)
   
  
    useEffect(() => {
      if (newData) {
        localStorage.setItem('datas', JSON.stringify(newData));
      }
      const DATA = JSON.parse(localStorage.getItem("datas"));
      buildAndSave(DATA);
    }, [newData]);
   
    const buildAndSave = (data) => {
      const groups = {};
      for (let i = 0; i < data.length; ++i) {
        const currentGroup = data[i];
        groups[currentGroup.id] = i;
      }
      setItems(data);
      setGroups(groups);
    }
  
    const dragEndFunction = (result) => {
      const { destination, source,  } = result;
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
      localStorage.setItem('datas', JSON.stringify(workValue));
    }
  

  return (
    <>
     <DragDropContext  onDragEnd={dragEndFunction}>
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
                                  ref={provided.innerRef} className='main_card_height'
                                  >
                                  <div className="card_div" 
                                    onClick={() => {
                                      setOpen((prev) => ({ ...prev, active: true, name: item.name, address: item.address, start: item.timeS, end: item.timeE, nbr: item.nbr, img: item.img, id: item.id }));
                                    }} >
                                    <div className='my-1 '>
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
    </DragDropContext> 
    </>
  )
}

export default CardsComponent
