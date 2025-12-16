import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './FileUpload.css'; // Assuming you still need this for global styles

const FileUpload = ({ setfunc }) => {
  const [file, setFile] = useState(null);
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Uploading your document...", { autoClose: false });

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setfunc(response.data);
      toast.dismiss(); 
      toast.success("Document Uploaded successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("There was an error summarizing the document.");
      console.error("There was an error uploading the file!", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Upload a Document to Practice</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="file"
          onChange={handleFileChange}
          required
          style={styles.fileInput}
        />
        <button
          type="submit"
          disabled={!file}
          style={styles.button}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

// Inline styles for CTA button and other components
const styles = {
  container: {
    textAlign: 'center',
    margin: '50px auto',
    maxWidth: '600px',
  },
  heading: {
    color: '#1f2937',
    marginBottom: '20px',
    fontSize: '1.5em',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  fileInput: {
    fontSize: '1em',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    color: '#1f2937',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '12px 28px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1em',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
  },
};

export default FileUpload;
