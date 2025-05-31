const express = require('express');
router = express.Router();


router.get("/home",(req,res)=>{
    res.send("Welcome to the Home Page");
})


module.exports = {
    router,
}