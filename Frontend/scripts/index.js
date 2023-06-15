
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


