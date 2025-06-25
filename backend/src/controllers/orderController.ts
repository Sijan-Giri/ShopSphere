import { Request, Response } from "express";
import Order from "../database/models/orderModel";
import OrderDetail from "../database/models/orderDetailsModel";
import { PaymentMethod, PaymentStatus } from "../../globals/types";
import Payment from "../database/models/paymentModel";
import axios from "axios"
import Cart from "../database/models/cartModel";

export interface IProduct{
    productId : string
    productQty : number
}

export interface AuthRequest extends Request {
    user? : {
        id : string
    }
}

class OrderController {
    static async createOrder(req:AuthRequest,res:Response){
        const userId = req.user?.id;
        const {firstName , lastName , email ,phoneNumber , shippingAddress , totalAmount , paymentMethod} = req.body;
        const products:IProduct[] = req.body.products
    if(!firstName || !lastName || !email || !phoneNumber || !shippingAddress || !totalAmount || products.length == 0 || !paymentMethod) {
        res.status(400).json({
            message : "Please provide firstName , lastName , email phoneNumber , shippingAddress , totalAmount , products , paymentMethod"
        })
        return
    }

    const orderData = await Order.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        shippingAddress,
        totalAmount,
        userId : userId
    })

    let data;

    products.forEach(async(product) => {
        data = await OrderDetail.create({
            quantity : product.productQty,
            productId : product.productId,
            orderId : orderData.id,
            userId : userId
        })
        await Cart.destroy({
            where : {
                userId,
                productId : product.productId
            }
        })
    })

    const paymentData = await Payment.create({
            paymentMethod,
            orderId : orderData.id
    })

    if(paymentMethod == PaymentMethod.Khalti) {
        //khalti logic
        const data = {
            return_url : "http://localhost:5173/",
            website_url : "http://localhost:5173/",
            amount : totalAmount * 100,
            purchase_order_id : orderData.id,
            purchase_order_name : `order_${orderData.id}`
        }
        const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/",data,{
            headers : {
                Authorization : "Key aacb5cd4c70f4cac9f8b252fdf2d8e46"
            }
        });
        paymentData.pidx = response.data.pidx;
        await paymentData.save();


        res.status(200).json({
            message : "Order created successfully !!",
            url : response.data.payment_url,
            pidx : response.data.pidx,
            data
        })
    }
    res.status(200).json({
        message : "Order created successfully",
        data
    })
    }

    static async verifyTransaction(req:AuthRequest,res:Response) {
        const {pidx} = req.body;
        if(!pidx) {
            res.status(400).json({
                message : "Please provide pidx"
            })
            return
        }
        const response = await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/",{pidx} ,{
            headers : {
                Authorization : "Key aacb5cd4c70f4cac9f8b252fdf2d8e46"
            }
        })
        
        if(response.data.status === "Completed") {
            await Payment.update({paymentStatus : PaymentStatus.Paid},{
                where : {
                    pidx : pidx
                }
            })
            res.status(200).json({
                message : "Payment Verified !!"
            })
        }
        else if(response.data.status === "Pending") {
            res.status(200).json({
                message : "Payment is pending !!"
            })
        }
        else if(response.data.status === "Initiated") {
            res.status(200).json({
                message : "Payment initiated !!"
            })
        }
        else if(response.data.status === "Refunded") {
            res.status(200).json({
                message : "Payment refunded !!"
            })
        }
        else if(response.data.status === "Expired") {
            res.status(200).json({
                message : "Payment expired !!"
            })
        }
        else if(response.data.status === "User canceled") {
            res.status(200).json({
                message : "Payment canceled by user !!"
            })
        }
    }
}

export default OrderController