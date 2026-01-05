import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", file: null });
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("password", form.password);
    if (form.file) fd.append("profileImage", form.file);

    const { data } = await api.post("/auth/register", fd);
    login(data.token, data.profileImage);
    navigate("/");
  }

  return (
    <div className="auth-card">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" onChange={handleChange} placeholder="Full name" />
        <input name="email" onChange={handleChange} placeholder="Email" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" />
        <input type="file" onChange={e => setForm({ ...form, file: e.target.files[0] })} />
        <button>Create</button>
      </form>

      <p>Already have an account? <Link to="/login">Sign in</Link></p>
    </div>
  );
}
