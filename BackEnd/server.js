const express = require('express');
const pool = require('./database');
const router = require('./Routes/route');
const PORT = '1800';
const cors  = require('cors');

const app = new express();

app.use(express.json());

let corsOptions = {
    origin: '*' // Compliant
   };
   
   app.use(cors(corsOptions));
  
   
/*app.get('/',(req,res)=>
{

    const queryResult = pool.query(sql,(err,result) =>
   {
    if(err) throw err;
    res.send("Database Created Successfully");
   })
})*/

app.use(router);


app.listen(PORT,()=>
{
    console.log(`Listening at port ${PORT} successfully`);
})

