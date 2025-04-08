import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  };

  return (
    <div>
      <h1>Upload a Document to Summarize</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload and Summarize</button>
      </form>
      {summary && (
        <div>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
