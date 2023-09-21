import mongoose from "mongoose";
import connectDB from "./config/DataBase.js";
import dotenv from "dotenv";
import users from "./users.js";
import products from "./products.js";
import User from "./model/userModel.js";
import Product from "./model/productModel.js";
import Order from "./model/orderModel.js";
import Fashion from "./model/fashionTrend.js";

dotenv.config();

connectDB();

// const importData = async () => {
//   try {
//     await Order.deleteMany();
//     await Product.deleteMany();
//     await User.deleteMany();

//     const createdUsers = await User.insertMany(users);

//     const adminUser = createdUsers[0]._id;

//     const sampleProducts = products.map((product) => {
//       return { ...product, user: adminUser };
//     });

//     await Product.insertMany(sampleProducts);

//     console.log("Data Imported!");
//     process.exit();
//   } catch (error) {
//     console.error(`${error}`);
//     process.exit(1);
//   }
// };


const fashionImage = [
  {
    image: 'https://images.pexels.com/photos/242829/pexels-photo-242829.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/242829/pexels-photo-242829.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1374910/pexels-photo-1374910.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/3620411/pexels-photo-3620411.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/2772535/pexels-photo-2772535.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  

  {
    image: 'https://images.pexels.com/photos/18328061/pexels-photo-18328061/free-photo-of-picture-of-the-legs-of-a-man-jumping.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/18337817/pexels-photo-18337817/free-photo-of-young-men-in-trendy-outfits-sitting-on-the-stairs.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/965324/pexels-photo-965324.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/1884579/pexels-photo-1884579.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/5447905/pexels-photo-5447905.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/3782786/pexels-photo-3782786.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/9463359/pexels-photo-9463359.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    image: 'https://images.pexels.com/photos/5214056/pexels-photo-5214056.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
  },
  
  
]

const importFashion = async () => {
  try {
    await Fashion.insertMany(fashionImage)
    console.log('data inserted')
  } catch (error) {
    console.log(err.message)
  }
}

importFashion()

// importData();





