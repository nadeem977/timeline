const express = require('express');
const {UserSchedule,getCards,DeleteSchedule, EditCards ,updateTableDragging,
    handleSortingTime,
    CreatePlans ,RemovingPlan } = require("../controllers/Getchedule");  
const multer = require('multer');
const path = require("path"); 
const Schedule = require('../models/Schedule');
const router = express.Router()
    

router.post("/PlanCreatings",CreatePlans)
router.post("/RemovingPlan",RemovingPlan)
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
