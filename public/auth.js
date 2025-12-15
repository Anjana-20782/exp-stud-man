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

async function register() {
  const fileInput = document.getElementById("profileImage");
  let imageBase64 = null;

  // OPTIONAL: only if user selected a file
  if (fileInput && fileInput.files.length > 0) {
    imageBase64 = await toBase64(fileInput.files[0]);
  }

  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      profileImage: imageBase64 // OPTIONAL
    })
  });

  const data = await res.json();
  alert(data.message);
}


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

//   if (res.ok) {
//     localStorage.setItem("token", data.token); // store JWT
//     alert("Login Success!");
//     window.location.href = "/index.html"; // redirect to student page
//   // } else {
//   //   alert(data.message);
//   // }
// }


if (res.ok) {
  localStorage.setItem("token", data.token);

  // OPTIONAL: store profile image
  if (data.profileImage) {
    localStorage.setItem("profileImage", data.profileImage);
  }

  alert("Login Success!");
  window.location.href = "/index.html";
}else{
  alert(data.message)
}
}
// OPTIONAL: convert file to base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

