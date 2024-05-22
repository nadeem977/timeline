import React, { useContext, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi';
import { AppContext } from '../context/CreateContext';


const SideBar = () => {



  const { setAddNewTodo, addNewTodo, setCardId } = useContext(AppContext)
  const [active, setActive] = useState(null)
  useEffect(() => {
    function setBoxSize() {
      const sideBarHeight = document.querySelector('.side_Bar').clientHeight;
      const boxes = document.querySelectorAll('.bar_list_box .box');
      const boxHeight = (sideBarHeight - (boxes.length - 1) * 20) / boxes.length;
      const boxWidth = document.querySelector('.side_Bar').offsetWidth - 32;
      boxes.forEach(box => {
        box.style.height = `${boxHeight}px`;
        box.style.width = `${boxWidth}px`;
      });
    }

    setBoxSize();
    window.addEventListener('resize', setBoxSize);

    return () => {
      window.removeEventListener('resize', setBoxSize);
    };
  }, []);


  const handleDragStart = (e, active) => {
    e.dataTransfer.setData('boxId', 'droppedBox');
    setActive(active)
  };
  const handelDragEnd = (e, active) => {
    e.preventDefault(); 
    setActive(active)
  }

  return (
    <>
      <div className="bar_list_box">
        {
          [1, 2, 3, 4, 5, 6].map((_, i) => (
            <div key={i} className={`box ${active === i ? "dragging": ""}`}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, i)}
              onDragEnd={(e) => handelDragEnd(e, false)}
            ></div>
          ))}

        <div className="box click_box" onClick={() => {
          setAddNewTodo(!addNewTodo)
          setCardId(null)
        }}>
          <FiPlus className="icons_plus" />
        </div>
      </div>
      <div className="expended">
        <p className="btn_inset"></p>
      </div>
    </>
  )
}

export default SideBar
