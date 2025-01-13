import React from 'react';

const ProductList = ({ products, categories, onEdit, onDelete }) => {
  // Fungsi untuk mencari nama kategori berdasarkan ID kategori
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.nama : "Unknown Category"; // Kembalikan nama kategori jika ditemukan
  };

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-3xl font-semibold mb-6">Product List</h2>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-gray-800 border p-4 rounded-lg shadow-md hover:bg-gray-700 transition-all">
            <h3 className="text-xl font-medium">{product.nama}</h3>
            <p className="text-sm">Category: {getCategoryName(product.category_id)}</p> {/* Menampilkan nama kategori */}
            <p className="text-lg text-gray-400">Price: {product.harga}</p>
            <p className="text-sm text-gray-400">Stock: {product.jml_stok}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => onEdit(product)}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(product)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
