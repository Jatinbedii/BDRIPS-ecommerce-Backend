import Product from "../model/Product.mjs";

async function getitems(req,res){

    const products =await Product.find();

    res.json(products);
}

async function getsingleitem(req,res){
    const {id} = req.params;
    const product= await Product.findOne({_id: id});
    res.json(product);
}
export {getitems,getsingleitem};