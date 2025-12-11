async function register() {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
   body: JSON.stringify({
  name: document.getElementById("username").value,
  email: document.getElementById("email").value,
  password: document.getElementById("password").value
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
  if (res.ok) {
    localStorage.setItem("token", data.token);
    alert("Login Success!");
    window.location.href = "/"; // student page
  } else {
    alert(data.message);
  }
}
