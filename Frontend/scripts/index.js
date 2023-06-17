


// copy this code for navbar......................................................
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
 
let username=localStorage.getItem("username")||null
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
    accountdropdown.innerHTML=`
    <div>My Dashboard</div>
    <div>Message</div>
    <div>My profile</div>
    <div class="logout">Log Out</div>
    `

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

// nav bar ......................................................................

let subjectSelection=document.querySelector(".subject-selection")

let subjectDropdown=document.querySelector(".subject-dropdown")
let count=0
subjectSelection.addEventListener("click",()=>{
  count++
  console.log(count)
  if(count%2!=0){
    console.log(5)
    subjectDropdown.classList.add("subject-dropdown-visible")
  }
  else{
    subjectDropdown.classList.remove("subject-dropdown-visible")
  }
})





