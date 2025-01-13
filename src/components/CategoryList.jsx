import { useEffect, useState } from 'react';
import { API_URL } from '../config';



const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${API_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-3xl font-semibold mb-6">Category List</h2>
      <div className="grid grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category._id} className="border p-4 rounded-lg shadow-md hover:bg-gray-100 transition-all">
            <h3 className="text-xl font-medium">{category.nama}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
