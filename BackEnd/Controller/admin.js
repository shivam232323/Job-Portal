const express = require('express');
const router = express.Router(); 
const pool = require('../database');
const app = new express();

app.use(express.json());





const addJobs = async(req,res)=>
{
    const{companyName,designation,jobDescription,jobLocation,hrEmail,jobActive} = req.body;
    console.log(companyName,designation,jobDescription,jobLocation,hrEmail,jobActive)
    let jobDeatils = `insert into job (company_name,designation
        ,job_description,
        job_location,
        hr_email,
        job_active,
        job_createdAt)
        values(
            '${companyName}',
            '${designation}',
            '${jobDescription}',
            '${jobLocation}',
            '${hrEmail}',
            '${jobActive}',
            now())`;

   const details = await pool.query(jobDeatils,(err,result)=>
    {
        if(err) throw err;
        res.json(result);
    })


}

//send jobs to frontend


const sendJob = async(req,res) =>
{
    sql = `select * from job`;
   const output = await pool.query(sql,(err,result)=>
   {
      if(err) throw err;
      
      res.json(result);


   })
}







module.exports = {
 addJobs,
 sendJob
};