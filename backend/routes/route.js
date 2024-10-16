const express=require('express');
const {video}=require('../controller/sass.controller')
const router=express.Router();


router.get('/video',video)



module.exports=router