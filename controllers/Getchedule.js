const Schedule = require("../models/Schedule");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const tabelAPI = [
  {
    time: "00:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "01:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "02:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "03:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "04:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "05:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "06:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "07:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "08:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "09:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "10:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "11:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "12:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "13:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "14:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },

  {
    time: "15:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "16:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "17:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "18:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "19:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "20:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "21:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "22:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
  {
    time: "23:00",
    stay: [],
    do: [],
    eat: [],
    other: [],
  },
];

const CreatePlans = async (req, res) => {
  try {
    const plan = await Schedule({
      title: req.body.title,
      plan: tabelAPI,
    });
    await plan.save();
    res.status(200).send("plan has ben created");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const RemovingPlan = async (req, res) => {
  try {
    const respo = await Schedule.findByIdAndDelete({ _id: req.body.Id });
    if (!respo) {
      res.status(404).send("plan not found");
    }
    res.status(200).send("Plan has ben Deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
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

    let isUpdated = false;
    let retries = 3;

    while (retries > 0) {
      try {
        const matching = await Schedule.findById(req.body.Id);

        if (!matching) {
          return res.status(404).send("No matching schedule found");
        } else {
          for (const obj of matching?.plan) {
            if (obj.time === req.body.start) {
              if (req.body.category === "Stay") {
                obj?.stay.push(data);
              } else if (req.body.category === "Do") {
                obj?.do.push(data);
              } else if (req.body.category === "Eat") {
                obj?.eat.push(data);
              } else {
                obj?.other.push(data);
              }
              isUpdated = true;
              break;
            }
          }
        }

        if (isUpdated) {
          await matching.save();
          console.log("Card created");
          return res.status(200).send("Card created");
        } else {
          return res.status(404).send("No matching time found in the schedule");
        }
      } catch (error) {
        if (error instanceof mongoose.Error.VersionError) {
          console.warn("Version conflict, retrying...", retries);
          retries -= 1;
          continue;
        } else {
          throw error;
        }
      }
    }

    res.status(500).send("Failed to update document due to version conflicts");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Error inserting data");
  }
};
const DeleteSchedule = async (req, res) => {
  try {
    const obj = await Schedule.findById(req.body.projectId);
    if (!obj) {
      return res.status(404).send("Card not found");
    }

    let updatedData;
    for (const finddata of obj.plan) {
      if (finddata.time === req.body.time) {
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

        if (updatedData && updatedData.img) {
          const imagePath = path.join(
            __dirname,
            "..",
            "public",
            updatedData.img
          );
          if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
              if (err) {
                console.error("Error deleting image:", err);
                return res.status(500).send("Error deleting image");
              } else {
                console.log("Image deleted successfully");
                obj
                  .save()
                  .then(() => res.status(200).send(true))
                  .catch((error) => {
                    console.error("Error saving document:", error);
                    res.status(500).send("Error saving document");
                  });
              }
            });
          } else {
            console.log("Image file does not exist");
            return res.status(404).send("Image file does not exist");
          }
        } else {
          await obj.save();
          return res.status(200).send(true);
        }
        break;
      }
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
      img: imageName,
    };
    let isUpdated = false;
    const oldCategory = req.body.oldCategory.toLowerCase();
    const obj = await Schedule.findById(req.body.projectId);
    if (obj) {
      for (const finddata of obj.plan) {
        if (finddata[oldCategory].length > 0) {
          const indexToDelete = finddata[oldCategory].findIndex(
            (item) => item._id.toString() === oldId
          );
          if (indexToDelete !== -1) {
            finddata[oldCategory].splice(indexToDelete, 1);
            await obj.save();
            console.log("Item deleted successfully");
          }
          if (req.file && oldImg) {
            const oldImagePath = path.join(__dirname, "..", "public", oldImg);
            console.log("image deleted", oldImagePath);
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
            }
          }
          break;
        }
      }
    }

    const matching = await Schedule.findById(req.body.projectId);
    if (!matching) {
      return res.status(404).send("No matching schedule found");
    } else {
      for (const obj of matching?.plan) {
        if (obj.time === req.body.start) {
          if (req.body.category === "Stay") {
            obj?.stay.push(UpdatedData);
          } else if (req.body.category === "Do") {
            obj?.do.push(UpdatedData);
          } else if (req.body.category === "Eat") {
            obj?.eat.push(UpdatedData);
          } else {
            obj?.other.push(UpdatedData);
          }
          isUpdated = true;
          break;
        }
      }
    }
    if (isUpdated) {
      await matching.save();
      console.log("Card created");
      res.status(200).send("Card created");
    } else {
      res.status(404).send("No matching time found in the schedule");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};
const updateTableDragging = async (req, res) => {
  try {
    const obj = await Schedule.findById(req.body.projectId);
    if (!obj) {
      return res.status(404).send("Data not found");
    } else {
      for (const newData of obj?.plan) {
        if (newData.time === req.body.data.start) {
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
          await obj.save();
          break;
        }
      }
    }
    const newObj = await Schedule.findById(req.body.projectId);

    if (newObj) {
      for (const findOnes of newObj?.plan) {
        if (findOnes.time === req.body.olddata.start) {
          if (findOnes && findOnes[req.body.olddata.category.toLowerCase()]) {
            findOnes[req.body.olddata.category.toLowerCase()] = findOnes[
              req.body.olddata.category.toLowerCase()
            ].filter(
              (item) =>
                !item._id.equals(req.body.olddata._id || req.body.olddata.id)
            );
            await newObj.save();
          }
          res.status(200).send("dragged");
          break;
        }
      }
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send(error.message || "There was an internal server error");
  }
}; 



const handleSortingTime = async (req, res) => {

  
  const matchDay = parseInt(req.body.day);
  const matchMonth = req.body.month;
  const matchYear = new Date().getFullYear();
  const matchDate = new Date(`${matchMonth} ${matchDay} ${matchYear} UTC`).toISOString().slice(0, 10);
  

  try {
    const objects = await Schedule.findById(req.body.projectId);

    const parseDate = (dateStringArray) => {
      if (!Array.isArray(dateStringArray) || dateStringArray.length === 0) { 
        return null;
      }
      const dateString = dateStringArray[0];
      if (!dateString) {
        return null;
      }
      const [month, day] = dateString.split(" ");
      if (!month || !day) {
        return null;
      }
      const valDate = new Date(`${month} ${parseInt(day)} ${matchYear} UTC`);
      return valDate.toISOString().slice(0, 10);
    };
    const isInRange = (start, end) => {
      console.log( "start date",start,"selected date",matchDate)
      return start <= matchDate && end >= matchDate;
    };

    const filterItems = (items) => {
      return items
        .filter((item) => {
          const startDate = parseDate([item.startDate]);
          const lastDate = parseDate([item.lastDate]);
          return startDate <= matchDate && lastDate >= matchDate;
        })
        .map((item) => ({
          name: item.name,
          address: item.address,
          img: item.img,
          timeS: item.timeS,
          timeE: item.timeE,
          start: item.startDate > matchDate ? "00:00" : item.start,
          startDate: item.startDate,
          lastDate: item.lastDate,
          category: item.category,
          minutes: item.minutes,
          height: item.height,
          id: item.id,
        }));
    };

    const combinedItems = {
      stay: [],
      do: [],
      eat: [],
      other: [],
    };

    objects.plan.forEach((obj) => {
      if (obj.time !== "00:00") {
        combinedItems.stay = combinedItems.stay.concat(filterItems(obj.stay));
        combinedItems.do = combinedItems.do.concat(filterItems(obj.do));
        combinedItems.eat = combinedItems.eat.concat(filterItems(obj.eat));
        combinedItems.other = combinedItems.other.concat(
          filterItems(obj.other)
        );
      }
    });

    const formattedObjects = objects.plan.map((obj) => {
      const dostartDate = parseDate(obj.do.map((item) => item.startDate));
      const dolastDate = parseDate(obj.do.map((item) => item.lastDate));
      const staystartDate = parseDate(obj.stay.map((item) => item.startDate));
      const staylastDate = parseDate(obj.stay.map((item) => item.lastDate));
      const eatstartDate = parseDate(obj.eat.map((item) => item.startDate));
      const eatlastDate = parseDate(obj.eat.map((item) => item.lastDate));
      const othestartDate = parseDate(obj.other.map((item) => item.startDate));
      const otherlastDate = parseDate(obj.other.map((item) => item.lastDate));

      const updateItems = (items, category) => {
        return items.map((item) => {
          const startDate = parseDate([item.startDate]);
          console.log("working ?",startDate,item.startDate)
          if (startDate === matchDate) {
            return item;  
          } else {
            return {
              ...item,
              start: "00:00", 
            };
          }
        });
      };
      

      if (obj.time === "00:00") {
        return {
          id: obj.id,
          time: obj.time,
          stay: combinedItems.stay.concat(
            isInRange(staystartDate, staylastDate)
              ? updateItems(filterItems(obj.stay), "stay")
              : []
          ),
          do: combinedItems.do.concat(
            isInRange(dostartDate, dolastDate)
              ? updateItems(filterItems(obj.do), "do")
              : []
          ),
          eat: combinedItems.eat.concat(
            isInRange(eatstartDate, eatlastDate)
              ? updateItems(filterItems(obj.eat), "eat")
              : []
          ),
          other: combinedItems.other.concat(
            isInRange(othestartDate, otherlastDate)
              ? updateItems(filterItems(obj.other), "other")
              : []
          ),
          __v: obj.__v,
          createdAt: obj.createdAt,
          updatedAt: obj.updatedAt,
        };
      } else {
        return {
          id: obj.id,
          time: obj.time,
          stay: [],
          do: [],
          eat: [],
          other: [],
          __v: obj.__v,
          createdAt: obj.createdAt,
          updatedAt: obj.updatedAt,
        };
      }
    });

    res.status(200).send(formattedObjects);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  UserSchedule,
  getCards,
  DeleteSchedule,
  EditCards,
  updateTableDragging, 
  handleSortingTime,
  CreatePlans, 
  RemovingPlan,
};
