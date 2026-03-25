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
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/analytics");

        console.log("STATS:", res.data); // debug

        setStats(res.data.data);
      } catch (error) {
        console.log(error);
        alert("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // 🔥 Safe fallback for chart
  const safeChartData =
    stats?.chartData && stats.chartData.length > 0
      ? stats.chartData
      : [{ name: "No Data", score: 0 }];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">Dashboard 🚀</h1>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Interviews</p>
            <h2 className="text-3xl font-bold mt-2">{stats.totalInterviews}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Average Score</p>
            <h2 className="text-3xl font-bold mt-2">{stats.averageScore}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Best Score</p>
            <h2 className="text-3xl font-bold mt-2">{stats.bestScore}</h2>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow h-96">
        <h2 className="text-lg font-semibold mb-4">Performance Trend 📈</h2>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={safeChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Action Button */}
      <div className="mt-8">
        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
        >
          Start New Interview
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
