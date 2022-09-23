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
    validate();
});


const validate = async() =>
{
    if(!(username&&email&&password))
    {
        alert("ALL INPUT REQUIRED");
    }
    else
    {
    
    fetch("http://localhost:1800/landPage", {
     
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
        if(json === 'Wrong Password' || json === 'Wrong Credentials')
        {
             window.alert(json);
        }
        else
        {

            //continue from here
              
            const {user_name,role} = json[0];
             localStorage.setItem("Name",user_name);
             localStorage.setItem("Role",role);
            if(role === 'admin')
            {
                window.open("../Admin/admin.html",'_self');
            }
            else
            {
              
                window.open("../User/user.html",'_self');

            }

        }

        
    }).catch(err => console.log(err))

}
}



 
