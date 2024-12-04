const express=require('express');
const {video,upload_image,video_upload}=require('../controller/sass.controller')
const router=express.Router();
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/video',video);
router.post('/upload_image',upload.single('file'),upload_image);
router.post('/video_upload',video_upload);




module.exports=router