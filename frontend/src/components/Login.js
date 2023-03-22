import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const styles = {
    form1: {
      margin: "0 auto",
      maxWidth: "400px",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    input1: {
      display: "block",
      width: "100%",
      marginBottom: "10px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    button1: {
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

    axios.post('/api/login', {
      username: username,
      email: email,
      password: password,
    }).then(response => {
      // Handle successful login
      console.log('Sucessfully logged in!')
    }).catch(error => {
      // Handle login error
      console.log('Login error!')
    });
  }

  return (
    <form onSubmit={handleSubmit} className="form1" style={styles.form1}>
      <label>
        Username:
        <input type="username" className='input1' style={styles.input1} value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" className='input1' style={styles.input1} value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" className='input1' style={styles.input1} value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit" className='button1' style={styles.button1}>Login</button>
    </form>
  );
}

export default LoginForm;