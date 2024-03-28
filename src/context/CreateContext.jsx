import { createContext,useEffect,useState } from "react";

export const AppContext = createContext({})

export const AppContextProvider = ({children})=>{


   const [newData ,setNewData] = useState(null)
   const [ addNewTodo ,setAddNewTodo] = useState(false)
   const [open, setOpen] = useState({active:false,name:"",address:"",start:"",end:"",nbr:"",img:"",id:""});
   const [cardId ,setCardId] = useState(null)

   const hndleDeleteAPi = (id) => {
    let val = JSON.parse(localStorage.getItem('data'));
    let index = -1;
    for (let i = 0; i < val.length; i++) {
      const items = val[i].items;
      const itemIndex = items.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      const items = val[index].items;
      const itemIndex = items.findIndex(item => item.id === id);
      items.splice(itemIndex, 1);
      setNewData(val)
      console.log('Item deleted successfully.');
    } else {
      console.log('Item with the given ID not found.');
    }
  }



    return (
        <AppContext.Provider 
        value={{
            newData ,setNewData,
            addNewTodo ,setAddNewTodo,
            hndleDeleteAPi,
            open, setOpen,
            cardId ,setCardId
        }}
        >
              {children}
        </AppContext.Provider>
    )
}