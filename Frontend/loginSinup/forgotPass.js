let otpval = 0;

let cancelBtn = document.querySelector("#cancelBtn");
cancelBtn.addEventListener("click", () => {
  window.location.href = "./login.html";
});

// getting data from form
let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
let submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  let email = form.email.value;
  getOTP(email);
});

// checking email and sending otp

async function getOTP(email) {
  let fetchOTP = await fetch("https://alert-lime-bracelet.cyclic.app/otp", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicHVuaXQganVuZWphIiwidXNlcklEIjoiNjQ1NTJkOTU2MDAwMGY2MWY2ZWE0ZTcwIiwiaWF0IjoxNjgzMzAzODQwfQ.OZue0A28dJp5GBiexy4ZvAEnTxmpDZxcCYu728F7bj8",
    },
    body: JSON.stringify({ email }),
  });
  if (fetchOTP.status == 200) {
    let otp = await fetchOTP.json();
    Swal.fire(`Your otp is ${otp.message}`);
    otpval = otp.message;
    enterOTP();
  } else {
    let message = await fetchOTP.json();
    message = message.message;
    Swal.fire(`${message}`);
  }
}

// **********************************enter otp function*************************
let otp_inputs;
let inputOTP = 0;
let inputOTPLengthVerify = false;
function enterOTP() {
  form.innerHTML = null;
  form.innerHTML = `<img
          id="forgetPAssLogo"
          src="https://img.freepik.com/free-vector/enter-otp-concept-illustration_114360-7967.jpg?w=4000"
          alt="otpLogo"
        />
        <h1>Verify OTP</h1>
        <input style="display: none" type="email" id="email" /><br />
        <div class="otp-input-fields">
          <input type="number" class="otp__digit otp__field__1" required/>
          <input type="number" class="otp__digit otp__field__2" />
          <input type="number" class="otp__digit otp__field__3" />
          <input type="number" class="otp__digit otp__field__4" />
        </div>
        <div>
          <button id="cancelBtn">Cancel</button>
          <button id="verifyButton">Verify</button>
        </div>`;
  otp_inputs = document.querySelectorAll(".otp__digit");
  otp_inputs.forEach((_) => {
    _.addEventListener("keyup", handle_next_input);
  });
  // varifying otp
  let verifyButton = document.querySelector("#verifyButton");
  verifyButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputOTPLengthVerify) {
      if (otpval == inputOTP) {
        Swal.fire({
          icon: "success",
          title: "OTP Varified",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.href = "./resetpassword.html";
        }, "2000");
      } else {
        Swal.fire("Incorrect OTP");
      }
    } else {
      alert("Fill All Field");
    }
  });
}
// taking otp input
var mykey = "0123456789".split("");
function handle_next_input(event) {
  let current = event.target;
  let index = parseInt(current.classList[1].split("__")[2]);
  current.value = event.key;

  if (event.keyCode == 8 && index > 1) {
    current.previousElementSibling.focus();
  }
  if (index < 4 && mykey.indexOf("" + event.key + "") != -1) {
    var next = current.nextElementSibling;
    next.focus();
  }
  var finalOTP = "";
  for (let { value } of otp_inputs) {
    finalOTP += value;
  }
  if (finalOTP.length == 4) {
    inputOTP = finalOTP;
    inputOTPLengthVerify = true;
  } else {
    inputOTPLengthVerify = false;
  }
}
