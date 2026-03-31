import { useState } from "react";
import API from "../api/axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await API.post("/resume/upload", formData);

      const questions = res.data.data.questions;
      const aiAnswers = res.data.data.answers; // 🔥 IMPORTANT

      setQuestions(questions);

      // 🔥 AUTO FILL ANSWERS
      const formattedAnswers = {};
      aiAnswers.forEach((ans, index) => {
        formattedAnswers[index] = ans;
      });

      setAnswers(formattedAnswers);
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    }
  };
  const handleAnswerChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleEvaluate = async () => {
    const qaList = questions.map((q, index) => ({
      question: q.question,
      answer: answers[index] || "",
    }));

    try {
      const res = await API.post("/interview/evaluate-batch", {
        qaList,
      });

      setResults(res.data.data.results);
    } catch (error) {
      console.log(error);
      alert("Evaluation failed");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-xl mb-4">Upload Resume</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2"
      >
        Upload
      </button>

      {/* Questions + Answer */}
      <div className="mt-6">
        {questions.map((q, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <p className="font-semibold">{q.question}</p>

            <textarea
              className="border w-full p-2 mt-2"
              value={answers[index] || ""}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />

            {/* Show Result */}
            {results[index] && (
              <div className="mt-2 bg-gray-100 p-2 rounded text-sm">
                <p>Score: {results[index].score}/10</p>
                <p>{results[index].feedback}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Evaluate Button */}
      {questions.length > 0 && (
        <button
          onClick={handleEvaluate}
          className="bg-blue-500 text-white px-4 py-2 mt-4"
        >
          Evaluate Answers
        </button>
      )}
    </div>
  );
};

export default Upload;
