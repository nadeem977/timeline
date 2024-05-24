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
  const [planData ,setPlanData] = useState([])
  useEffect(() => {
    GetAllData()
    // const interval = setInterval(GetAllData, 60000);
    // return () => clearInterval(interval);
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
        setPlanData(data)
        const consolidatedData = data.flatMap((item) => [
            ...(item.stay?.filter((subItem) => subItem?.startDate || subItem?.lastDate) || []),
            ...(item.do?.filter((subItem) => subItem?.startDate || subItem?.lastDate) || []),
            ...(item.eat?.filter((subItem) => subItem?.startDate || subItem?.lastDate) || []),
            ...(item.other?.filter((subItem) => subItem?.startDate || subItem?.lastDate) || []),
        ]);

        const uniqueYears = new Set();
        const filteredData = consolidatedData.filter((item) => {
            const startYear = item.startDate?.slice(0, 4);
            const endYear = item.lastDate?.slice(0, 4);
            const includeStartDate = startYear && !uniqueYears.has(startYear);
            const includeEndDate = endYear && !uniqueYears.has(endYear);

            if (includeStartDate) {
                uniqueYears.add(startYear);
                return true;
            }
            if (includeEndDate) {
                uniqueYears.add(endYear);
                return true;
            }
            return false;
        });
        setHavingData(filteredData)

        if (filteredData.length > 0) { 
 
            const monthsWithData = filteredData.flatMap(item => {
                const startMonth = item.startDate ? new Date(item.startDate).toLocaleString('default', { month: 'long' }) : null;
                const endMonth = item.lastDate ? new Date(item.lastDate).toLocaleString('default', { month: 'long' }) : null;
                return [startMonth, endMonth].filter(Boolean);
            });
            setMonthsWithData([...new Set(monthsWithData)]);  
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
        monthsWithData, setMonthsWithData ,
        planData
      }}
    >
      {children}
    </AppContext.Provider>
  )
}