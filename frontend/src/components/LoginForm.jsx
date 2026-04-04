import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate(); // ✅ FIX 1
  const { login } = useContext(AuthContext); // ✅ FIX 2

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ FIX 3

    try {
      const res = await API.post("/auth/login", form);

      console.log(res.data);

      // ✅ SAVE TOKEN + USER
      login(res.data.data);

      alert("Login Success 🚀");

      // ✅ REDIRECT
     console.log("BEFORE NAVIGATE");
     navigate("/dashboard");
     console.log("AFTER NAVIGATE");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
}
