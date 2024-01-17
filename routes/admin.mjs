import express from "express";
import { additemhandler } from "../handlers/admin.mjs";


const adminRouter= express.Router();


adminRouter.post('/additem',additemhandler)

export {adminRouter};