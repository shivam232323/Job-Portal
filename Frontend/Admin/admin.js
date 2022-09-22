$("#post").click(function() {  
    $("#box form").toggle("slow");
    return false;
  });

const companyName = document.getElementById("company-name");
const jobRole = document.getElementById("designation");
const  jobDescription = document.getElementById("description");
const jobLocation = document.getElementById("job-locations");
const hrEmail = document.getElementById("hr");
const postButton = document.getElementById("post-job");



postButton.addEventListener("click",function (e)
{
  e.preventDefault();
  addJob();
})



const addJob = () =>
{
  fetch("http://localhost:1800/postJob", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
      companyName : companyName.value,
      designation: jobRole.value,
      jobDescription: jobDescription.value,
      jobLocation: jobLocation.value,
      hrEmail : hrEmail.value,
      jobActive : 1
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
function clicked(value)
{
  alert(value);
}





//get posted jobs

const getJobs = async() =>
{
  const url = await fetch('http://localhost:1800/getJobs');
  const jsonData = await url.json();
  return jsonData;
}


function displayJobs()
{
getJobs().then((jsonData) =>
{
    addJobs(jsonData);
}).catch(err => console.log(err))
}









function addJobs(jobs)
{

for(const value of jobs)
{
    const{job_id,company_name,designation,job_description,job_location,hr_email,job_createdAt} = value;
    let date = job_createdAt.slice(0,10);
    const test1 = document.getElementById('main1');
  const newDiv = document.createElement('div');
  newDiv.id = "test";
  newDiv.innerHTML = `
  <h2 id ='companyname'>company Name: ${company_name}</h2>
      <h3 id = "designation">title: ${designation} <h3>Job Location:Mumbai</h3></h3>
      
      <h6 id = "description">Job Description : ${job_description}</a>
     <h6 id = "hremail">hr email: ${hr_email}</h3>
      <h6 id = "posted">Posted On: ${date}</h3>
      <button class = "btn btn-outline-info applicant" id = "${job_id}"  onclick="clicked(this.id)">View Applicants</button>
    
  `

  test1.appendChild(newDiv);

}

}

displayJobs();