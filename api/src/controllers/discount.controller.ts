import { Discount } from "../models/discount.model";

const discountController = async ()=>{
    return await Discount.findAll({raw:true,attributes:['discountId', 'name']})
}

export default discountController;