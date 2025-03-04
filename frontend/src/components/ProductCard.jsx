import React, { useState } from "react";
import { useProductStore } from "../store/product";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { deleteProduct, updateProduct, products, setProducts } =
    useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    Swal.fire({
      title: success ? "Success!" : "Error!",
      text: success ? "Product deleted successfully" : message,
      icon: success ? "success" : "error",
      confirmButtonText: "OK",
    });
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (success) {
      setProducts(
        products.map((product) =>
          product._id === pid ? updatedProduct : product
        )
      );
      setIsModalOpen(false);
    }
    Swal.fire({
      title: success ? "Success!" : "Error!",
      text: success ? "Product updated successfully" : message,
      icon: success ? "success" : "error",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="border p-4 rounded-lg shadow-md transition-transform transform hover:translate-y-1 hover:shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-bold mt-4">{product.name}</h3>
      <p className="text-gray-500">${product.price}</p>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDeleteProduct(product._id)}
          className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          <FaTrash />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                placeholder="Price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
