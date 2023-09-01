
let userid=JSON.parse(localStorage.getItem("user"))||null
console.log(userid,"userid")
let logo=document.querySelector(".title")
 logo.addEventListener("click",()=>{
  window.location.href="../index.html"
})
const urlParams = new URLSearchParams(window.location.search);
const userDataParam = urlParams.get("userdata");
let imageDiv=document.getElementById("imageDiv")
imageDiv.innerHTML=`<img id="img" src=${userid.image}
alt="image">`
let userName=document.getElementById("user-detail-name")
userName.innerText=userid.name
 
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


// navbar colorchange on scroll.......
window.addEventListener("scroll",()=>{
  if(window.scrollY>100){
    document.querySelector(".nav").classList.add("onscrollnav")
    document.querySelector(".loginbutton").classList.add("loginbuttononscroll")
    document.querySelector(".tutorlogin").classList.add("loginbuttononscroll")
    
  }
  else{
    document.querySelector(".nav").classList.remove("onscrollnav")
    document.querySelector(".loginbutton").classList.remove("loginbuttononscroll")
    document.querySelector(".tutorlogin").classList.remove("loginbuttononscroll")
    
  }
})
// ..........................................







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
    <div><a href=./pages/profile.html style="text-decoration: none;">profile</a></div>
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

const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton'); // Move this outside the input event listener

let formData = new FormData(); // Create FormData to send the image

fileInput.addEventListener('input', (event) => {
  const selectedFile = event.target.files[0]; // Get the first selected file

  if (selectedFile) {
    const maxSizeInBytes = 25000; // 25 KB in bytes

    if (selectedFile.size > maxSizeInBytes) {
      alert('File size exceeds the limit of 25 KB.');
      fileInput.value = ''; // Clear the selected file
    } else {
      formData.append('image', selectedFile); // Append the image file to the FormData object
    }
  }
});

uploadButton.addEventListener('click', (e) => {
  e.preventDefault();

  fetch(`http://localhost:8600/user/upload/${userid._id}`, {
    method: 'PATCH',
    body: formData, // Use the FormData object directly
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("user",JSON.stringify(data.msg))
      setTimeout(()=>{
        window.location.reload()
      },0)
    });
});

  

