import { useState } from 'react';

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto p-8 space-y-6 bg-gradient-to-r from-blue-100 via-white to-blue-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-700 text-center">
        {type === 'login' ? 'Login' : 'Create Account'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md focus:outline-none hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg">
          {type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      {type === 'login' && (
        <div className="text-center text-gray-500">
          <p className="text-sm">Tidak punya akun? <a href="/register" className="text-blue-600 hover:text-blue-400">Sign Up</a></p>
        </div>
      )}

      {type === 'register' && (
        <div className="text-center text-gray-500">
          <p className="text-sm">Already have an account? <a href="/login" className="text-blue-600 hover:text-blue-400">Log In</a></p>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
