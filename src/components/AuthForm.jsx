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
    <div className="max-w-md mx-auto p-8 space-y-6">
      <h2 className="text-3xl font-bold text-gray-200 text-center">
        {type === 'login' ? 'Login to GrayMatter' : 'Create Your GrayMatter Account'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md focus:outline-none hover:bg-blue-700 transition duration-200">
          {type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      {type === 'login' && (
        <div className="text-center text-gray-400">
          <p className="text-sm">Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-300">Sign Up</a></p>
        </div>
      )}

      {type === 'register' && (
        <div className="text-center text-gray-400">
          <p className="text-sm">Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-300">Log In</a></p>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
