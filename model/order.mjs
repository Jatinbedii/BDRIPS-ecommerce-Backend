import mongoose from "mongoose";
import { Schema } from "mongoose";
const orders = new Schema({
    productid: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
});


const orderSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    items: {
        type :[orders]
        
    },
      paymentid: {
        type:String,
        default: "no"
      }
    
  },{
    timestamps: true
  });
  


const Order = mongoose.model('Order', orderSchema);

export default Order