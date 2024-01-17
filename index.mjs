import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import Authrouter from "./routes/auth.mjs";
import cors from "cors";
import { adminRouter } from "./routes/admin.mjs";
import Productrouter from "./routes/product.mjs";
import Cartrouter from "./routes/cart.mjs";
import Orderrouter from "./routes/order.mjs";
const app = express();
app.use(express.json());
app.use(cors({ credentials: true ,origin: process.env.FRONTEND, }));
app.get('/',(req,res)=>{
    res.json({working:"working"})
})




app.use('/api',Authrouter);
app.use('/api',adminRouter);
app.use('/api',Productrouter);
app.use('/api',Cartrouter);
app.use('/api',Orderrouter)
app.use(express.json({ extended: false }));



mongoose.connect(process.env.MONGODBURL).then(()=>{
    console.log("connected to DB")
}).catch(err=>console.log(err));
app.listen(process.env.PORT,()=>{
    console.log("server is running");
})