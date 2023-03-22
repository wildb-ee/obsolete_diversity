import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const styles = {
    form2: {
      margin: "0 auto",
      maxWidth: "400px",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    input2: {
      display: "block",
      width: "100%",
      marginBottom: "10px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    button2: {
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
    },
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/register', {
      username: username,
      email: email,
      password: password,
    }, { withCredentials: true }).then(response => {
      // Handle successful registration
      console.log("Successfully registered!")
    }).catch(error => {
      // Handle registration error
      console.log("Register error")
    });
  }

  return (
    <form onSubmit={handleSubmit} className='form2' style={styles.form2}>
      <label>
        Username:
        <input type="text" className='input2' style={styles.input2} value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" className='input2' style={styles.input2} value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" className='input2' style={styles.input2} value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit" className='button2' style={styles.button2}>Register</button>
    </form>
  );
}

export default RegistrationForm;