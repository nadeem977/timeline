import React,{useContext, useEffect} from 'react'
import { FiPlus } from 'react-icons/fi';
import { AppContext } from '../context/CreateContext';


const SideBar = () => {



  const {setAddNewTodo} = useContext(AppContext)
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


  return (
    <>
        <div className="bar_list_box">
              <div className="box"></div>
              <div className="box"></div>
              <div className="box"></div>
              <div className="box"></div>
              <div className="box"></div>
              <div className="box click_box" onClick={()=>setAddNewTodo(true)}>
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
