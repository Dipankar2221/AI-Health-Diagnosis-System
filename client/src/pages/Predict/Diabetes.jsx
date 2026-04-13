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

const Diabetes = () => {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigreeFunction: "",
    age: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // AI States
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
      const { data } = await API.post("/predict/diabetes", formData);
      setResult(data);

      // Reset AI section
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
      pregnancies: "",
      glucose: "",
      bloodPressure: "",
      skinThickness: "",
      insulin: "",
      bmi: "",
      diabetesPedigreeFunction: "",
      age: ""
    });
    setResult(null);
    setAiResponse("");
    setActiveType(null);
  };

  if (loading) return <Loader text="Analyzing Diabetes Risk..." />;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">
        🩸 Diabetes Prediction
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid gap-3">

        <input name="pregnancies" type="number" placeholder="Pregnancies" onChange={handleChange} />

        <input name="glucose" type="number" placeholder="Glucose Level" onChange={handleChange} />

        <input name="bloodPressure" type="number" placeholder="Blood Pressure" onChange={handleChange} />

        <input name="skinThickness" type="number" placeholder="Skin Thickness" onChange={handleChange} />

        <input name="insulin" type="number" placeholder="Insulin" onChange={handleChange} />

        <input name="bmi" type="number" step="0.1" placeholder="BMI" onChange={handleChange} />

        <input name="diabetesPedigreeFunction" type="number" step="0.01" placeholder="Diabetes Pedigree Function" onChange={handleChange} />

        <input name="age" type="number" placeholder="Age" onChange={handleChange} />

        <button className="bg-blue-600 text-white p-2 rounded">
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

          {/* LOADING */}
          {aiLoading && <p className="mt-3">Generating AI response...</p>}

          {/* AI RESPONSE */}
          {aiResponse && (
            <div className="mt-4 p-3 border bg-white rounded">
              <h3 className="font-semibold capitalize">{activeType}</h3>
              <p>{aiResponse}</p>
            </div>
          )}

          {/* DOWNLOAD REPORT */}
          <button
            onClick={async () => {
              const res = await API.post("/reports/ai-report/diabetes", {
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

export default Diabetes;