import jwt from "jsonwebtoken";
import User from "../model/User.mjs";
import Order from "../model/order.mjs";
import Razorpay from "razorpay"
function COD(req,res){
    const {name,address,pincode,price,contact,type,paymentid}= req.body;

    if(!name || !address || !pincode || !price || !contact){
      return  res.json({error:"fill all fields"})
    }

    jwt.verify(req.body.jwt,process.env.JWTSECRET,async(err,decoded)=>{
        if(err){
            res.json({error:"Cookie not verified"})
        }else{

            try {
                const {id}= decoded;
                const user = await User.findById(id);
                const order =await Order.create({id,price,name,address,pincode,contact,items:user.cart,type,paymentid});

                if(order){
                return res.status(201).json(order);}else{
                    return res.json({error:"internal error"})
                }
            } catch (error) {
                return res.json({error:error})
            }
            




            
        }
    })

    
}

async function allorders(req,res){
    const orders =await Order.find();
    res.json(orders);
}

function createorder(req,res){
    var instance = new Razorpay({ key_id: process.env.RAZORID, key_secret: process.env.RAZORSECRET })

    var options = {
      amount: (req.body.price * 100), 
      currency: "INR",
      receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function(err, order) {
      if(order){
        res.status(201).json(order);
      }else{
        res.json(err);
      }
    });
}





export {COD,allorders,createorder}