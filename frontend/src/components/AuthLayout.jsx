export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="text-white text-center px-10">
          <h1 className="text-5xl font-bold mb-4">AI Interview 🚀</h1>
          <p className="text-lg opacity-80">
            Practice smarter. Crack interviews faster.
          </p>
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
