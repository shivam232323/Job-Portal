const express = require('express');
const router = express.Router(); 
const pool = require('../database');
const bcrypt = require('bcryptjs');
const app = new express();
const saltRounds =  4 ;
app.use(express.json());


exports.userSignUp = async(req,res) =>
{
    const {user_name,user_email,user_password} = req.body;
   
   console.log(user_name,user_email,user_password);

   const password = await bcrypt.hash(user_password,saltRounds,(err,hashedPassword) =>
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
        res.json("User Registered Successfully");
    })
  
     }
   
   
   
    }

    exports.userValidate = async(req,res) =>
    {
        const {user_name,user_email,user_password} = req.body;
       
        const sql  =  `select user_password from user where user_email = "${user_email}" and user_name = "${user_name}"`;
        
      const value =   pool.query(sql,(err,result) =>
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
                    bcrypt.compare(user_password,password1,(err,isMatch) =>
    {
        if (err) throw err;
        else
        {
        if(isMatch)
        {
          const query = `select user_name ,role from user where user_email = "${user_email}" and user_name = "${user_name}"`;
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
    }
      });
                    
                }
            }


            
        })
       

    }
   
   
   
    /*const password = await bcrypt.hash(user_password,saltRounds,(err,hashedPassword) =>
    {
        if(err) throw err;
         password(hashedPassword);

    }
    
    )
    function password(value)
    {
    bcrypt.compare(user_password,value,(err,isMatch) =>
    {
        if (err) throw err;
        console.log("Matched",isMatch);
    })
    }*/
    



/*const add = (req,res) =>
{
    const sql  = `create table user(user_id int primary key auto_increment,user_name varchar(200),user_email varchar(250),user_password varchar(250))`;
    const insert = pool.query(sql,(err,result) =>
    {
        if(err) throw err;

        console.log("Success");
    })
}*/


