let token = localStorage.getItem("token")
let email = localStorage.getItem("teacherEmailID");
let name = document.getElementById("name")
name.innerHTML=`${email}`
let Dat ;
async function getData() {
 
  
 
      try {
          let res = await fetch(`https://alert-lime-bracelet.cyclic.app/teacherSlots/${email}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  
                  "Authorization":token
              },
              
          })
          let data = await res.json();
          console.log(data);
          Dat=data;
          showAppointments(data);
      } catch (error) {
          console.log(error);
      }
     

  
}
getData();


function showAppointments(Data){
   let slots = Data.map((item)=>{
      return `
      <tr>
        <td>
          <h4>${item._id}</h4>
        </td>
        <td>
          <h4>${item.date}</h4>
        </td>
        <td>
          <h4>${item.time}</h4>
        </td>
        <td>
          <h4>${item.status}</h4>
        </td>
       
      <td>
          <button class="accept btn3"  data-id=${item._id}>Approve</button>
        </td>
        <td>
          <button class="reject btn3" data-id=${item._id}>Reject</button>
        </td>
        
        
      </tr>
      `
   })

   document.getElementById("teachers").innerHTML=slots.join(" ")




let all_accept_btns = document.querySelectorAll(".accept")

   for(accept_btn of  all_accept_btns){
    console.log("jyoti")
       accept_btn.addEventListener("click",(event)=>{
            let id = event.target.dataset.id
            accept(id)
       })
   }
   let all_reject_btns = document.querySelectorAll(".reject")

   for(reject_btn of  all_reject_btns){
       reject_btn.addEventListener("click",(event)=>{
            let id = event.target.dataset.id
            reject(id)
       })
   }

}

   function accept(id){
    fetch(`https://alert-lime-bracelet.cyclic.app/update/${id}`,{
        method:"PATCH",
        headers:{
          "Content-Type": "application/json",
          "Authorization":token
        },
        body:JSON.stringify({status:"approved"})
    })
    .then(res=>res.text())
    .then(res=>{
      if(res){
        alert("status updated")
        location.reload()
      }
      
    })
  }
  function reject(id){
    fetch(`https://alert-lime-bracelet.cyclic.app/update/${id}`,{
        method:"PATCH",
        headers:{
          "Content-Type": "application/json",
          "Authorization":token
        },
        body:JSON.stringify({status:"rejected"})
    })
    .then(res=>res.text())
    .then(res=>{
      if(res){
        alert("status updated");
        location.reload()
      }
      
    })
  }


 let select = document.getElementById("myselect").addEventListener("change",()=>{
  let val = document.getElementById("myselect").value
  let filtereddata=Dat.filter(function(element){
    return element.status==val
})

  
  showAppointments(filtereddata)


 })

 


