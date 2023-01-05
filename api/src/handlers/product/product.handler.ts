import { Request, Response } from 'express';
import { productController } from '../../controllers/product.controller';

const productHandler = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await productController(parseInt(productId));
    if(product){
    res.status(200).json(product);}
    else res.status(400).json({message:'product not found'}) 
  } catch (error) {
    res.status(500).json(error);
  }
};

export default productHandler;
