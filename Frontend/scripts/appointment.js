let details = JSON.parse(localStorage.getItem("profile"));
document.querySelector(".image").setAttribute("src", details.image);
document.querySelector(".name").innerText = details.teacherName;
document.querySelector(".subject").innerText = "Subject : - " + details.subject;

// ------calender-disable-past-date-------
window.onload = function () {
  var today = new Date().toISOString().split("T")[0];
  document.getElementsByName("setTodaysDate")[0].setAttribute("min", today);
};

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let date = form.date.value;
  let time = form.time.value;
  bookSlot(date, time);
});

async function bookSlot(date, time) {
  let teacherEmailID = JSON.parse(localStorage.getItem("profile")).email;
  let studentID = localStorage.getItem("studentID");
  let obj = { teacherEmailID, studentID, date, time };

  let addSlot = await fetch("https://alert-lime-bracelet.cyclic.app/bookSlots", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(obj),
  });
  if (addSlot.status == 200) {
    alert("slot booked");
  } else {
    alert("something went wrong");
  }
}
