import express from "express";
import { addtoCarthandler,removefromCarthandler } from "../handlers/cart.mjs";


const Cartrouter = express.Router()

Cartrouter.post('/addtocart',addtoCarthandler);
Cartrouter.post('/removefromcart',removefromCarthandler);




export default Cartrouter;
