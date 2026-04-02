import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import API from "../api/axios";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = isLogin ? "/auth/login" : "/auth/register";
      const res = await API.post(url, form);

      console.log(res.data);
      alert("Success 🚀");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl text-white font-bold text-center mb-6">
        {isLogin ? "Login" : "Create Account"}
      </h2>

      <div className="space-y-4">
        {!isLogin && (
          <InputField
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}

        <InputField
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <InputField
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button
          text={isLogin ? "Login" : "Register"}
          onClick={handleSubmit}
          loading={loading}
        />
      </div>

      <p className="text-center text-gray-300 mt-4 text-sm">
        {isLogin ? "No account?" : "Already registered?"}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-indigo-400 ml-2 font-semibold"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </AuthLayout>
  );
}
