import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { BASE_API_URL } from "../Config";


export const AppContext = createContext({})
export const AppContextProvider = ({ children }) => {


  const [newData, setNewData] = useState(null)
  const [addNewTodo, setAddNewTodo] = useState(false)
  const [open, setOpen] = useState({ active: false, name: "", address: "",
   start: "", end: "", time: "", img: "", id: "", category: '',monthS:"" 
   ,monthE:"",height:0,lastUpdated:0,expired:false});
  const [cardId, setCardId] = useState(null)
  const [timelines, setTimelines] = useState([])
  const [tableData, setTableData] = useState([])
  const [monthsWithData, setMonthsWithData] = useState([]);
  const [havingData , setHavingData] = useState([]) 
 const [planData,setPlanData] = useState([])
 



useEffect(()=>{
  GetAllData()
},[])

  const handleClose = () => {
    setOpen((prev) => ({
      ...prev, active: false, name: "", address: "", start:
        "", end: "", img: "", id: "", time: "", category: ''
    }));
  };
  const hndleDeleteAPi = async (object,Id) => {
    try {
      const data = {
        id: object.id,
        time: object.time,
        category: object.category,
        projectId:Id
      } 
      await axios.post(`${BASE_API_URL}/removeCard`, data)
     GetAllData()
     handleClose() 
    } catch (error) {
      console.log(error)
    }

  }



  const GetAllData = async () => {
    try {
        const res = await axios.get(`${BASE_API_URL}/getallData`);
        const data = res?.data || []; 
        setTableData(data);
        setPlanData(data)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


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
        monthsWithData, setMonthsWithData ,
        planData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}