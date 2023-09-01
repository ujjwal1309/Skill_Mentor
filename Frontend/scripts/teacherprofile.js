let teacherId=localStorage.getItem("teacherid")
let container=document.getElementById("container")
let userid=JSON.parse(localStorage.getItem("user"))||null

fetch(`http://localhost:8600/user/appointedtutor?id=${teacherId}`)
.then((res)=>res.json())
.then((data)=>{
    render(data.msg)
    console.log(data)
})


function render(element){
 
    let card=` <div id="card">
    <div id="imgdiv">
        <img src="${element[0].image}"alt="image">
    </div>
    <div id="detailsdiv">
       <p id="name"><span>Name:</span>${element[0].name}</p>
       <p id="email"><span>Email:</span>${element[0].email}</p>
       <p id="subject"><span>Subject:</span>${element[0].subject}</p>
       <p id="qualifications"><span>qualifications:</span>${element[0].qualifications}</p>
       <p id="about"><span>about:</span>${element[0].about}</p>
    </div>
</div>`
container.innerHTML=card

}




const urlParams = new URLSearchParams(window.location.search);
let logo=document.querySelector(".title")
 logo.addEventListener("click",()=>{
  window.location.href="../index.html"
})
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



// ********calender*********
const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");


 
// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        //  if(dayIndex==i&&)
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;

    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
     
    fetch(`http://localhost:8600/slot/allslotTeacher/${userid._id}`)
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data.msg)
      showslot(data.msg)
    })
    
function showslot(data){
  let temparr=[]
  data.forEach((slots)=>{
    g=new Date(slots.meeting_time)
    const dateindex = g.getDate();
    let dayindex=g.getDay()
    let yearindex=g.getYear()
    let monthindex=g.getMonth()
    
    let ym=currentDate.innerText
    let yerselectd=1900+yearindex
    let monthselected=months[monthindex]
    let yearmonth=monthselected+" "+yerselectd
    let liElements=daysTag.querySelectorAll("li")
    temparr=[]
    liElements.forEach((ele)=>{
        if(parseInt(ele.innerText)==dateindex && ym==yearmonth&&ele.classList[0]!=="inactive" ){
          ele.classList.add("slots")
          ele.addEventListener("click",()=>{
            while(temparr.length>0){
              temparr.pop()
            }
            temparr.push(slots)
            
          })
          
      }
      
    })
   

    
  })
  let nothing=document.getElementById("nothing")
    nothing.addEventListener("click",()=>{
      console.log(temparr)
    })
  
}

// let g="Thu Sep 1 2023 01:54:40 GMT+0530 (India Standard Time)"

}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }

    

        renderCalendar(); // calling renderCalendar function
    });
});




