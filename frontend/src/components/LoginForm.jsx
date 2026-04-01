import { useState } from "react";
import API from "../api/axios";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);
      alert("Login success");
      console.log(res.data);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="space-y-4">
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
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  );
}
