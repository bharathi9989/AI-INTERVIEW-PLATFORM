import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Dashboard 🚀</h1>

      <button
        onClick={() => navigate("/upload")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload Resume
      </button>
    </div>
  );
};

export default Dashboard;
