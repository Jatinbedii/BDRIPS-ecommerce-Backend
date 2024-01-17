import { generateToken } from "../jwt/jwt.mjs";
import User from "../model/User.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function loginhandler(req,res){
    const{email,password}= req.body;
    if(!email || !password){
       return res.json({error:"Fill all fields"});
    }

    const user = await User.findOne({email});
    if(!user){
        return res.json({error:"Email does not exist"});

    }
    const comparedpass = bcrypt.compareSync(password, user.password);

    if(comparedpass){
    const token = generateToken(user._id);

    return res.status(201).cookie('jwt',token,{ expires: new Date(Date.now() + 24 * 60 * 60 * 1000)}).json(user);

    }else{
        return res.json({error: "Incorrect information"})
    }
}









async function registerhandler(req,res){

    const{name,email,password}= req.body;
    if(!name || !email || !password){
       return res.json({error:"fill all fields"});
    }

    const user = await User.findOne({email});
    if(user){
        return res.json({error:"Email exists"});

    }
    const hash = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
        name,email,password:hash,isAdmin:false
    })

    

    return res.status(201).json(newUser);

}

function getuserinfo(req,res){
    jwt.verify(req.body.jwt,process.env.JWTSECRET,async(err,decoded)=>{
        if(err){
            res.json({error:"Cookie not verified"})
        }else{

            try {
                const {id}= decoded;
                const user = await User.findById(id);
                
                return res.status(201).json(user);
            } catch (error) {
                return res.json({error:error})
            }
            




            
        }
    })
}

export {loginhandler,registerhandler,getuserinfo};