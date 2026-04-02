import { useNavigate } from "react-router-dom";
export default function AuthLayout({ children }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* LEFT SIDE */}
      <div className="text-white text-center px-10">
        <h1 className="text-5xl font-bold mb-4">AI Interview 🚀</h1>

        <p className="text-lg opacity-90 mb-6">
          Practice smarter. Perform better. Get hired faster.
        </p>

        {/* 🔥 CTA BUTTONS */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/auth")}
            className="bg-white text-purple-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/auth")}
            className="border border-white px-5 py-2 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8 w-[380px]">
          {children}
        </div>
      </div>
    </div>
  );
}
