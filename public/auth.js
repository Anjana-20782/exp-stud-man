// auth.js

// async function register() {
//   const res = await fetch("/api/auth/register", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       name: document.getElementById("username").value, // changed from username → name
//       email: document.getElementById("email").value,
//       password: document.getElementById("password").value
//     })
//   });

//   const data = await res.json();
//   alert(data.message);
// }

let base64Image = null;

document.getElementById("profileImage")?.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    base64Image = reader.result; // BASE64
  };
  reader.readAsDataURL(file);
});

async function register() {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      profileImage: base64Image // ✅ optional
    })
  });

  const data = await res.json();
  alert(data.message);

  if (res.ok) {
    window.location.href = "/login.html";
  }
}


// async function login() {
//   const res = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       email: document.getElementById("email").value,
//       password: document.getElementById("password").value
//     })
//   });

//   const data = await res.json();

//   if (res.ok) {
//     localStorage.setItem("token", data.token); // store JWT
//     alert("Login Success!");
//     window.location.href = "/index.html"; // redirect to student page
//   } else {
//     alert(data.message);
//   }
// }


async function login() {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);

    // ✅ Store base64 image
    if (data.profileImage) {
      localStorage.setItem("profileImage", data.profileImage);
    } else {
      localStorage.removeItem("profileImage");
    }

    window.location.href = "/index.html";
  } else {
    alert(data.message);
  }
}

