import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

const Home = () => {
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah token ada di localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Jika token tidak ada, arahkan ke halaman login
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token dari localStorage
    navigate('/login'); // Arahkan kembali ke halaman login
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        {notification && <Notification message={notification} />}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome to the Dashboard</h1>
        
        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
        
        <div className="mt-8">
          <p className="text-lg text-gray-700 text-center">
            You are logged in. Select from the dashboard to manage your categories and products.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
