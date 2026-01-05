import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    const { data } = await api.post("/auth/login", { email, password });

    login(data.token, data.profileImage);
    navigate("/");
  }

  return (
    <div className="auth-card">
      <h2>Sign in</h2>

      <form onSubmit={handleSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button>Sign in</button>
      </form>

      <p>Don’t have an account? <Link to="/register">Create Account</Link></p>
    </div>
  );
}
