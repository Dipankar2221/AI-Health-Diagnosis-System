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

const Stroke = () => {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    hypertension: "",
    heart_disease: "",
    ever_married: "",
    work_type: "",
    Residence_type: "",
    avg_glucose_level: "",
    bmi: "",
    smoking_status: ""
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
      [name]: value === "" ? "" : isNaN(value) ? value : Number(value),
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
      const { data } = await API.post("/predict/stroke", formData);
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
      gender: "",
      age: "",
      hypertension: "",
      heart_disease: "",
      ever_married: "",
      work_type: "",
      Residence_type: "",
      avg_glucose_level: "",
      bmi: "",
      smoking_status: ""
    });
    setResult(null);
    setAiResponse("");
    setActiveType(null);
  };

  if (loading) return <Loader text="Analyzing Stroke Risk..." />;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-purple-600">
        🧠 Stroke Prediction
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid gap-3">

        {/* Gender */}
        <select name="gender" onChange={handleChange}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Age */}
        <div>
          <input name="age" type="number" placeholder="Age" onChange={handleChange} />
          <p className="text-xs text-gray-500">Range: 1 – 100</p>
        </div>

        {/* Hypertension */}
        <select name="hypertension" onChange={handleChange}>
          <option value="">Hypertension</option>
          <option value={1}>Yes</option>
          <option value={0}>No</option>
        </select>

        {/* Heart Disease */}
        <select name="heart_disease" onChange={handleChange}>
          <option value="">Heart Disease</option>
          <option value={1}>Yes</option>
          <option value={0}>No</option>
        </select>

        {/* Married */}
        <select name="ever_married" onChange={handleChange}>
          <option value="">Ever Married</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        {/* Work Type */}
        <select name="work_type" onChange={handleChange}>
          <option value="">Work Type</option>
          <option value="Private">Private</option>
          <option value="Self-employed">Self-employed</option>
          <option value="Govt_job">Govt Job</option>
        </select>

        {/* Residence */}
        <select name="Residence_type" onChange={handleChange}>
          <option value="">Residence Type</option>
          <option value="Urban">Urban</option>
          <option value="Rural">Rural</option>
        </select>

        {/* Glucose */}
        <div>
          <input name="avg_glucose_level" type="number" placeholder="Avg Glucose Level" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 70 – 140 mg/dL</p>
        </div>

        {/* BMI */}
        <div>
          <input name="bmi" type="number" step="0.1" placeholder="BMI" onChange={handleChange} />
          <p className="text-xs text-gray-500">Normal: 18.5 – 24.9</p>
        </div>

        {/* Smoking */}
        <select name="smoking_status" onChange={handleChange}>
          <option value="">Smoking Status</option>
          <option value="never smoked">Never</option>
          <option value="formerly smoked">Former</option>
          <option value="smokes">Smokes</option>
        </select>

        <button className="bg-purple-600 text-white p-2 rounded">
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

          {/* DOWNLOAD */}
          <button
            onClick={async () => {
              const res = await API.post("/reports/ai-report/stroke", {
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

export default Stroke;