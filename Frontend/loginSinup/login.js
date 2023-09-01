let form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let email = form.email.value;
  let password = form.password.value;
  let payload = { email, password };
  console.log(payload);
  await login(payload); // Make sure to await the login function
});

async function login(payload) {
  try {
    const fetchedData = await fetch("http://localhost:8600/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      if(data.status===200){
        document.getElementById("msg").innerText="login sussessfull"
        setTimeout(()=>{
          if(data.role.includes("admin")){
            window.location.href=`../pages/admin.html?userdata=${data.data}`
          }
          else{
            window.location.href=`../index.html?userdata=${data.data}`
          }
         
        },2000)
      }
      else{
        document.getElementById("msg").innerText=data.msg
      }
    })
    
  }catch(err){
    console.log(err)
  }
  }