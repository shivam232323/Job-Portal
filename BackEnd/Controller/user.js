const express = require('express');
const router = express.Router(); 
const pool = require('../database');
const bcrypt = require('bcryptjs');
const { json } = require('express');
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
         
       const validationQuery = `select user_id from user_details where user_id = ${user_id}`;
       
       await pool.query(validationQuery,(err,response) =>
       {
        if(err) throw err;
        else{
            console.log(response[0]);
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
                 res.json(result)
                })
             
            }
            else
            {
                res.json("Details are already Present!");
            }
        }
       })



       }



       exports.applyForJob = async(req,res) =>
       {
        const {jobId,userId} = req.body;
        
       const sql = `select user_id from applied_jobs where job_id  = ${jobId}`;
        await pool.query(sql,(err,result)=>
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
                        //Continue From here
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
   
   


