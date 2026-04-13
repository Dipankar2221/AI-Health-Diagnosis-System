import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Chart from "../components/Chart";
import API from "../services/api";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // 📥 Fetch Reports
  // ===============================
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await API.get("/reports");
        setReports(data.reports || []);
      } catch (error) {
        console.error("Error fetching reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // ===============================
  // ❌ DELETE REPORT
  // ===============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this report?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/reports/${id}`);

      // ✅ Remove from UI instantly
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if (loading) return <Loader text="Loading reports..." />;

  // ===============================
  // 📊 Chart Data
  // ===============================
  const chartData = {
    labels: reports.map((r) => r.disease),
    datasets: [
      {
        label: "Risk %",
        data: reports.map((r) => r.risk),
        backgroundColor: [
          "#ef4444",
          "#f59e0b",
          "#10b981",
          "#3b82f6",
          "#8b5cf6",
        ],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">Health Reports</h1>

      {/* 📊 Chart */}
      {reports.length > 0 && (
        <Chart type="bar" data={chartData} title="Health Risk Overview" />
      )}

      {/* 📄 Reports List */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {reports.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          reports.map((report) => (
            <div
              key={report._id} // ✅ FIXED (no index)
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg">{report.disease}</h3>

              <p className="text-sm text-gray-600">
                Risk: <span className="font-semibold">{report.risk}%</span>
              </p>

              <p className="text-sm text-gray-600">
                Date: {new Date(report.date).toLocaleDateString()}
              </p>

              {/* 🔘 Buttons */}
              <div className="flex gap-2 mt-3">
                {/* Download */}
                <a
                  href={report.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Download
                </a>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(report._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reports;