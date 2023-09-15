import express from "express";
import dotenv from "dotenv";
import productRouter from './routes/productRoutes.js'
import connectDB from "./config/DataBase.js";
import cookieParser from 'cookie-parser'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())
app.use('/api/products', productRouter)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/config/paypal', (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}))

connectDB();

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`server listning to port ${port}`);
});
