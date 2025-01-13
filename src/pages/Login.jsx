import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { API_URL } from '../config';

const Login = ({ setIsAuthenticated }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem('token', data.token); // Save token to localStorage
      setIsAuthenticated(true);
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <AuthForm type="login" onSubmit={handleLogin} />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default Login;
