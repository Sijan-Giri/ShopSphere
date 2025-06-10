import { Request, Response } from "express";
import Order from "../database/models/orderModel";
import OrderDetail from "../database/models/orderDetailsModel";
import { PaymentMethod } from "../../globals/types";
import Payment from "../database/models/payment";

export interface IProduct{
    productId : string
    productQty : string
}

interface AuthRequest extends Request {
    user? : {
        id : string
    }
}

class OrderController {
    static async createOrder(req:AuthRequest,res:Response){
        const userId = req.user?.id;
        const {phoneNumber , shippingAddress , totalAmount , paymentMethod} = req.body;
        const products:IProduct[] = req.body.products
    if(!phoneNumber || !shippingAddress || !totalAmount || products.length == 0) {
        res.status(400).json({
            message : "Please provide phoneNumber , shippingAddress , totalAmount , products"
        })
        return
    }

    const orderData = await Order.create({
        phoneNumber,
        shippingAddress,
        totalAmount,
        userId : userId
    })

    products.forEach(async(product) => {
        await OrderDetail.create({
            quantity : product.productQty,
            productId : product.productId,
            orderId : orderData.id,
            userId : userId
        })
    })

    if(paymentMethod == PaymentMethod.Khalti) {
        //khalti logic
    }
    else {
        await Payment.create({
            paymentMethod,
            orderId : orderData.id
        })
    }

    res.status(200).json({
        message : "Order created successfully !!"
    })

    }
}

export default OrderController