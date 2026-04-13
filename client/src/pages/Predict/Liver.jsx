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

const Liver = () => {
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    Total_Bilirubin: "",
    Direct_Bilirubin: "",
    Alkaline_Phosphotase: "",
    Alamine_Aminotransferase: "",
    Aspartate_Aminotransferase: "",
    Total_Protiens: "",
    Albumin: "",
    Albumin_and_Globulin_Ratio: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // AI states
  const [activeType, setActiveType] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // -----------------------------
  // Handle Input
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
      const { data } = await API.post("/predict/liver", formData);
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
    } catch {
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
      Age: "",
      Gender: "",
      Total_Bilirubin: "",
      Direct_Bilirubin: "",
      Alkaline_Phosphotase: "",
      Alamine_Aminotransferase: "",
      Aspartate_Aminotransferase: "",
      Total_Protiens: "",
      Albumin: "",
      Albumin_and_Globulin_Ratio: ""
    });
    setResult(null);
    setAiResponse("");
    setActiveType(null);
  };

  if (loading) return <Loader text="Analyzing Liver Risk..." />;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-yellow-600">
        🧬 Liver Disease Prediction
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid gap-3">

        {/* Age */}
        <div>
          <input name="Age" type="number" placeholder="Age" onChange={handleChange} />
          <p className="text-xs text-gray-500">Range: 1 – 100</p>
        </div>

        {/* Gender */}
        <select name="Gender" onChange={handleChange}>
          <option value="">Gender</option>
          <option value="1">Male</option>
          <option value="0">Female</option>
        </select>

        {/* Total Bilirubin */}
        <div>
          <input name="Total_Bilirubin" type="number" step="0.1" placeholder="Total Bilirubin" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 0.1 – 1.2 mg/dL</p>
        </div>

        {/* Direct Bilirubin */}
        <div>
          <input name="Direct_Bilirubin" type="number" step="0.1" placeholder="Direct Bilirubin" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 0 – 0.3 mg/dL</p>
        </div>

        {/* Alkaline Phosphotase */}
        <div>
          <input name="Alkaline_Phosphotase" type="number" placeholder="Alkaline Phosphotase" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 44 – 147 IU/L</p>
        </div>

        {/* ALT */}
        <div>
          <input name="Alamine_Aminotransferase" type="number" placeholder="ALT" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 7 – 56 U/L</p>
        </div>

        {/* AST */}
        <div>
          <input name="Aspartate_Aminotransferase" type="number" placeholder="AST" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 10 – 40 U/L</p>
        </div>

        {/* Total Proteins */}
        <div>
          <input name="Total_Protiens" type="number" step="0.1" placeholder="Total Proteins" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 6 – 8.3 g/dL</p>
        </div>

        {/* Albumin */}
        <div>
          <input name="Albumin" type="number" step="0.1" placeholder="Albumin" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 3.4 – 5.4 g/dL</p>
        </div>

        {/* A/G Ratio */}
        <div>
          <input name="Albumin_and_Globulin_Ratio" type="number" step="0.1" placeholder="A/G Ratio" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 1.0 – 2.5</p>
        </div>

        <button className="bg-yellow-600 text-white p-2 rounded">
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

          {/* AI Buttons */}
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

          {/* Download */}
         <button
  onClick={async () => {
    try {
      const res = await API.post("/reports/ai-report/liver", {
        prediction: result,
        formData
      });

      window.open(res.data.pdfUrl, "_blank");

    } catch (err) {
      console.error(err);
      alert("Failed to download report");
    }
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

export default Liver;