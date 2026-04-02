import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600">
        <div className="text-white text-center px-10 max-w-md">
          <h1 className="text-5xl font-bold mb-4">AI Interview 🚀</h1>

          <p className="text-lg opacity-90 mb-8">
            Practice smarter. Perform better. Get hired faster.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/auth")}
              className="bg-white text-purple-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/auth", { state: { mode: "register" } })}
              className="border border-white px-5 py-2 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-900">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 w-[380px] transition hover:scale-[1.02]">
          {children}
        </div>
      </div>
    </div>
  );
}
