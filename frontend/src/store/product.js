import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json();
      if (!Array.isArray(data)) {
        console.error("Unexpected API response format:", data);
        return;
      }

      set({ products: data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) return { success: false, message: "Failed to create product" };

      const data = await res.json();
      if (!data || typeof data !== "object" || !data._id) {
        console.error("Invalid API response format:", data);
        return { success: false, message: "Invalid API response format" };
      }

      set((state) => ({ products: [...state.products, data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Error creating product:", error);
      return { success: false, message: "An error occurred" };
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, { method: "DELETE" });

      if (!res.ok) return { success: false, message: "Failed to delete product" };

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "An error occurred" };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) return { success: false, message: "Failed to update product" };

      const responseData = await res.json();
      if (!responseData || typeof responseData !== "object" || !responseData.data || !responseData.data._id) {
        console.error("Invalid API response format:", responseData);
        return { success: false, message: "Invalid API response format" };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? responseData.data : product
        ),
      }));

      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: "An error occurred" };
    }
  },
}));