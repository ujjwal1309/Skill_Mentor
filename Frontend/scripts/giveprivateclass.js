let user=JSON.parse(localStorage.getItem("user"))
console.log(user)
let logo=document.querySelector(".title")
 logo.addEventListener("click",()=>{
  window.location.href="../index.html"
})
const urlParamsString = window.location.search;
const urlParams = new URLSearchParams(urlParamsString);
const userdataParam = urlParams.get('userdata');
let userID=null
if (userdataParam) {
  try {
    const decodedUserData = decodeURIComponent(userdataParam);
    const userData = JSON.parse(decodedUserData);
    const userName = userData.name;
    userID=userData._id
    let role=userData.role
    userdisplay(userName,role)
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
} else {
  console.log('User data parameter not found in URL');
}

console.log(userID)
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
        <div> <a style="text-decoration: none;" href=./pages/giveprivateclass.html?userdata=${urlParams} >be a tutor</a> </div>
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
          localStorage.removeItem("username")
          window.location.reload()
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
    


const form = document.getElementById("userForm");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const qualifications = document.getElementById("qualifications").value;
    const experience = document.getElementById("experience").value;
    const phoneNo = document.getElementById("phoneNo").value;
    const city = document.getElementById("city").value;
    const subject = document.getElementById("subject").value;
    const about = document.getElementById("about").value;

    const payload = { qualifications, experience, phoneNo, city, subject, about };
    console.log(payload)
    fetch(`http://localhost:8600/user/addteacher/${userID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then((data) =>{
        document.getElementById("msg").innerText=data.msg
        console.log(data)
        user.role.push("tutor")
        localStorage.setItem("user",JSON.stringify(user))
    })
    .catch(error => console.error("Error:", error));
  });
