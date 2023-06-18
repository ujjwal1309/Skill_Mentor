let baseurl = "https://tired-frog-cap.cyclic.app/teacher/allteacher";


let bag = [];

fetch(baseurl, {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
})
  .then((res) => res.json())
  .then((data) => {
    bag = data;
    console.log(bag);
    displaycard(data);
  });

function searchteacher() {
  let q = document.querySelector(".searchteacher").value;
  console.log(q);
  let newdata = bag.filter(function (elem) {
    return elem.teacherName.toLowerCase().includes(q.toLocaleLowerCase());
  });
  console.log(newdata);
  displaycard(newdata);
}

function searchsubject() {
  let q = document.querySelector(".searchsubject").value;
  console.log(q);
  let newdata = bag.filter(function (elem) {
    return elem.subject.toLowerCase().includes(q.toLocaleLowerCase());
  });
  console.log(newdata);
  displaycard(newdata);
}

function displaycard(data) {
  document.querySelector("#container").innerHTML = "";
  data.forEach(function (elem) {
    let anc = document.createElement("a");
    anc.href = "../pages/teacherprofile.html";
    let div = document.createElement("div");

    div.setAttribute("class","box")

    div.addEventListener("click", function () {
      localStorage.setItem("profile", JSON.stringify(elem));
    });
    let imageprod = document.createElement("img");
    imageprod.setAttribute("src", elem.image);

    let name = document.createElement("h2");
    name.innerText = elem.teacherName;

    let subject = document.createElement("h3");
    subject.innerText = elem.subject;

    let btndiv = document.createElement("div");
    btndiv.setAttribute("class", "btn-div");

    let btn1 = document.createElement("button");
    btn1.setAttribute("class", "profile-btn");
    btn1.innerText = "View Profile";
    btn1.addEventListener("click", function () {
      localStorage.setItem("profile", JSON.stringify(elem));
      window.location.href = "../pages/teacherprofile.html";
    });

    let btn2 = document.createElement("button");
    btn2.setAttribute("class", "slotbook-btn");
    btn2.innerText = "Book Slot";
    btn2.addEventListener("click", function () {
      window.location.href = "../pages/appointment.html";
    });
    btndiv.append(btn1, btn2);
    div.append(imageprod, name, subject, btndiv);

    document.querySelector("#container").append(div);
  });
}
