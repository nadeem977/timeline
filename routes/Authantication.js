const { addNewUser, loginAuth} = require("../controllers/UserAuth")
const express = require('express');

const router = express.Router()

router.post("/registration",addNewUser)
router.post("/login",loginAuth)


module.exports = router;