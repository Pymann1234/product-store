import React, { useState } from "react";
import { useProductStore } from "../store/product";
import Swal from "sweetalert2";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const { createProduct } = useProductStore();

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (isNaN(newProduct.price) || newProduct.price <= 0) {
      Swal.fire({
        title: "Error!",
        text: "Price must be a valid number greater than 0",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setLoading(true);

    const response = await createProduct({
      ...newProduct,
      price: Number(newProduct.price), // Ensure price is a number
    });

    console.log("API Response:", response);

    Swal.fire({
      title: response.success ? "Success!" : "Error!",
      text: response.success ? "Product added successfully!" : response.message || "Something went wrong",
      icon: response.success ? "success" : "error",
      confirmButtonText: "OK",
    });

    if (response.success) {
      setNewProduct({ name: "", price: "", image: "" });
    }

    setLoading(false);
  };

  return (
    <section className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Product</h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            placeholder="Enter Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="button"
          onClick={addProduct}
          disabled={loading}
          className={`w-full py-2 px-4 font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </section>
  );
};

export default CreatePage;