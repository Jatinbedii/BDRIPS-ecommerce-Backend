import Product from "../model/Product.mjs"
async function additemhandler(req,res){
    const{name,category,description,image,price}=req.body;

    if(!name || !category || !description ||  !image || !price){
        return res.json({error:"fill all fields"})
    }


    const product = await Product.create({
        name,category, description,image,price,inStock:true
    })

    res.status(201).json(product);


    
}
export {additemhandler};