import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await fetchProducts();
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.log("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  });

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex flex-col items-center space-y-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center">
          Current Products 🚀
        </h2>

        {loading ? (
          <p className="text-xl text-gray-600 font-semibold">
            Loading products...
          </p>
        ) : error ? (
          <p className="text-xl text-red-500 font-semibold">{error}</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-xl text-center font-bold text-gray-500">
            No products found 😢{" "}
            <Link to="/create" className="text-blue-500 hover:underline">
              Create a product
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
