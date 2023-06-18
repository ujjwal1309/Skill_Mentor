let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = form.email.value;
  let password = form.password.value;
  let payload = { email, password };
  login(payload);
});
async function login(payload) {
  const fetchedData = await fetch("https://alert-lime-bracelet.cyclic.app/user/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await fetchedData.json();
  if (fetchedData.status == 200) {
    console.log(data);
    Swal.fire({
      icon: "success",
      title: "Yay! Login Successful 😍",
      showConfirmButton: false,
      timer: 2000,
    });
    localStorage.setItem("username", data.username);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    if (data.role == "student") {
      localStorage.setItem("studentID", data.userID);
      setTimeout(() => {
        window.location.href = "../index.html";
      }, "2000");
    } else {
      setTimeout(() => {
        localStorage.setItem("teacherEmailID", data.email);
        window.location.href = "../admin/admin.html";
      }, "2000");
    }
  } else {
    Swal.fire("Wrong Credentials ❌");
  }
}
