// BASE API URL
const API_URL = "/api/auth";

// ---------------- Register ----------------

async function registerUser() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) return alert("All fields required");

  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Registration successful");
    window.location.href = "login.html";
  } else {
    alert(data.message);
  }
}

// ---------------- Login ----------------

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) return alert("Email + password required");

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    alert("Login successful");

    window.location.href = "index.html"; // or dashboard
  } else {
    alert(data.message || "Login failed");
  }
}
