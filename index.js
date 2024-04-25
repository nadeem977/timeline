const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const routerSchedule = require("./routes/CheduleRoute");
const compression = require('compression');
const routerAuth = require("./routes/Authantication");


const app = express();
 


app.use(express.json());
app.use(cors());
app.use(express.static('public'));
dotenv.config();
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true ,parameterLimit:50000}));
 



const conectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("mongodb connected sucsessfuly");
    } catch (error) {
        console.log(error);
    }
};

app.use('/api', routerSchedule);
app.use('/api', routerAuth);

app.listen(8000, () => {
    console.log("server running on port 8000");
    conectToDatabase();
});
