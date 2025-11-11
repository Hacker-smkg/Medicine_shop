
import Product from "../schema/product.js";

const addProduct=async(req,res)=>{
    try{
        const newProduct=new Product(req.body);
        await newProduct.save()
        res.status(200).json({
            success:true,
            massage:"Product add Successfully!"
        })
    }
    catch(error){
res.status(500).json({message:error.message})
    }
}
export { addProduct };
