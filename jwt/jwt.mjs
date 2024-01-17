import jwt from "jsonwebtoken";

function generateToken(id){
    const token = jwt.sign({id},'jatinbedi',{expiresIn: '1h'});
    return token;
}



function verifytoken(token){
    jwt.verify(token,process.env.JWTSECRET,(err,decoded)=>{
        if(err){
            console.log(err)
        }else{
            return decoded;
        }
    })
}

export {generateToken,verifytoken}