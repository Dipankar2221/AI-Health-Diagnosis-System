import React, { useState } from "react";
import API from "../../services/api";
import Loader from "../../components/Loader";

// -----------------------------
// Risk Color Function
// -----------------------------
const getRiskColor = (level) => {
  if (level === "High") return "text-red-600";
  if (level === "Medium") return "text-yellow-500";
  return "text-green-600";
};

const Heart = () => {
  const [formData, setFormData] = useState({
    age: "", sex: "", cp: "", trestbps: "", chol: "",
    fbs: "", restecg: "", thalach: "", exang: "",
    oldpeak: "", slope: "", ca: "", thal: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ NEW STATES
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
      const { data } = await API.post("/predict/heart", formData);
      setResult(data);

      // reset AI section
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
  // Fetch AI Recommendation
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
      console.error(err);
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
      age: "", sex: "", cp: "", trestbps: "", chol: "",
      fbs: "", restecg: "", thalach: "", exang: "",
      oldpeak: "", slope: "", ca: "", thal: ""
    });
    setResult(null);
    setAiResponse("");
    setActiveType(null);
  };

  if (loading) return <Loader text="Analyzing Heart Risk..." />;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-red-600">
        ❤️ Heart Disease Prediction
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid gap-3">

        <input name="age" type="number" placeholder="Age" onChange={handleChange} />

        <select name="sex" onChange={handleChange}>
          <option value="">Sex</option>
          <option value="1">Male</option>
          <option value="0">Female</option>
        </select>

        <select name="cp" onChange={handleChange}>
          <option value="">Chest Pain Type</option>
          <option value="0">Typical Angina</option>
          <option value="1">Atypical Angina</option>
          <option value="2">Non-anginal</option>
          <option value="3">Asymptomatic</option>
        </select>

        <input name="trestbps" type="number" placeholder="Resting BP" onChange={handleChange} />

        <input name="chol" type="number" placeholder="Cholesterol" onChange={handleChange} />

        <select name="fbs" onChange={handleChange}>
          <option value="">Fasting Blood Sugar</option>
          <option value="1">Greater than 120</option>
          <option value="0">Less or equal 120</option>
        </select>

        <select name="restecg" onChange={handleChange}>
          <option value="">Rest ECG</option>
          <option value="0">Normal</option>
          <option value="1">Abnormal</option>
          <option value="2">Hypertrophy</option>
        </select>

        <input name="thalach" type="number" placeholder="Max Heart Rate" onChange={handleChange} />

        <select name="exang" onChange={handleChange}>
          <option value="">Exercise Angina</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <input name="oldpeak" type="number" step="0.1" placeholder="Oldpeak" onChange={handleChange} />

        <select name="slope" onChange={handleChange}>
          <option value="">Slope</option>
          <option value="0">Upsloping</option>
          <option value="1">Flat</option>
          <option value="2">Downsloping</option>
        </select>

        <select name="ca" onChange={handleChange}>
          <option value="">Major Vessels</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <select name="thal" onChange={handleChange}>
          <option value="">Thalassemia</option>
          <option value="1">Normal</option>
          <option value="2">Fixed</option>
          <option value="3">Reversible</option>
        </select>

        <button className="bg-red-600 text-white p-2 rounded">
          Predict
        </button>

        <button type="button" onClick={handleReset} className="bg-gray-400 text-white p-2 rounded">
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

          {/* 🔥 BUTTONS */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button onClick={() => fetchRecommendation("diet")} className="bg-green-500 text-white p-2 rounded">Diet</button>
            <button onClick={() => fetchRecommendation("exercise")} className="bg-blue-500 text-white p-2 rounded">Exercise</button>
            <button onClick={() => fetchRecommendation("lifestyle")} className="bg-purple-500 text-white p-2 rounded">Lifestyle</button>
            <button onClick={() => fetchRecommendation("prevention")} className="bg-red-500 text-white p-2 rounded">Prevention</button>
          </div>

          {/* LOADING */}
          {aiLoading && <p className="mt-3">Generating AI response...</p>}

          {/* RESPONSE */}
          {aiResponse && (
            <div className="mt-4 p-3 border bg-white rounded">
              <h3 className="font-semibold capitalize">{activeType}</h3>
              <p>{aiResponse}</p>
            </div>
          )}

          {/* REPORT */}
          <button
            onClick={async () => {
              const res = await API.post("/reports/ai-report/heart", {
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

export default Heart;