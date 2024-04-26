const Schedule = require("../models/Schedule");
const fs = require("fs");
const path = require("path");

const UserSchedule = async (req, res) => {
  try {
    const matching = await Schedule.findOne({ time: req.body.start });
    if (!matching) {
      return res.status(404).send("No matching schedule found");
    }
    let newData;
    const imageName = req.file ? req.file.filename : "";
    if (req.body.category === "Stay") {
      matching.stay.push({ ...req.body, img: imageName });
      newData = await matching.save();
    } else if (req.body.category === "Do") {
      matching.do.push({ ...req.body, img: imageName });
      newData = await matching.save();
    } else if (req.body.category === "Eat") {
      matching.eat.push({ ...req.body, img: imageName });
      newData = await matching.save();
    } else {
      matching.other.push({ ...req.body, img: imageName });
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
      switch (req.body.category) {
        case "Stay":
          updatedData = finddata.stay.find(
            (item) => item._id.toString() === req.body.id
          );
          finddata.stay = finddata.stay.filter(
            (item) => item._id.toString() !== req.body.id
          );
          break;
        case "Do":
          updatedData = finddata.do.find(
            (item) => item._id.toString() === req.body.id
          );
          finddata.do = finddata.do.filter(
            (item) => item._id.toString() !== req.body.id
          );
          break;
        case "Eat":
          updatedData = finddata.eat.find(
            (item) => item._id.toString() === req.body.id
          );
          finddata.eat = finddata.eat.filter(
            (item) => item._id.toString() !== req.body.id
          );
          break;
        case "Other":
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
  console.log(req.file);
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
      console.log("old image", oldImg);
      if (req.file && oldImg) {
        const oldImagePath = path.join(__dirname, "..", "public", oldImg);
        console.log("image deleted", oldImagePath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      const UpdatedData = {
        name: req.body.name,
        address: req.body.address,
        timeS: req.body.timeS,
        timeE: req.body.timeE,
        date: req.body.date,
        start: req.body.start,
        minutes: req.body.minutes,
        category: req.body.category,
      };
      const matching = await Schedule.findOne({ time: req.body.start });
      if (!matching) {
        return res.status(404).send("No matching schedule found");
      }
      let newData;
      const imageName = req.file ? req.file.filename : oldImg;
      if (req.body.category === "Stay") {
        matching.stay.push({ ...UpdatedData, img: imageName });
        newData = await matching.save();
      } else if (req.body.category === "Do") {
        matching.do.push({ ...UpdatedData, img: imageName });
        newData = await matching.save();
      } else if (req.body.category === "Eat") {
        matching.eat.push({ ...UpdatedData, img: imageName });
        newData = await matching.save();
      } else {
        matching.other.push({ ...UpdatedData, img: imageName });
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
const updateTableDraginng = async (req, res) => {
  try {
    const newData = await Schedule.updateOne(
      { time: req.body.data.time },
      { $set: req.body.data }
    ); 
    if (newData.acknowledged) {
      const findOnes = await Schedule.findOne({time: req.body.olddata.start.trim(),});
      if (findOnes && findOnes[req.body.olddata.category.toLowerCase()]) {
         findOnes[req.body.olddata.category.toLowerCase()] =
         findOnes[req.body.olddata.category.toLowerCase()].filter(item => item._id.toString() !== req.body.olddata._id);
         await findOnes.save();
      }
      res.status(200).send(newData);
    } else {
      res.status(404).send("Data not found");
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("There was an internal server error");
  }
};

module.exports = {
  UserSchedule,
  getCards,
  DeleteSchedule,
  EditCards,
  updateTableDraginng,
};
