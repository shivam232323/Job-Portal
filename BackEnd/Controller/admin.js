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





const adminValidate = async(req,res) =>
{
    const {name,email,password} = req.body;
    if(!(name&&email&&password))
    {
        res.json("ALL INPUT REQUIRED");
    }
    else
    {
        sql = `Select admin_name from admin where admin_email = "${email}" and admin_password = "${password}"`;
        const validate = await pool.query(sql,(err,result)=>
        {
            if(err) throw err;
            else
            {
            if(result.length)
            {
            res.json(
                {
                    message:"SUCCESS!",
                    response:result
                }
            );
            }
            else
            {
               res.json("WRONG CREDENTIALS")
            }
        }
        })
    }
}


module.exports = {
 adminValidate,
 addJobs,
 sendJob
};