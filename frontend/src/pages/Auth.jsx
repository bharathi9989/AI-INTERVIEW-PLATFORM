import { useState } from "react";
import { useLocation } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import AuthForm from "../components/AuthForm";

export default function Auth() {
  const location = useLocation();

  // 🔥 detect mode from navigation
  const [mode, setMode] = useState(location.state?.mode || "login");

  return (
    <AuthLayout>
      <AuthForm mode={mode} setMode={setMode} />
    </AuthLayout>
  );
}
