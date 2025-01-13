import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList'; // Pastikan ini diimport
import { API_URL } from '../config';
import Modal from '../components/Modal'; // Modal untuk menambah produk
import Notification from '../components/Notification'; // Notifikasi

const Dashboard = ({ setIsAuthenticated }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Tambahkan untuk modal edit
  const [editProduct, setEditProduct] = useState(null); // Simpan produk yang sedang diedit
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${API_URL}/categories`);
      const data = await res.json();
      setCategories(data); // Menyimpan data kategori
    };

    const fetchProducts = async () => {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      setProducts(data); // Menyimpan data produk
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    const res = await fetch(`${API_URL}/products?category_id=${categoryId}`);
    const data = await res.json();
    setProducts(data);
  };

  const handleAddProduct = async (newProduct) => {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newProduct),
    });

    if (res.status === 201) {
      setNotification('Product added successfully');
      setShowAddModal(false);
      // Refresh products after adding
      const updatedProducts = await fetch(`${API_URL}/products`);
      const data = await updatedProducts.json();
      setProducts(data);
    } else {
      setNotification('Failed to add product');
    }
  };

  // Fungsi untuk mengedit produk
  const handleEditProduct = (product) => {
    setEditProduct(product); // Menyimpan produk yang sedang diedit
    setShowEditModal(true); // Tampilkan modal edit
  };

  // Fungsi untuk mengupdate produk
  const handleUpdateProduct = async (updatedProduct) => {
    const res = await fetch(`${API_URL}/products/${updatedProduct._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedProduct),
    });

    if (res.status === 200) {
      setNotification('Product updated successfully');
      setShowEditModal(false);
      // Refresh products after updating
      const updatedProducts = await fetch(`${API_URL}/products`);
      const data = await updatedProducts.json();
      setProducts(data);
    } else {
      setNotification('Failed to update product');
    }
  };

  // Fungsi untuk menghapus produk
  const handleDeleteProduct = async (product) => {
    const res = await fetch(`${API_URL}/products/${product._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.status === 200) {
      setNotification('Product deleted successfully');
      // Refresh products after deleting
      setProducts(products.filter((prod) => prod._id !== product._id));
    } else {
      setNotification('Failed to delete product');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {notification && <Notification message={notification} />}
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-10 text-center">Dashboard</h1>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded-md absolute top-4 right-4"
        >
          Logout
        </button>

        {/* Category Dropdown */}
        <div className="mt-6 mb-4">
          <label className="block text-sm font-medium text-white">Select Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="mt-2 w-full p-3 border rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.nama}
              </option>
            ))}
          </select>
        </div>

        {/* Product List */}
        <div className="mt-6">
          <ProductList
            products={products}
            categories={categories} // Passing categories to ProductList
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </div>

        {/* Add Product Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-6 bg-blue-500 text-white p-2 rounded-md"
        >
          Add Product
        </button>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <Modal
          title="Add Product"
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddProduct}
          categories={categories} // Pass categories to modal
        />
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <Modal
          title="Edit Product"
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdateProduct}
          initialValues={editProduct} // Pass product data to modal
          categories={categories}
        />
      )}
    </div>
  );
};

export default Dashboard;
