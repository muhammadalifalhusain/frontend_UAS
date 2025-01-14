import React from 'react';

const ProductList = ({ products, categories, onEdit, onDelete }) => {
  // Fungsi untuk mencari nama kategori berdasarkan ID kategori
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.nama : "Unknown Category"; // Kembalikan nama kategori jika ditemukan
  };

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-4xl font-semibold mb-8 text-center text-blue-600">Produk</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white border p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-gray-800">{product.nama}</h3>
            <p className="text-sm text-gray-600">Category: {getCategoryName(product.category_id)}</p> {/* Menampilkan nama kategori */}
            <p className="text-lg text-gray-500 mt-2">Price: <span className="font-semibold text-green-600">{product.harga}</span></p>
            <p className="text-sm text-gray-500">Stock: {product.jml_stok}</p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => onEdit(product)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(product)}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300"
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
