const express = require('express');
const app = express();
const nodemailer = require('nodemailer')
app.use(express.json());

function sendEmail(hrEmail,adminEmail,message)
{
    let transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth : {
                user : 'shivamsingh4949@gmail.com',
                pass : 'aglciasqgeqfttqf'
                
            }
        }
        );
        

    let deatils = {
       
        from:'shivamsingh4949@gmail.com',
            to: 'arzan.momin@neebal.com',
            subject:'Testing nodemailer',
            text:'Mail receive hua toh reply kar',
       
    }

    let info = transporter.sendMail(deatils,(err) =>
    {
      if(err) throw err;
      console.log("succesfully sent");
    }
    )
    
} 

  





/*app.listen('2000',()=>
{
    console.log("Listening at port 2000 Succesfully!");
})*/