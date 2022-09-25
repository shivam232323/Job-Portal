const express = require('express');
const router = express.Router(); 
const pool = require('../database');
const admin = require('../Controller/admin');
const user = require('../Controller/user');
const app = new express();

app.use(express.json());


router.post('/landPage',user.userValidate);


//admin routes
router.post('/postJob',admin.addJobs);
router.get('/getJobs',admin.sendJob);


//user routes
router.post('/userSignUp',user.userSignUp);
router.post('/sendUserDetails',user.userDetails);
router.post('/applyJob',user.applyForJob)



module.exports = router;
