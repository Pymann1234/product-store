import express from 'express';
import dotenv from 'dotenv';
import productRouter from './routes/product.route.js'; // This is const router = express.Router(); in product.route.js
import { connectDB } from './config/db.js';

const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 3000;

app.use("/api/products", productRouter);

app.listen(port, () => {
    connectDB(); // Connect to MongoDB in 
    console.log(`Server started - http://localhost:${port}`);
});
