const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, function (err, bytes){
            if (err) return cb(err);
            const fn = bytes.toString('hex') + path.extname(file.originalname);
            cb(null, fn);
        })
    }
})

const upload = multer({ storage: storage })



// Only render the form, do not use upload middleware here
router.get('/ejsuploads', (req, res) => {
    res.render('ejsuploads');
});

router.post('/uploads', upload.single("images")  , (req,res)=>{
    console.log(req.file);
    res.send('File uploaded successfully');
})

module.exports= router;