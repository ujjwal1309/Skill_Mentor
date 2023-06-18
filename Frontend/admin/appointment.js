let token = localStorage.getItem("token")

let Dat ;
async function getData() {
 
  
 
      try {
          let res = await fetch("https://alert-lime-bracelet.cyclic.app/allSlots", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  
                  "Authorization":token
              },
              
          })
          let data = await res.json();
          console.log(data);
          Dat=data;
          showTeacher(data);
      } catch (error) {
          console.log(error);
      }
     

  
}
getData();


function showTeacher(Data){
   let slots = Data.map((item)=>{
      return `
      <tr>
        <td>
          <h4>${item._id}</h4>
        </td>
        <td>
          <h4>${item.teacherEmailID}</h4>
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
        
        
      </tr>
      `
   })

   document.getElementById("teachers").innerHTML=slots.join(" ")
}