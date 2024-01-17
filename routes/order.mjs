import express from "express";
import { COD, allorders, createorder} from "../handlers/order.mjs";


const Orderrouter = express.Router()

Orderrouter.post('/cod',COD);
Orderrouter.get('/allorders',allorders);
Orderrouter.post('/createorder',createorder);





export default Orderrouter;
