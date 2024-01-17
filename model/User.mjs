import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartitemSchema = new Schema({
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

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  cart: {
    type: [cartitemSchema],
    default: []
  }
});


const User = mongoose.model('User', userSchema);

export default User;