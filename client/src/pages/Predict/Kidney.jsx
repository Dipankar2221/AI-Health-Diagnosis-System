import React, { useState } from "react";
import API from "../../services/api";
import Loader from "../../components/Loader";

// -----------------------------
// Risk Color
// -----------------------------
const getRiskColor = (level) => {
  if (level === "High") return "text-red-600";
  if (level === "Medium") return "text-yellow-500";
  return "text-green-600";
};

const Kidney = () => {
  const [formData, setFormData] = useState({
    age: "", bp: "", sg: "", al: "", su: "",
    bgr: "", bu: "", sc: "", hemo: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // AI states
  const [activeType, setActiveType] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // -----------------------------
  // Input change
  // -----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "" ? "" : Number(value),
    });
  };

  // -----------------------------
  // Submit
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (formData[key] === "") {
        alert(`Please fill ${key}`);
        return;
      }
    }

    setLoading(true);
    try {
      const { data } = await API.post("/predict/kidney", formData);
      setResult(data);

      setAiResponse("");
      setActiveType(null);
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // AI Recommendation
  // -----------------------------
  const fetchRecommendation = async (type) => {
    setActiveType(type);
    setAiLoading(true);
    setAiResponse("");

    try {
      const { data } = await API.post("/reports/ai/recommendation", {
        type,
        prediction: result,
        formData
      });

      setAiResponse(data.answer);
    } catch (err) {
      setAiResponse("Failed to load recommendation");
    } finally {
      setAiLoading(false);
    }
  };

  // -----------------------------
  // Reset
  // -----------------------------
  const handleReset = () => {
    setFormData({
      age: "", bp: "", sg: "", al: "", su: "",
      bgr: "", bu: "", sc: "", hemo: ""
    });
    setResult(null);
    setAiResponse("");
    setActiveType(null);
  };

  if (loading) return <Loader text="Analyzing Kidney Risk..." />;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-600">
        🧪 Kidney Disease Prediction
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid gap-3">

        {/* Age */}
        <div>
          <input name="age" type="number" placeholder="Age" onChange={handleChange} />
          <p className="text-xs text-gray-500">Range: 1 – 100</p>
        </div>

        {/* Blood Pressure */}
        <div>
          <input name="bp" type="number" placeholder="Blood Pressure" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 80 – 120 mmHg</p>
        </div>

        {/* Specific Gravity */}
        <div>
          <input name="sg" type="number" step="0.001" placeholder="Specific Gravity" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 1.005 – 1.030</p>
        </div>

        {/* Albumin */}
        <div>
          <input name="al" type="number" placeholder="Albumin" onChange={handleChange} />
          <p className="text-xs text-gray-500">Range: 0 – 5</p>
        </div>

        {/* Sugar */}
        <div>
          <input name="su" type="number" placeholder="Sugar" onChange={handleChange} />
          <p className="text-xs text-gray-500">Range: 0 – 5</p>
        </div>

        {/* Blood Glucose Random */}
        <div>
          <input name="bgr" type="number" placeholder="Blood Glucose Random" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 70 – 140 mg/dL</p>
        </div>

        {/* Blood Urea */}
        <div>
          <input name="bu" type="number" placeholder="Blood Urea" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 7 – 20 mg/dL</p>
        </div>

        {/* Serum Creatinine */}
        <div>
          <input name="sc" type="number" step="0.1" placeholder="Serum Creatinine" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 0.6 – 1.3 mg/dL</p>
        </div>

        {/* Hemoglobin */}
        <div>
          <input name="hemo" type="number" step="0.1" placeholder="Hemoglobin" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 12 – 17 g/dL</p>
        </div>

        <button className="bg-green-600 text-white p-2 rounded">
          Predict
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-400 text-white p-2 rounded"
        >
          Reset
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div className="mt-5 p-4 border rounded bg-gray-50">
          <p>Probability: {result.probability}%</p>

          <p className={getRiskColor(result.chance_level)}>
            Risk: {result.chance_level}
          </p>

          {/* AI BUTTONS */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button onClick={() => fetchRecommendation("diet")} className="bg-green-500 text-white p-2 rounded">Diet</button>
            <button onClick={() => fetchRecommendation("exercise")} className="bg-blue-500 text-white p-2 rounded">Exercise</button>
            <button onClick={() => fetchRecommendation("lifestyle")} className="bg-purple-500 text-white p-2 rounded">Lifestyle</button>
            <button onClick={() => fetchRecommendation("prevention")} className="bg-red-500 text-white p-2 rounded">Prevention</button>
          </div>

          {aiLoading && <p className="mt-3">Generating AI response...</p>}

          {aiResponse && (
            <div className="mt-4 p-3 border bg-white rounded">
              <h3 className="font-semibold capitalize">{activeType}</h3>
              <p>{aiResponse}</p>
            </div>
          )}

          {/* DOWNLOAD REPORT */}
          <button
            onClick={async () => {
              const res = await API.post("/reports/ai-report/kidney", {
                prediction: result,
                formData
              });

              window.open(res.data.pdfUrl, "_blank");
            }}
            className="mt-4 bg-black text-white p-2 rounded w-full"
          >
            Download AI Report
          </button>
        </div>
      )}
    </div>
  );
};

export default Kidney;