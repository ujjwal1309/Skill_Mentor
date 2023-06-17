var button = document.getElementById("button-container");
var student = document.getElementById("student");
var tutor = document.getElementById("tutor");
var buttonTrack = document.getElementById("stuButton");

var where = document.getElementById("for-button");

var buttonState = true;

button.addEventListener("click", function () {
  if (buttonState) {
    document.getElementById("stuButton").style.transform = "translateX(118px)";
    buttonState = false;
    student.innerText = "Tutor";
    tutor.innerText = "Student";
    tutor.style.transform = "translateX(-118px)";
    buttonTrack.style.borderRadius = "0px 20px 20px 0px";
  } else {
    document.getElementById("stuButton").style.transform = "translateX(0px)";
    buttonState = true;
    student.innerText = "Student";
    tutor.innerText = "Tutor";
    tutor.style.transform = "translateX(0px)";
    buttonTrack.style.borderRadius = "20px 0px 0px 20px";
  }
});

let signupForm = document.querySelector("form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let role = "";
  if (buttonState) {
    role = "student";
  } else {
    role = "tutor";
  }
  let firstname = signupForm.firstname.value;
  let lastname = signupForm.lastname.value;
  let email = signupForm.email.value;
  let password = signupForm.password.value;
  let regData = { name: firstname + " " + lastname, role, email, password };
  signUp(regData);
});

// posting data for signup
async function signUp(regData) {
  console.log(regData);
  await fetch("https://alert-lime-bracelet.cyclic.app/user/signup", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(regData),
  })
    .then(async (result) => {
      const data = await result.text();
      if (result.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Hey👋! Welcome to learnmate",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          window.location.href = "./login.html";
        }, "2000");
      } else {
        Swal.fire(data);
      }
    })
    .catch((err) => {
      console.log(err);
      alert(data);
    });
}
