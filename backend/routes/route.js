const express=require('express');
const {video,uplodad_image,video_upload}=require('../controller/sass.controller')
const router=express.Router();


router.get('/video',video);
router.post('/uplodad_image',uplodad_image);
router.post('/video_upload',video_upload);




module.exports=router