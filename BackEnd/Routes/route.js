const express = require('express');
const router = express.Router(); 
const pool = require('../database');
const admin = require('../Controller/admin');
const user = require('../Controller/user');
const app = new express();

app.use(express.json());

//admin routes
router.post('/postJob',admin.addJobs);
router.post('/adminPage',admin.adminValidate);
router.get('/getJobs',admin.sendJob);


//user routes
router.post('/userSignUp',user.userSignUp);
router.post('/userPage',user.userValidate);



module.exports = router;
