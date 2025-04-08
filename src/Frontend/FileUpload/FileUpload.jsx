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
      const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
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
    color: '#fff',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  fileInput: {
    fontSize: '1em',
    padding: '10px',
    border: '1px solid #fff',  // Blue border
    borderRadius: '8px',
    color: '#03a9f4',  // White text color
    backgroundColor: '#333',  // Black background
  },
  button: {
    backgroundColor: '#03a9f4',
    color: 'black',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:disabled': {
      backgroundColor: '#ddd',
      cursor: 'not-allowed',
    },
    '&:hover': {
      backgroundColor: '#0288d1',
    },
  },
};

export default FileUpload;
