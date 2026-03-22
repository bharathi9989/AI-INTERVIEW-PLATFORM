import { useState } from "react";
import API from "../api/axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await API.post("/resume/upload", formData);

      setQuestions(res.data.data.questions);
    } catch (error) {
      console.log(error);
      alert("Upload failed");
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

      {/* Questions */}
      <div className="mt-6">
        {questions.map((q, index) => (
          <div key={index} className="mb-3 p-3 border rounded">
            <p>{q.question}</p>
            <small>
              {q.type} | {q.difficulty}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upload;
