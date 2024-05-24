const Schedule = require("../models/Schedule");
const fs = require("fs");
const path = require("path");
const schedules = require('node-schedule');


const UserSchedule = async (req, res) => {
  try {
    const imageName = req.file ? req.file.filename : "";

    const data = {
      name: req.body.name,
      address: req.body.address,
      timeS: req.body.timeS,
      timeE: req.body.timeE,
      startDate: req.body.date,
      lastDate: req.body.lastDate,
      start: req.body.start,
      minutes: req.body.minutes,
      category: req.body.category,
      img: imageName,
    };
    console.log("data objects ", data);
    const matching = await Schedule.findOne({ time: req.body.start });
    if (!matching) {
      return res.status(404).send("No matching schedule found");
    }
    let newData;

    if (req.body.category === "Stay") {
      matching.stay.push(data);
      newData = await matching.save();
    } else if (req.body.category === "Do") {
      matching.do.push(data);
      newData = await matching.save();
    } else if (req.body.category === "Eat") {
      matching.eat.push(data);
      newData = await matching.save();
    } else {
      matching.other.push(data);
      newData = await matching.save();
    }
    res.status(200).send(newData);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Error inserting data");
  }
};
const DeleteSchedule = async (req, res) => {
  try {
    const finddata = await Schedule.findOne({ time: req.body.time });
    if (finddata) {
      let updatedData;
      switch (req.body.category.toLowerCase()) {
        case "stay":
          updatedData = finddata.stay.find(
            (item) => item._id.toString() === req.body.id
          );
          finddata.stay = finddata.stay.filter(
            (item) => item._id.toString() !== req.body.id
          );
          break;
        case "do":
          updatedData = finddata.do.find(
            (item) => item._id.toString() === req.body.id
          );
          finddata.do = finddata.do.filter(
            (item) => item._id.toString() !== req.body.id
          );
          break;
        case "eat":
          updatedData = finddata.eat.find(
            (item) => item._id.toString() === req.body.id
          );
          finddata.eat = finddata.eat.filter(
            (item) => item._id.toString() !== req.body.id
          );
          break;
        case "other":
          updatedData = finddata.other.find(
            (item) => item._id.toString() === req.body.id
          );
          finddata.other = finddata.other.filter(
            (item) => item._id.toString() !== req.body.id
          );
          break;
        default:
          return res.status(400).send("Invalid category");
      }
      const imagePath = path.join(__dirname, "..", "public", updatedData.img);
      if (updatedData.img) {
        if (fs.existsSync(imagePath)) {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error("Error deleting image:", err);
              res.status(500).send("Error deleting image");
            } else {
              console.log("Image deleted successfully");
              finddata.save();
              res.status(200).send(true);
            }
          });
        } else {
          console.log("Image file does not exist");
          res.status(404).send("Image file does not exist");
        }
      } else {
        finddata.save();
        res.status(200).send(true);
      }
    } else {
      res.status(404).send("Card not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
const getCards = async (req, res) => {
  try {
    const data = await Schedule.find({});
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const EditCards = async (req, res) => {
  try {
    const oldTime = req.body.oldTime;
    const oldImg = req.body.oldImg;
    const oldId = req.body.oldId;

    const oldCategory = req.body.oldCategory.toLowerCase();
    const finddata = await Schedule.findOne({ time: oldTime });
    if (finddata && finddata[oldCategory]) {
      const indexToDelete = finddata[oldCategory].findIndex(
        (item) => item._id.toString() === oldId
      );
      if (indexToDelete !== -1) {
        finddata[oldCategory].splice(indexToDelete, 1);
        await finddata.save();
        console.log("Item deleted successfully");
      }

      if (req.file && oldImg) {
        const oldImagePath = path.join(__dirname, "..", "public", oldImg);
        console.log("image deleted", oldImagePath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      const imageName = req.file ? req.file.filename : oldImg;
      const UpdatedData = {
        name: req.body.name,
        address: req.body.address,
        timeS: req.body.timeS,
        timeE: req.body.timeE,
        startDate: req.body.date,
        lastDate: req.body.lastDate,
        start: req.body.start,
        minutes: req.body.minutes,
        category: req.body.category,
        height:req.body.height,
        lastUpdated:req.body.lastUpdated,
        expired:req.body.expired,
        img: imageName,
      };
      const matching = await Schedule.findOne({ time: req.body.start });
      if (!matching) {
        return res.status(404).send("No matching schedule found");
      }
      let newData;

      if (req.body.category === "Stay") {
        matching.stay.push(UpdatedData);
        newData = await matching.save();
      } else if (req.body.category === "Do") {
        matching.do.push(UpdatedData);
        newData = await matching.save();
      } else if (req.body.category === "Eat") {
        matching.eat.push(UpdatedData);
        newData = await matching.save();
      } else {
        matching.other.push(UpdatedData);
        newData = await matching.save();
      }
      res.status(200).send(newData);
    } else {
      res.status(404).send("Category not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};
const updateTableDragging = async (req, res) => {
  try {
    console.log(req.body);
    const newData = await Schedule.findOne({ time: req.body.data.start });
    if (!newData) {
      return res.status(404).send("Data not found");
    }
    switch (req.body.data.category) {
      case "stay":
        newData.stay.push(req.body.data);
        break;
      case "do":
        newData.do.push(req.body.data);
        break;
      case "eat":
        newData.eat.push(req.body.data);
        break;
      case "other":
        newData.other.push(req.body.data);
        break;
      default:
        return res.status(400).send("Invalid category");
    }

    await newData.save();
    const findOnes = await Schedule.findOne({
      time: req.body.olddata.start.trim(),
    });
    if (findOnes && findOnes[req.body.olddata.category.toLowerCase()]) {
      findOnes[req.body.olddata.category.toLowerCase()] = findOnes[
        req.body.olddata.category.toLowerCase()
      ].filter(
        (item) => !item._id.equals(req.body.olddata._id || req.body.olddata.id)
      );
      await findOnes.save();
    }
    res.status(200).send(newData);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send(error.message || "There was an internal server error");
  }
};
const handleSortingTime = async (req, res) => {
  const matchMonth = req.body.month;
  const matchDay = parseInt(req.body.day);
  console.log(matchMonth,matchDay)
  const matchYear = new Date().getFullYear();
  const datinng = new Date(`${matchMonth} ${matchDay} ${matchYear} UTC`);
  const matchDate = datinng.toISOString().slice(0, 10);
  
  try {
    const objects = await Schedule.find({});

    const formattedObjects = objects.map((obj) => {
      const parseDate = (dateStringArray) => {
        if (!Array.isArray(dateStringArray) || dateStringArray.length === 0) {
          return null;
        }
        
        const dateString = dateStringArray[0];
        const [month, day] = dateString?.split(" ");
        if (!month || !day) {
          return null;
        }
        const valDate = new Date(`${month} ${parseInt(day)} ${matchYear} UTC`);
        return valDate.toISOString().slice(0, 10);
      };

      const dostartDate = parseDate(
        obj.do.map((item) => {
          return item.startDate;
        })
      );
      const dolastDate = parseDate(
        obj.do.map((item) => {
          return item.lastDate;
        })
      );
      const staystartDate = parseDate(
        obj.stay.map((item) => {
          return item.startDate;
        })
      );
      const staylastDate = parseDate(
        obj.stay.map((item) => {
          return item.lastDate;
        })
      );
      const eatstartDate = parseDate(
        obj.eat.map((item) => {
          return item.startDate;
        })
      );
      const eatlastDate = parseDate(
        obj.eat.map((item) => {
          return item.lastDate;
        })
      );
      const othestartDate = parseDate(
        obj.other.map((item) => {
          return item.startDate;
        })
      );
      const otherlastDate = parseDate(
        obj.other.map((item) => {
          return item.lastDate;
        })
      );

      const isInRange = (start, end) => {
        return start <= matchDate && end >= matchDate;
      };

      const filterItems = (items) => {
        return items
          .filter((item) => {
            const val = [item.startDate];
            const itemDate = parseDate(val);
            return itemDate <= matchDate;
          })
          .map((item) => ({
            name: item.name,
            address: item.address,
            img: item.img,
            timeS: item.timeS,
            timeE: item.timeE,
            start: item.start,
            startDate: item.startDate,
            lastDate: item.lastDate,
            category: item.category,
            minutes: item.minutes,
            height:item.height,
            id: item.id,
          }));
      };

      return {
        id: obj.id,
        time: obj.time,
        stay: isInRange(staystartDate, staylastDate)
          ? filterItems(obj.stay)
          : [],
        do: isInRange(dostartDate, dolastDate) ? filterItems(obj.do) : [],
        eat: isInRange(eatstartDate, eatlastDate) ? filterItems(obj.eat) : [],
        other: isInRange(othestartDate, otherlastDate)
          ? filterItems(obj.other)
          : [],
        __v: obj.__v,
        createdAt: obj.createdAt,
        updatedAt: obj.updatedAt,
      };
    });

    res.status(200).send(formattedObjects);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};


// const scheduledTask = schedules.scheduleJob('* * * * *', async () => {
//   try {
//     const data = await Schedule.find({});
//     const oneHourAgo = new Date(Date.now() - 1 * 1 * 1000);  // One hour ago
 
//     console.log("run every minute=", oneHourAgo);
  
//     for (let objData of data) {
//       let isModified = false;
 
//       const updateItems = (items) => {
//         return items.map((item) => {
//           console.log("Last updated:", item.lastUpdated);
//           if (new Date(item.lastUpdated) < oneHourAgo) {
//             console.log("Item was last updated more than 60 minutes ago.", new Date(item.lastUpdated));
//             if(item.height === 1035){
//               item.expired = true 
//               isModified = true;
//               console.log("expired")
//             }else{
//               item.height += 45;
//               item.lastUpdated = new Date();
//               isModified = true;
//             }
           
//           }
//           return item;
//         });
//       };

//       // Update all categories if they exist
//       if (objData.stay) objData.stay = updateItems(objData.stay);
//       if (objData.do) objData.do = updateItems(objData.do);
//       if (objData.eat) objData.eat = updateItems(objData.eat);
//       if (objData.other) objData.other = updateItems(objData.other);

//       // Save the updated document if any modifications were made
//       if (isModified) {
//         await objData.save();
//       }
//     }

//     console.log('Task executed every minute:', new Date().toLocaleTimeString());
//   } catch (error) {
//     console.error('Error executing scheduled task:', error);
//   }
// });

 
// console.log(scheduledTask)


module.exports = {
  UserSchedule,
  getCards,
  DeleteSchedule,
  EditCards,
  updateTableDragging,
  handleSortingTime,
 
};
