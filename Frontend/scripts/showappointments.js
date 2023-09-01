let baseurl = "http://localhost:8600/user/";
let product=document.getElementById("product")
let userid=JSON.parse(localStorage.getItem("user"))||null
console.log(userid)
let logo=document.querySelector(".title")
 logo.addEventListener("click",()=>{
  window.location.href="../index.html"
})
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
let dateselected=null;
let monthselected=null;
let yearselected=null;

const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");


 
// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];

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
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;

    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
// let g="Thu Aug 30 2023 01:54:40 GMT+0530 (India Standard Time)"
// g=new Date(g)
    let liElements=daysTag.querySelectorAll("li")
    let monthyear=document.querySelector(".current-date")
   
    liElements.forEach((ele)=>{
       
          ele.addEventListener("click",()=>{
            liElements.forEach((tag)=>{
              tag.classList.remove("click")
            })
            let [month,year]=monthyear.innerText.split(" ")
            console.log(ele.innerText,month,year)
            dateselected=ele.innerText;
            monthselected=month;
            yearselected=year
            ele.classList.add("click")
            
          })
      
    })
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

  //time...
  let timeselected=null
   let timeinput=document.getElementById("timeinput")
   timeinput.addEventListener("input",(e)=>{
    timeselected=e.target.value

   })
  //time..

  // submit slotselecte
   let submitslot=document.getElementById("submitslot")
   submitslot.addEventListener("click",()=>{

    // Convert month name to its numerical representation
     let  monthDict = {
       "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
       "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
     };
     let  monthNum = monthDict[monthselected];
     
     // Split the time into hours and minutes
     var timeParts = timeselected.split(":");
     var hours = parseInt(timeParts[0]);
     var minutes = parseInt(timeParts[1]);
     
     // Create a Date object
     var dateTime = new Date(parseInt(yearselected), monthNum, dateselected, hours, minutes);
      console.log(dateTime)
      fetch(`http://localhost:8600/slot/createSlot/${userid._id}`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({dateTime})
      })
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data)
        window.location.reload()
      })
        
      })

  // submit slotselecte


  // show slot
    fetch(`http://localhost:8600/slot/allslotTeacher/${userid._id}`)
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data.msg)
      renderslots(data.msg)
    })



  let slotdisplay = document.getElementById("slot-display");

  function renderslots(data) {
    let slotCardsHTML = data.map((ele) => {
      // Create a Date object from the meeting_time
      const dateObj = new Date(ele.meeting_time);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
  
      // Extract time components
      const hours = dateObj.getUTCHours();
      const minutes = dateObj.getUTCMinutes();
  
      // Use template literals to create the HTML structure for each slot card
      return `
        <div class="slot-card">
          <div class="slot-datetime">
            <h4 class="date"><span>Date:</span> ${year}-${month}-${day}</h4>
            <h4 class="time"><span>Time:</span> ${hours}:${minutes}</h4>
          </div>
          <div class="status-area">
          <div class="booked-ornot">${ele.status ? "Booked" : "Not Booked"}</div>
          ${ele.status ? `<div class="showdbookingdetails"></div>` : ''}
          </div>
        </div>
      `;
    });
  
    
    slotdisplay.innerHTML = slotCardsHTML.join("");
  }
  
    
   // show slot

  