import { useState } from "react";
import API from "../api/axios";

export default function AuthForm({ mode, setMode }) {
  const isLogin = mode === "login";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const url = isLogin ? "/auth/login" : "/auth/register";
      const res = await API.post(url, form);

      alert("Success 🚀");
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? "Login" : "Create Account"}
      </h2>

      <div className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            className="input"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="input"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 py-2 rounded-lg font-semibold"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </div>

      <p className="text-center mt-4 text-sm">
        {isLogin ? "No account?" : "Already have account?"}
        <button
          onClick={() => setMode(isLogin ? "register" : "login")}
          className="ml-2 text-purple-400 font-semibold"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}
