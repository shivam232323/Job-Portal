const userName = localStorage.getItem("Name");
const role = localStorage.getItem("Role")
const signOut = document.getElementById("logout");


signOut.addEventListener('click',function()
{
  localStorage.clear();
  window.open("../Sign In/index.html",'_self');

})









document.getElementById("About").innerHTML = userName;




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
    const test1 = document.getElementById('Home');
  const newDiv = document.createElement('div');
  newDiv.id = "test";
  newDiv.innerHTML = `
  <h2 id ='companyname'>company Name: ${company_name}</h2>
      <h3 id = "designation">title: ${designation} <h3>Job Location:Mumbai</h3></h3>
      
      <h6 id = "description">Job Description : ${job_description}</a>
     <h6 id = "hremail">hr email: ${hr_email}</h3>
      <h6 id = "posted">Posted On: ${date}</h3>
      <button class = "btn btn-outline-info applicant" id = "${job_id}"  onclick="clicked(this.id)">Apply For Job</button>
    
  `

  test1.appendChild(newDiv);

}

}

displayJobs();












function openPage(pageName,elmnt,color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();




