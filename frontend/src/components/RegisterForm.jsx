import { useState } from "react";
import API from "../api/axios";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", form);
      alert("Registered successfully");
    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        className="w-full border p-2 rounded focus:ring-2 focus:ring-green-400"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded focus:ring-2 focus:ring-green-400"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded focus:ring-2 focus:ring-green-400"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        onClick={handleRegister}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Register
      </button>
    </div>
  );
}
