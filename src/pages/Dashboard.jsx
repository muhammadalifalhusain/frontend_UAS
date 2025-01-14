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
  const [showEditModal, setShowEditModal] = useState(false); // Modal untuk edit produk
  const [editProduct, setEditProduct] = useState(null); // Simpan produk yang sedang diedit
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false); // Modal untuk menambah kategori
  const [showCategoryList, setShowCategoryList] = useState(false); // Menampilkan daftar kategori untuk edit
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false); // Modal untuk mengedit kategori
  const [newCategoryName, setNewCategoryName] = useState(''); // Nama kategori baru
  const [editCategory, setEditCategory] = useState(null); // Kategori yang sedang diedit
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

  // Fungsi untuk menambahkan kategori baru
  const handleAddCategory = async () => {
    const newCategory = { nama: newCategoryName };
    const res = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newCategory),
    });

    if (res.status === 201) {
      setNotification('Category added successfully');
      setShowAddCategoryModal(false);
      // Refresh categories after adding
      const updatedCategories = await fetch(`${API_URL}/categories`);
      const data = await updatedCategories.json();
      setCategories(data);
    } else {
      setNotification('Failed to add category');
    }
  };

  // Fungsi untuk menampilkan modal edit kategori
  const handleEditCategory = (category) => {
    setEditCategory(category); // Menyimpan kategori yang sedang diedit
    setNewCategoryName(category.nama); // Menyimpan nama kategori untuk diubah
    setShowEditCategoryModal(true); // Tampilkan modal edit kategori
  };

  // Fungsi untuk mengupdate kategori
  const handleUpdateCategory = async () => {
    const updatedCategory = { nama: newCategoryName };
    const res = await fetch(`${API_URL}/categories/${editCategory._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedCategory),
    });

    if (res.status === 200) {
      setNotification('Category updated successfully');
      setShowEditCategoryModal(false);
      // Refresh categories after updating
      const updatedCategories = await fetch(`${API_URL}/categories`);
      const data = await updatedCategories.json();
      setCategories(data);
    } else {
      setNotification('Failed to update category');
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
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white">
      {notification && <Notification message={notification} />}
      <div className="container mx-auto py-10">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">KelolaProduk</h1>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300 absolute top-6 right-6"
        >
          Logout
        </button>

        {/* Category Dropdown */}
        <div className="mt-8 mb-6">
          <label className="block text-md font-semibold text-white">Select Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.nama}
              </option>
            ))}
          </select>
        </div>

        {/* Add Category Button */}
        <button
          onClick={() => setShowAddCategoryModal(true)}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-400 transition duration-300"
        >
          +Kategori
        </button>

        {/* Edit Category Button */}
        <button
          onClick={() => setShowCategoryList(!showCategoryList)}
          className="ml-4 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-400 transition duration-300"
        >
          {showCategoryList ? 'Hide Categories' : 'Edit Kategori'}
        </button>

        {/* Show Category List for Editing */}
        {showCategoryList && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Choose a Category to Edit</h3>
            {categories.map((category) => (
              <div key={category._id} className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
                <p className="text-white">{category.nama}</p>
                <button
                  onClick={() => handleEditCategory(category)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 transition duration-300"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Product List */}
        <div className="mt-8">
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
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 transition duration-300"
        >
          +AddProduk
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

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium mb-4 text-white">Add New Category</h3>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="mt-2 w-full p-3 border rounded-md bg-black text-white"
              placeholder="Category Name"
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-400 transition duration-300"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditCategoryModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium mb-4 text-white">Edit Kategori</h3>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="mt-2 w-full p-3 border rounded-md bg-black text-white"
              placeholder="Category Name"
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setShowEditCategoryModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCategory}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-400 transition duration-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
