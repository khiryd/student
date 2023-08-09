import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [documents, setDocuments] = useState([]);
  const [subjects, setSubjects] = useState(['']);


  const handleAddSubject = () => {
    setSubjects([...subjects, '']);
  };

  const handleRemoveSubject = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);

    documents.forEach((doc) => {
      formData.append('documents[]', doc);
    });

    subjects.forEach((subject) => {
      formData.append('subjects[]', subject);
    });

    
    try {
      await axios.post('http://127.0.0.1:8000/api/register', formData); // Update the URL here
      alert('Registration successful!');
      // Fetch and display student information here
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="App">
      <h1>Student Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Phone:</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <label>Documents:</label>
        <input type="file" multiple onChange={(e) => setDocuments([...e.target.files])} required />

        <label>Subjects:</label>
        {subjects.map((subject, index) => (
          <div key={index}>
            <input
              type="text"
              value={subject}
              onChange={(e) => {
                const updatedSubjects = [...subjects];
                updatedSubjects[index] = e.target.value;
                setSubjects(updatedSubjects);
              }}
              required
            />
            <button type="button" onClick={() => handleRemoveSubject(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddSubject}>
          Add Subject
        </button>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
