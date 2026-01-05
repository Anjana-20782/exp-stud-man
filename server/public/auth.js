

async function register() {
  const formData = new FormData();
  formData.append("name", document.getElementById("username").value);
  formData.append("email", document.getElementById("email").value);
  formData.append("password", document.getElementById("password").value);

  const file = document.getElementById("profileImage").files[0];
  if (file) {
    formData.append("profileImage", file);
  }

  const res = await fetch("/api/auth/register", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "/index.html";
  } else {
    alert(data.message);
  }
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

