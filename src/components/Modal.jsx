import { useState, useEffect } from 'react';

const Modal = ({ title, onClose, onSubmit, initialValues, categories }) => {
  const [formData, setFormData] = useState({
    nama: '',
    category_id: '',
    harga: '',
    jml_stok: '',
    ...initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        ...initialValues,
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-black p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-2xl font-semibold mb-6 text-center text-white">{title}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-white">Product Name</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="mt-2 w-full p-3 border rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white">Kategori</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="mt-2 w-full p-3 border rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {/* Populate dropdown with categories */}
              {categories && categories.length > 0 && categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.nama}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-white">Price</label>
            <input
              type="number"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              className="mt-2 w-full p-3 border rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-white">Stock</label>
            <input
              type="number"
              name="jml_stok"
              value={formData.jml_stok}
              onChange={handleChange}
              className="mt-2 w-full p-3 border rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 p-3 rounded-md hover:bg-gray-400 transition-all"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
