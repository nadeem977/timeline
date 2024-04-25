import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { BASE_API_URL } from "../Config";


export const AppContext = createContext({})
export const AppContextProvider = ({ children }) => {


  const [newData, setNewData] = useState(null)
  const [addNewTodo, setAddNewTodo] = useState(false)
  const [open, setOpen] = useState({ active: false, name: "", address: "", start: "", end: "", time: "", img: "", id: "", category: '' });
  const [cardId, setCardId] = useState(null)
  const [timelines, setTimelines] = useState([])
  const [tableData, setTableData] = useState([])





  const handleClose = () => {
    setOpen((prev) => ({
      ...prev, active: false, name: "", address: "", start:
        "", end: "", img: "", id: "", time: "", category: ''
    }));
  };
  const hndleDeleteAPi = async (object) => {
    try {
      const data = {
        id: object.id,
        time: object.time,
        category: object.category
      }
     const res = await axios.post(`${BASE_API_URL}/removeCard`, data)
     if(res.data){
       GetAllData()
       handleClose()
     }
    } catch (error) {
      console.log(error)
    }

  }
  const GetAllData = async () => {
    try {
      const res = await axios.get(`${BASE_API_URL}/getallData`)
      // console.log(res)
      setTableData(res?.data)
    } catch (error) {
      console.log(error)
    }
  }
 



  useEffect(() => {
    GetAllData()
  }, [])




  return (
    <AppContext.Provider
      value={{
        newData, setNewData,
        addNewTodo, setAddNewTodo,
        hndleDeleteAPi,
        open, setOpen,
        cardId, setCardId,
        timelines, setTimelines,
        tableData, setTableData,
        GetAllData, handleClose,
         
      }}
    >
      {children}
    </AppContext.Provider>
  )
}