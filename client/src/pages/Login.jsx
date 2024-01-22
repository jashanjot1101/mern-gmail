// src/components/Login.js
import React, { useState } from 'react';
import './Login.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Signup from './Signup';
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log('Server Response:', response);
  
      if (!response.ok) {
        setError(data.message);
        return;
      }
  
      // Log the entire data object to inspect its structure
      console.log('Data from server:', data);
  
      // Move the token assignment above its usage
      const { user, token } = data; // Adjust the property path based on the actual structure
      localStorage.setItem('authToken', token);
      
      // Assuming the server responds with user data upon successful login
      if (typeof onLogin === 'function') {
        onLogin(token,user._id);
        
      }
      setError(null);
      console.log('Token is:', token);
        console.log('user id is:',user._id);
  
      // Move the navigation inside the try block to ensure it's executed after a successful login
      navigate('/emails/inbox');
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    }
  };
  

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
      <span><img src="../zillat.png" alt="" /></span>
      <span className="logo">Z Mail </span> 
        <span className="title">Login</span>
      
      <div className='loginform'>
      <input className='loginInput' type="email" value={email} onChange={(e) => setEmail(e.target.value)}placeholder='enter your mail' />
      
      <input className='loginInput' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='enter password'/>
      <button className='loginbtn' onClick={handleLogin}>Login</button>
      <span>Don't have an account ? <Link to='/signup'>Register</Link></span>
      {error && <p style={{ color: 'red' }}>{error}</p>}
     
      </div>
      
    </div>
   
    </div>
    
  );
};

export default Login;
