const signIn = document.getElementById('signIn');
const signUp = document.getElementById('signUp');
const username = document.getElementById('userName');
const email = document.getElementById('email');
const password = document.getElementById('password-field');

//Migrate to signup page
signUp.addEventListener('click',function () {

	window.open("../Sign Up/index.html",'_self');
})



signIn.addEventListener('click',function(e)
{ 
    e.preventDefault();
    console.log(typeof(username));
    console.log(username);
    if(username.value.includes('admin'))
    {
        adminValidate();
    }

    else
    {
        //userValidate
        fetch("http://localhost:1800/userValidate", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
        name: username.value,
        email : email.value,
        password : password.value
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json"
    }
})
.then(response => response.json())
 
// Displaying results to console
.then(json => 
    {
     
        if(json)
        {
            window.open("../User/user.html",'_self');
 
        }
        
    }).catch(err => console.log(err))



    }
    
     
});


const adminValidate = async() =>
{
    
    fetch("http://localhost:1800/adminPage", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
        name: username.value,
        email : email.value,
        password : password.value
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json"
    }
})
.then(response => response.json())
 
// Displaying results to console
.then(json => 
    {

        if(json.message == 'SUCCESS!')
        {
            

            const response = json.response[0].admin_name;
            if(response.includes('admin'))
            {
                window.open("../Admin/admin.html",'_self');
     
            } 
        }
        else{
        
            console.log(json);

    }
        
    }).catch(err => console.log(err))

}



 
