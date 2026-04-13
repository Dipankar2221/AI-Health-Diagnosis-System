import React, { useEffect, useState } from "react";
import Chart from "../components/Chart";
import Loader from "../components/Loader";
import API from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
         const { data } = await API.get("/reports/dashboard");
        setStats(data);
      } catch (error) {
        console.error("Dashboard fetch error");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <Loader text="Loading dashboard..." />;

  // Fallback if API not ready
  const fallback = {
    totalReports: 10,
    highRisk: 3,
    mediumRisk: 4,
    lowRisk: 3,
    diseases: [
      { name: "Heart", risk: 70 },
      { name: "Stroke", risk: 40 },
      { name: "Diabetes", risk: 60 },
      { name: "Kidney", risk: 30 },
      { name: "Liver", risk: 50 },
    ],
  };

  const dataSource = stats || fallback;

  // Chart Data
  const pieData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        data: [
          dataSource.highRisk,
          dataSource.mediumRisk,
          dataSource.lowRisk,
        ],
        backgroundColor: ["#ef4444", "#f59e0b", "#10b981"],
      },
    ],
  };

  const barData = {
    labels: dataSource.diseases.map((d) => d.name),
    datasets: [
      {
        label: "Risk %",
        data: dataSource.diseases.map((d) => d.risk),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Total Reports</h3>
          <p className="text-xl font-bold">{dataSource.totalReports}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">High Risk</h3>
          <p className="text-xl font-bold text-red-500">
            {dataSource.highRisk}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Medium Risk</h3>
          <p className="text-xl font-bold text-yellow-500">
            {dataSource.mediumRisk}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-sm text-gray-500">Low Risk</h3>
          <p className="text-xl font-bold text-green-500">
            {dataSource.lowRisk}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Chart type="pie" data={pieData} title="Risk Distribution" />
        <Chart type="bar" data={barData} title="Disease Risk Analysis" />
      </div>
    </div>
  );
};

export default Dashboard;