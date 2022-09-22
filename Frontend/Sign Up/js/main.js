(function($) {

	"use strict";

	$(".toggle-password").click(function() {

	  $(this).toggleClass("fa-eye fa-eye-slash");
	  var input = $($(this).attr("toggle"));
	  if (input.attr("type") == "password") {
	    input.attr("type", "text");
	  } else {
	    input.attr("type", "password");
	  }
	});


})(jQuery);


document.getElementById("SignIn").onclick = function () {

	window.open("../Sign In/index.html",'_self');

};



const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const password1 = document.getElementById("password");
const password2 = document.getElementById("password-confirm");
const signUpButton = document.getElementById("signUp");




//store data in user database
signUpButton.addEventListener('click',function(e)
{   
   e.preventDefault();
	userSignUp();
	
})

const userSignUp = async() =>
{

	if(!(userName.value&&userEmail.value&&password1.value&&password2.value))
	{
       alert("All Credentials Required")
	}
	else if(password1.value!=password2.value)
	{
      alert("Both the password should be same")
	}
    else
	{
     fetch("http://localhost:1800/userSignUp", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
  
		user_name : userName.value,
		user_email : userEmail.value,
		user_password : password1.value
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
     
      console.log(json);
        
    }).catch(err => console.log(err))
}
}




const userSignIn = async() =>
{
  
	
}