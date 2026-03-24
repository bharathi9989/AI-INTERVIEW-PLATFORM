import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      const res = await API.get("/analytics");
      setStats(res.data.data);
    };

    fetchStats();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">Dashboard 🚀</h1>

      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-100 rounded">
            <p>Total Interviews</p>
            <h2 className="text-xl">{stats.totalInterviews}</h2>
          </div>

          <div className="p-4 bg-gray-100 rounded">
            <p>Average Score</p>
            <h2 className="text-xl">{stats.averageScore}</h2>
          </div>

          <div className="p-4 bg-gray-100 rounded">
            <p>Best Score</p>
            <h2 className="text-xl">{stats.bestScore}</h2>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate("/upload")}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Start New Interview
      </button>
    </div>
  );
};

export default Dashboard;
