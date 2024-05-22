const express = require('express');
const {UserSchedule,getCards,DeleteSchedule, EditCards ,updateTableDragging,handleSortingTime } = require("../controllers/Getchedule");  
const multer = require('multer');
const path = require("path"); 
const Schedule = require('../models/Schedule');
const router = express.Router()
    


const tabelAPI = [
    {
      time:"01:00",
      stay:[ ],
      do:[ 
      ],
      eat:[],
      other:[],
    },
    {
      time:"02:00",
      stay:[],
      do:[],
      eat:[],
      other:[],
    },
    {
      time:"03:00",
      stay:[ ],
      do:[ ],
      eat:[ ],
      other:[ ],
    },
    {
      time:"04:00",
      stay:[
        
      ],
      do:[
        
      ],
      eat:[
         
      ],
      other:[
        
      ],
    },
    {
      time:"05:00",
      stay:[
        
      ],
      do:[
         
      ],
      eat:[
        
      ],
      other:[
       
      ],
    },
    {
      time:"06:00",
      stay:[
        
      ],
      do:[
        
      ],
      eat:[
       
      ],
      other:[
       
      ],
    },
    {
      time:"07:00",
      stay:[
         
      ],
      do:[
        
      ],
      eat:[
        
      ],
      other:[
        
      ],
    },
    {
      time:"08:00",
      stay:[
         
      ],
      do:[
       
      ],
      eat:[
        
      ],
      other:[
      
      ],
    },
    {
      time:"09:00",
      stay:[
         
      ],
      do:[
        
      ],
      eat:[
       
      ],
      other:[
       
      ],
    },
    {
      time:"10:00",
      stay:[
        
      ],
      do:[
        
      ],
      eat:[
       
      ],
      other:[
        
      ],
    },
    {
      time:"11:00",
      stay:[
        
      ],
      do:[
       
      ],
      eat:[
       
      ],
      other:[
         
      ],
    },
    {
      time:"12:00",
      stay:[
        
      ],
      do:[
        
      ],
      eat:[
      
      ],
      other:[
         
      ],
    },
    {
      time:"13:00",
      stay:[
        
      ],
      do:[
      
      ],
      eat:[
        
      ],
      other:[
        
      ],
    },
    {
      time:"14:00",
      stay:[
        
      ],
      do:[
      
      ],
      eat:[
        
      ],
      other:[
        
      ],
    },
   
    {
      time:"15:00",
      stay:[
        
      ],
      do:[
      
      ],
      eat:[
        
      ],
      other:[
        
      ],
    },
    {
      time:"16:00",
      stay:[
        
      ],
      do:[
      
      ],
      eat:[
        
      ],
      other:[
        
      ],
    },
    {
      time:"17:00",
      stay:[
        
      ],
      do:[
      
      ],
      eat:[
        
      ],
      other:[
        
      ],
    },
    {
      time:"18:00",
      stay:[
        
      ],
      do:[
      
      ],
      eat:[
        
      ],
      other:[
        
      ],
    },
    {
      time:"19:00",
      stay:[
        
      ],
      do:[
      
      ],
      eat:[
        
      ],
      other:[
        
      ],
    },
    {
      time:"20:00",
      stay:[
        
      ],
      do:[
      
      ],
      eat:[
        
      ],
      other:[
        
      ],
    },
    {
      time:"21:00",
      stay:[
        
      ],
      do:[
      
      ],
      eat:[
        
      ],
      other:[
        
      ],
    },
    {
      time:"22:00",
      stay:[
        
      ],
      do:[
      
      ],
      eat:[
        
      ],
      other:[
        
      ],
    },
    {
      time:"23:00",
      stay:[
        
      ],
      do:[
      
      ],
      eat:[
        
      ],
      other:[
        
      ],
    },
  ]
  
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './public');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now()+".png");
    }
});
 
const upload = multer({ storage: storage });
router.post("/userSchedule", upload.single('image'),UserSchedule);
router.get("/getallData",getCards)
router.post("/removeCard",DeleteSchedule)
router.post("/UpdateData" ,upload.single('image'),EditCards)
router.post("/DragAndDrop" ,updateTableDragging)
router.post("/sortingData",handleSortingTime) 
  


module.exports = router;
