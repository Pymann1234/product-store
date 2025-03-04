import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json(newProduct); // ✅ Return only the product object
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error Creating Products: ", error.message);
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error Fetching Products: ", error.message);
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const products = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No product with that id');
    }

    try {
        // Merge updates instead of replacing the whole document{ new: true } // Return the updated document
        const updatedProduct = await Product.findByIdAndUpdate(id, { $set: products }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No product with that id');
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error Deleting Products: ", error.message);
    }
};