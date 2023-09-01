
let teacherId=localStorage.getItem("teacherid")
let main=document.getElementById("main")

let logo=document.querySelector(".title")
logo.addEventListener("click",()=>{
  window.location.href="./admin.html"
})
let baseurl = "http://localhost:8600/user/";
let product=document.getElementById("product")
let userid=JSON.parse(localStorage.getItem("user"))||null

const urlParams = new URLSearchParams(window.location.search);
const userDataParam = urlParams.get("userdata");
 
  if(!userid){
  if (userDataParam) {
    try {
      const userData = JSON.parse(decodeURIComponent(userDataParam));
      const userName = userData.name
      role=userData.role
      userdisplay(userName,role)
      let userID=userData._id
      localStorage.setItem("user",JSON.stringify(userData))
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
}
else{
  userdisplay(userid.name,userid.role)
   
}



//user display...................................
 
function userdisplay(username,role){
  let userdisplay=document.querySelector(".userdisplay")
  let hamberger=document.querySelector(".hamberger")
  let accountdropdown=document.querySelector(".accountdropdown")
  let count1=0
  if(username){
    document.querySelector(".loginbutton").classList.add("loginbuttonIflogin")
    document.querySelector(".tutorlogin").classList.add("tutorloginIflogin")
    userdisplay.classList.add("userdisplayIflogin")
    hamberger.classList.add("hambergerIflogin")
    let firstletter=username[0].toUpperCase()
    userdisplay.innerHTML=`<h1 class="firstletter">${firstletter}</h1>`
    document.querySelector(".account").classList.add("accountIflogin")
    hamberger.addEventListener("click",()=>{
      count1++
      console.log(count1%2)
      if(count1%2!=0){
      if(role.includes("tutor")){
      accountdropdown.innerHTML=`
      <div><a href="./pages/showappointment.html" style="text-decoration: none;">student dashboard</a> </div>
      <div><a href="./pages/showappointment.html" style="text-decoration: none;">tutor dashboard</a> </div>
      <div> <a href="./pages/teachers.html" style="text-decoration: none;">Find tutor</a> </div>
      <div>My profile</div>
      <div class="logout">Log Out</div>
      `
      }
      else{
        accountdropdown.innerHTML=`
      <div><a href="./pages/showappointment.html" style="text-decoration: none;">My dashboard</a> </div>
      <div> <a href="./pages/teachers.html" style="text-decoration: none;">Find tutor</a> </div>
      <div> <a href=./pages/giveprivateclass.html?${urlParams} style="text-decoration: none;">be a tutor</a> </div>
      <div>My profile</div>
      <div class="logout">Log Out</div>
      `
      }
  
      let logout=document.querySelector(".logout")
      logout.addEventListener("click",()=>{
        localStorage.removeItem("userid")
        window.location.href="../index.html"
      })
  
      }
      else{
       accountdropdown.innerHTML=null
      }
    })
  }
  else{
    document.querySelector(".loginbutton").classList.remove("loginbuttonIflogin")
    document.querySelector(".tutorlogin").classList.remove("tutorloginIflogin")
    userdisplay.classList.remove("userdisplayIflogin")
    hamberger.classList.remove("hambergerIflogin")
    document.querySelector(".account").classList.remove("accountIflogin")
  }
  }
  // ...............................................

 

fetch(`http://localhost:8600/user/appointedtutor?id=${teacherId}`)
.then((res)=>res.json())
.then((data)=>{
    render(data.msg)
    console.log(data)
})


function render(element){

    let card=` <div id="card">
    <div id="imgdiv">
        <img src="" alt="image">
    </div>
    <div id="detailsdiv">
       <p id="name">Name:${element[0].name}</p>
       <p id="email">Email:${element[0].email}</p>
       <p id="subject">Subject:${element[0].subject}</p>
       <p id="qualifications">qualifications:${element[0].qualifications}</p>
       <p id="about">about:${element[0].about}</p>
       <button id="delete">DELETE</button>
    </div>
</div>`
main.innerHTML=card

let dele=document.getElementById("delete")
dele.addEventListener("click",()=>{
    fetch(`http://localhost:8600/user/${teacherId}`,{
       method:"PATCH",
       headers:{
        "Content-Type":"application/json"
       },
       body:JSON.stringify({role:["student"],appointed:false}) 
    })
    .then((res)=>res.json())
    .then((data)=>{
        alert("deleted susscessfully")
        window.location.href="./admin.html"
    })
})
 
}