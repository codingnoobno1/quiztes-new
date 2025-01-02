'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import './login.css'; 

import RegisterPage from './Register';
import LoginPage from './Login';

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(true); 
  const router = useRouter(); 

  const toggleForm = () => {
    setShowLogin(!showLogin); 
  };

  return (
    <div className="container">
      <h1>Welcome to Pixel Quiz Raiderx</h1>

      {}
      <div>
        <button onClick={toggleForm}>
          {showLogin ? 'Go to Register' : 'Go to Login'}
        </button>
      </div>

      {}
      {showLogin ? (
        <div>
          <LoginPage />
        </div>
      ) : (
        <div>
          <RegisterPage />
        </div>
      )}
    </div>
  );
};

export default HomePage;
