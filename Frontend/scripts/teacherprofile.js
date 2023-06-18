let details=JSON.parse(localStorage.getItem("profile"));
    document.querySelector(".image").setAttribute("src",details.image);
    document.querySelector(".name").innerText=details.teacherName;
    document.querySelector(".subject").innerText="Subject : - "+details.subject;
    document.querySelector(".experience").innerText="Experience : - "+details.experience;
    document.querySelector(".qualifications").innerText="Qualification : - "+details.qualifications;
    document.querySelector(".email").innerText="Email : - "+details.email;
    document.querySelector(".phoneNo").innerText="Phone No : - "+details.phoneNo;
    document.querySelector(".city").innerText="City : - "+details.city;
    document.querySelector(".about").innerText=details.about;
    document.querySelector("#bookbtn").addEventListener("click",function(){
            window.location.href="./appointment.html";
        });
    document.querySelector("#sub-btn").addEventListener("click",function(){
        window.location.href="./review.html";
    });