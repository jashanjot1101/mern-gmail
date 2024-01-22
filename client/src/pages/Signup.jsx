// src/components/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  const handleSignup = async () => {
    try {
      // Make the fetch request without the Authorization header first
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
    console.log('server Response:',response);

      if (!response.ok) {
        setError(data.message);
        return;
      }
      console.log('Data from server:',data);
  
      // Move the token assignment above the usage in headers
      const token = data;
      localStorage.setItem('authToken',token);
  
      // Make a second fetch request with the Authorization header
     
  
      
  
      // Assuming the server responds with a success message upon successful signup
      if (typeof onSignup === 'function') {
        onSignup(token);
        console.log('Token is:',data.token)
      }
      setError(null);
      console.log('Token is:',token);
      
      navigate('/emails/inbox');
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred during signup');
    }
    
  };
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
      <span><img src="../zillat.png" alt="" /></span>
      <span className="logo">Z Mail </span> 
        <span className="title">Register</span>
        <div className='loginform'>
      <input className='loginInput' type="email" value={email} placeholder='enter your mail' onChange={(e) => setEmail(e.target.value)} />
      
      <input className='loginInput' type="password" value={password} placeholder='enter password' onChange={(e) => setPassword(e.target.value)} />
      <button className='loginbtn' onClick={handleSignup}>Signup</button>
      <span>Already have an account ? <Link to='/login'>Login</Link></span>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
    </div>
  );
};

export default Signup;
