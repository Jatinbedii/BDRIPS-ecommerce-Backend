import express from "express";
import {getuserinfo, loginhandler,registerhandler} from "../handlers/auth.mjs"
const Authrouter = express.Router()

Authrouter.post('/register',registerhandler);

Authrouter.post('/login',loginhandler);

Authrouter.post('/user',getuserinfo);




export default Authrouter;