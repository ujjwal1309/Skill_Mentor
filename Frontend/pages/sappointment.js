
let id = localStorage.getItem("studentID")
let Dat ;
let token = localStorage.getItem("token")
async function getData() {
 
  
 
      try {
          let res = await fetch(`https://alert-lime-bracelet.cyclic.app/studentSlots/${id}`, {
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
   let teachers = Data.map((item)=>{
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

   document.getElementById("teachers").innerHTML=teachers.join(" ")
}

function searchteacher(){
    let q=document.querySelector(".searchteacher").value;
    
    let newdata=Dat.filter(function(elem){
        return elem.teacherName.toLowerCase().includes(q.toLocaleLowerCase());
    });
  console.log(newdata)
    showTeacher(newdata);
}