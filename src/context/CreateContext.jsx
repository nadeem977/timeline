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
  
  useEffect(() => {
    GetAllData()
  }, [])

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
      
      const consolidatedData = data.flatMap((item) => [
        ...(item.stay?.filter((subItem) => subItem?.startDate) || []),
        ...(item.do?.filter((subItem) => subItem?.startDate) || []),
        ...(item.eat?.filter((subItem) => subItem?.startDate) || []),
        ...(item.other?.filter((subItem) => subItem?.startDate) || []),
      ]);

      const uniqueYears = new Set();
      const filteredData = consolidatedData.filter((item) => {
        const year = item.startDate.slice(0, 4);
        if (!uniqueYears.has(year)) {
          uniqueYears.add(year);
          return true;
        }
        return false;
      });
  
      if (filteredData.length > 0) {
        const monthsWithData = filteredData.map(item => new Date(item.startDate).toLocaleString('default', { month: 'long' }));
        setMonthsWithData(monthsWithData);
      }
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
        monthsWithData, setMonthsWithData
         
      }}
    >
      {children}
    </AppContext.Provider>
  )
}