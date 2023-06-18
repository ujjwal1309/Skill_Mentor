let id = localStorage.getItem("userID");

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let newPass = form.newPAss.value.toString();
  let confirmNewPAss = form.confirmNewPAss.value.toString();
  if (newPass === confirmNewPAss) {
    resetPassword(newPass);
  } else {
    Swal.fire("Password didn't match");
  }
});

async function resetPassword(newPass) {
  try {
    let regdata = {
      id,
      password: newPass,
    };

    await fetch("https://alert-lime-bracelet.cyclic.app/reset", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(regdata),
    })
      .then(async (result) => {
        const data = await result.json();
        if (data.ok) {
          Swal.fire({
            icon: "success",
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.href = "./login.html";
          }, "2000");
        } else {
          Swal.fire(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  } catch (err) {
    console.log(err);
  }
}
