import express from "express";
import { getitems ,getsingleitem} from "../handlers/product.mjs";

const Productrouter = express.Router()

Productrouter.get('/products',getitems);
Productrouter.get('/products/:id',getsingleitem);




export default Productrouter;