import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
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
        <div className="mt-10">
          <h2 className="text-lg mb-4">Performance Trend</h2>

          <LineChart width={600} height={300} data={stats.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" />
          </LineChart>
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
