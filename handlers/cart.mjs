import jwt from "jsonwebtoken";
import User from "../model/User.mjs";

async function addtoCarthandler(req, res) {
  const { price, productid } = req.body;

  jwt.verify(req.body.jwt, process.env.JWTSECRET, async (err, decoded) => {
    if (err) {
      console.log(err);
      res.json({ error: 'Internal Server Error' });
    } else {
      try {
        const { id } = decoded;
        const user = await User.findById(id);

        
        const existingProductIndex = user.cart.findIndex(
          (item) => item.productid === productid
        );

        if (existingProductIndex !== -1) {
         
          user.cart[existingProductIndex].quantity += 1;
        } else {
          
          user.cart.push({ productid, price, quantity: 1 });
        }

        await user.save();
        return res.status(201).json({ done: "added to cart" });
      } catch (error) {
        console.error(error);
        return res.json({ error: 'Internal Server Error' });
      }
    }
  });
}


async function removefromCarthandler(req,res){

  const {id}= req.body;
  

  if(id && jwt){
    const productid=id;

    jwt.verify(req.body.jwt, process.env.JWTSECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status.json({ error: 'Internal Server Error' });
      } else {
        try {

          
          const { id } = decoded;
          const user = await User.findById(id);
          
          const existingProductIndex = user.cart.findIndex(
            (item) => item.productid === productid
          );

          if(existingProductIndex==-1){
            return res.json({error:"item doesnot exist"})
          }else{
            user.cart[existingProductIndex].quantity -= 1;
            if(user.cart[existingProductIndex].quantity==0){
              user.cart.splice(existingProductIndex,1);
            }
            await user.save();
            return res.status(201).json({ done: "removed from cart" });

          }

          
          
  
          

        } catch (error) {
          console.log(error);
          return res.json({ error: 'Internal Server Error' });
        }
      }
    });



  }else{
    console.log("some error")
  }

}
export { addtoCarthandler ,removefromCarthandler};