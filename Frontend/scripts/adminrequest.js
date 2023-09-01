let baseurl = "http://localhost:8600/user/";
let product=document.getElementById("product")
let userid=JSON.parse(localStorage.getItem("user"))||null
let logo=document.querySelector(".title")
logo.addEventListener("click",()=>{
  window.location.href="./admin.html"
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

 
function render(data){  
  product.innerHTML=null
 data.forEach((element)=>{
      let itemdiv=document.createElement("div")
      itemdiv.setAttribute("class","itemdiv")
      let imgdiv=document.createElement("div")
      imgdiv.setAttribute("class","imgdiv")
      let image=document.createElement("img")
      image.setAttribute("src",element.image)
      imgdiv.append(image)
      let title=document.createElement("p")
      title.setAttribute("class","name")
      title.innerText=element.name
      let subject=document.createElement("p")
      subject.setAttribute("class","subject")
      subject.innerText=`subject :${element.subject}`
      let pricediv=document.createElement("div")
      let price=document.createElement("p")
      price.innerText=`fee per session:${element.price}`
      pricediv.setAttribute("class","price")
      pricediv.append(price)
      
      itemdiv.addEventListener("click",()=>{
          localStorage.setItem("teacherid",element._id)
          setTimeout(()=>{
            window.location.href=`./admintrequestprocess.html?teacherId=${element._id}`
          },0)
          
  })

      itemdiv.append(imgdiv,title,subject,pricediv)
      product.append(itemdiv)
      
      })
      
  }

  
  
  fetch(`${baseurl}tutor`)
  .then(res=>res.json())
  .then(data=>{
     render(data.msg)
      console.log(data)
  })
  




// filter//.................................
let filterone=document.getElementById("filter-one")
    let catdiv=document.getElementById("catagories-dropdown") 
    let filtertwo=document.getElementById("filter-two")
    let pricediv=document.getElementById("price-dropdown")
    let filterthree=document.getElementById("filter-three")
    let ratingdiv=document.getElementById("rating-dropdown")

    let count=0;
    let valbag="" 
filterone.addEventListener("click",()=>{
   let y=`<div>
   <div class="bag">
     <input type="checkbox" value="javascript">
     <label for="">JavaScript</label>
   </div>
   <div class="bag">
     <input type="checkbox" value="node.js">
     <label for="">Node.js</label>
   </div>
   <div class="bag">
     <input type="checkbox" value="css">
     <label for="">css</label>
   </div>
   <div class="bag">
     <input type="checkbox" value="html">
     <label for="">html</label>
   </div>
 </div>`
  
catdiv.innerHTML=y
count++
if(count%2==0){
  catdiv.innerHTML=null
}
let valarr = [];

const checkboxes = catdiv.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', event => {
        const value = checkbox.value;
          
        if (checkbox.checked) {
            // Add value to the array if checked
            valarr.push(value);
        } else {
            // Remove value from the array if unchecked
            const index = valarr.indexOf(value);
            if (index !== -1) {
                valarr.splice(index, 1);
            }
        }
         console.log(valarr.length)
        if(valarr.length==0){
          fetch(`${baseurl}tutor`)
           .then(res=>res.json())
        .then(data=>{
        render(data.msg)
          })
        }
        else{
          valbag=""
          for(let i=0;i<valarr.length;i++){
            valbag+=`subject=${valarr[i]}&`
          }
          console.log(valbag)
          fetch(`${baseurl}filter?${valbag}`)
         .then(res=>res.json())
          .then(data=>{
          render(data.msg)
          console.log(data)
})
        }
    });
});
console.log(valbag,'f')

 
})



 

  console.log(valbag)



let count1=0
filtertwo.addEventListener("click",()=>{

  let y = `
  <div>
      <div>
          <label for="">min</label>
          <input id="min" type="number">
      </div>
      <div>
          <label for="">max</label>
          <input id="max" type="number">
      </div>
      <div>
          <button id="goButton">go</button>
      </div>
  </div>
`;

pricediv.innerHTML = y;
count1++
if(count1%2==0){
   pricediv.innerHTML=null
}
const goButton = document.getElementById('goButton');
goButton.addEventListener('click', () => {
      valbag=valbag
    const minInput = document.getElementById('min')
    const maxInput = document.getElementById('max')

    const minValue = minInput.value||0
    const maxValue = maxInput.value||Number.
    MAX_SAFE_INTEGER;
    valbag+=`min=${minValue}&max=${maxValue}`
    console.log(valbag)
    fetch(`${baseurl}filter?${valbag}`)
         .then(res=>res.json())
          .then(data=>{
          render(data.msg)
          console.log(data)
          })

});
})

let sortselect=document.getElementById("sort")
sortselect.addEventListener("change",event=>{
  let selected=event.target.value
  console.log(selected)
  if(selected=="low to high"){
   let valbagsort=valbag
    valbagsort+=`sort=asc&`
    console.log(valbagsort)
    fetch(`${baseurl}filter?${valbagsort}`)
    .then(res=>res.json())
     .then(data=>{
     render(data.msg)
     console.log(data,"88")
     })
  }
  else if(selected=="high to low"){
    valbag=valbag
    let valbagsort=valbag
    valbagsort+=`sort=desc&`
    fetch(`${baseurl}filter?${valbagsort}`)
    .then(res=>res.json())
     .then(data=>{
     render(data.msg)
     console.log(data)
     })

  }
})



