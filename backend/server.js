import express from "express";
import dotenv from "dotenv";
import products from "./products.js";
import productRouter from './routes/productRoutes.js'
import connectDB from "./config/DataBase.js";
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.use('/api/products', productRouter)

connectDB();

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`server listning to port ${port}`);
});
