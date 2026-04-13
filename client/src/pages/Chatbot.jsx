import React, { useState } from "react";
import API from "../services/api";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you with your health today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= SEND MESSAGE =================
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await API.post("/chatbot", {
        message: userText,
      });

      // ✅ SAFE PARSE
      let data =
        typeof res.data === "string"
          ? JSON.parse(res.data)
          : res.data;

      let reply = data.reply;

      // ✅ handle unexpected object
      if (typeof reply === "object") {
        reply = reply.reply;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply || "Sorry, I couldn't understand.",
        },
      ]);

    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Server error. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-gray-100 p-4">
      
      <h1 className="text-2xl font-bold mb-4 text-center">
        🏥 AI Health Chatbot
      </h1>

      {/* CHAT */}
      <div className="flex-1 bg-white rounded-xl shadow p-4 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <p className="text-sm text-gray-500">Typing...</p>
        )}
      </div>

      {/* INPUT */}
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your symptoms..."
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
