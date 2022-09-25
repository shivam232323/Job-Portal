const express = require('express');
const router = express.Router(); 
const pool = require('../database');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendEmail = require('./email');
const app = new express();
const saltRounds =  4 ;
app.use(express.json());


exports.userSignUp = async(req,res) =>
{
    const {user_name,user_email,user_password} = req.body;
   
   console.log(user_name,user_email,user_password);

   const sql  =  `select user_email  from user where user_email = "${user_email}"`;

   const value  = await pool.query(sql,(err,result) =>
   {
    if(err) throw err;

    else
    {
        
        if(!result[0])
        {
            const password =  bcrypt.hash(user_password,saltRounds,(err,hashedPassword) =>
            {
                if(err) throw err;
                 userRegister(hashedPassword);
        
            })
            
            function userRegister(hashedPassword)
            {
            const sql = `insert into user(user_name,user_email,user_password,role) values("${user_name}","${user_email}","${hashedPassword}","user")`
            pool.query(sql,(error,result) =>
            {
                if(error) throw error;
                else{
                     
                     pool.query(`insert into user_details(email,submited) values ("${user_email}",false)`,(err,response) =>
                    {
                        if(err) throw err;
                        res.json("User Registered Successfully");

                    })


                }
            })
          
             } 

        }
        else
        {
             res.json("User Already Exists");
        }
    }
   })

   
   
    }




    exports.userValidate = async(req,res) =>
    {
        const {name,email,password} = req.body;
       

        const sql  =  `select user_password from user where user_email = "${email}" and user_name = "${name}"`;
        
          await pool.query(sql,(err,result) =>
         {
           
           if(err) throw err;

            else
            {
               
                if(!result[0])
                {
                    res.json("Wrong Credentials")
                }
             
                else
                {
                    
                    let password1 = result[0].user_password;
                    
                    bcrypt.compare(password,password1,(err,isMatch) =>
                    {
                        

                      if(err) throw err;
                                
                                  if(isMatch)
                                  {
                                       const query = `select user_name ,role ,user_id,user_email from user where user_email = "${email}" and user_name = "${name}"`;
                                        pool.query(query,(err,result) =>
                                     {
                                   if(err) throw err;
                                            res.json(result);
        
                                     })
                                      }
                                         else
                                        {
                                             res.json("Wrong Password");
                                               }
                                               
                                               

    

      })

      
                }


            }

          
        })    
        

    }



    exports.userDetails = async(req,res) =>
    {
       const {user_id,firstName,lastName,email,collegeName,hsc,ssc,graduation,graduationYear,submited,skills} = req.body;
        if(!(firstName&&lastName&&collegeName&&ssc&&email&&hsc&&skills&&graduation&&graduationYear))
        {
            res.json("All Details Required")
        }
        else
        {
       const validationQuery = `select user_id from user_details where user_id = ${user_id}`;
       
       await pool.query(validationQuery,(err,response) =>
       {
        if(err) throw err;
        else{
            console.log("update user details",response[0]);
            if(!response[0])
            {
                   const sql1 = `update user_details 
                   set user_id = "${user_id}",
                   firstName = "${firstName}",
                   lastName = "${lastName}",
                   collegeName = "${collegeName}",
                   hsc = "${hsc}",
                   ssc = "${ssc}",
                   graduation = "${graduation}",
                   graduationYear = "${graduationYear}",
                   submited = true,
                   skills = "${skills}"
                   where email = "${email}" and submited = false`;
                const output = pool.query(sql1,(err,result) =>
                {
                 if(err) throw err;
                 res.json("Details Entered Successfully!")
                })
             
            }
            else
            {
                res.json("Details are already Present!");
            }
        }
       })

    }

       }



       exports.applyForJob = async(req,res) =>
       {
        const {jobId,userId} = req.body;
        
        const query = `select submited from user_details where user_id = ${userId} `;
        await pool.query(query,(err,value)=>
        {
            if (err) throw err;
            else
            {
                if(value[0])
                {
                    const sql = `select user_id from applied_jobs where job_id  = ${jobId}`;
                     pool.query(sql,(err,result)=>
                    {
                      
                        if(err) throw err;
                        
                        else
                        {
                            if(!result[0])
                            {
                               const insertData = `insert into applied_jobs(user_id,job_id) values(${userId},${jobId})`;
                               pool.query(insertData,(err,response) =>
                               {
                                if(err) throw err;
                                else
                                {
                                    const query = `select company_name ,designation,hr_email,posted_by,job_createdAt from job where job_id = ${jobId}`;
                                    pool.query(query,(err,response)=>
                                    {
 
                                        if(err) throw err;

                                        else
                                        {
                                            const{company_name ,designation,hr_email,posted_by,job_createdAt} = response[0];
                                            let date = String(job_createdAt).slice(0,10);

                                            const message1 = ` This mail is sent to you from Job-Portal in response to the job posted by you on ${date} for the position of ${designation} in ${company_name}.`   
                                          
                                          const query = `select firstName ,lastName,email,collegeName,hsc,ssc,graduation,
                                          graduationYear,skills from user_details where user_id = ${userId}`;  
                                          pool.query(query,(err,result)=>
                                          {
                                            const {firstName ,lastName,email,collegeName,hsc,ssc,graduation,graduationYear,skills} = result[0];
                                            
                                            const message = message1 + "\n"+` The Canditate who has applied for the job is ${firstName+lastName} and is ${graduationYear} passout from ${collegeName}and his email id is ${email}.
                                            The Canditate has passed HSC with ${ssc} SSC with ${ssc} and Degree with ${graduation}.
                                            The skills of canditate includes :${skills}.`
                                             sendEmail.email(hr_email,posted_by,message);
                                            res.json("Applied For Job successfully!");


                                          })                                          
                                        }
                                    })

                                }
                               })
                            }
            
                        else
                        {
                            res.json("You Have Already Applied For This Job Position");
                        }
            
                        }
                    })
                }
                else
                {
                    res.json("Please Complete Your Profile  first and then Apply")
                }

            }
        })
      
        
       }
   
   


