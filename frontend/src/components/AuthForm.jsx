import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function AuthForm() {
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate(); // ✅ FIX

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      console.log(res.data);

      alert("Success 🚀");

      navigate("/dashboard"); // ✅ WILL WORK NOW
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div>
      <input
        type="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
