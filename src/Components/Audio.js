import React, { useState } from 'react';
import axios from 'axios';

const Audio = () => {

 const [file, setFile] = useState(null);
 const [render, setRender] = useState();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/file/songupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setRender(response.data)
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>Upload Audio</h2>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" onClick={handleSubmit}>Upload</button>
       <h1> <source src={render} type="audio/mp3" /></h1>
      </div>
    </div>
  )
}

export default Audio
