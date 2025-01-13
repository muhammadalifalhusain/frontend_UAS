import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { API_URL } from '../config';

const Register = () => {
  const handleRegister = async (credentials) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    console.log('Register response:', data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  );
};

export default Register;
