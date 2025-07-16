import { Request, Response } from "express";
import Order from "../database/models/orderModel";
import OrderDetail from "../database/models/orderDetailsModel";
import { OrderStatus, PaymentMethod, PaymentStatus } from "../../globals/types";
import Payment from "../database/models/paymentModel";
import axios from "axios"
import Cart from "../database/models/cartModel";
import Product from "../database/models/productModel";
import Category from "../database/models/categoryModel";

export interface IProduct{
    productId : string
    productQty : number
}

export interface AuthRequest extends Request {
    user? : {
        id : string
    }
}

export interface OrderDataPayment extends Order{
    paymentId : string | null
}

class OrderController {
    static async createOrder(req:AuthRequest,res:Response){
        const userId = req.user?.id;
        const {firstName , lastName , email ,phoneNumber , shippingAddress , totalAmount , paymentMethod} = req.body;
        const products:IProduct[] = req.body.products
    if(!firstName || !lastName || !email || !phoneNumber || !shippingAddress || !totalAmount || products.length == 0 || !paymentMethod) {
        res.status(400).json({
            message : "Please provide firstName , lastName , email , phoneNumber , shippingAddress , totalAmount , products , paymentMethod"
        })
        return
    }


    const paymentData = await Payment.create({
            paymentMethod
    })

    let data;

    
    const orderData = await Order.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        shippingAddress,
        totalAmount,
        userId : userId,
        paymentId : paymentData.id
    })

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
        return
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

    static async fetchMyOrders(req:AuthRequest,res:Response) {
        const userId = req.user?.id;
        const userOrder = await Order.findAll({
            where : {
                userId
            },
            include : [
                {
                    model : Payment,
                    attributes : ["paymentMethod","paymentStatus"]
                }
            ]
        });
        if(userOrder.length == 0) {
            res.status(404).json({
                message : "Order with this user not found !!"
            })
            return
        }
        res.status(200).json({
            message : "Orders fetched successfully",
            data : userOrder
        })
    }

    static async fetchMyOrderDetails(req:AuthRequest,res:Response) {
        const orderId = req.params.id
        const orders = await OrderDetail.findAll({
            where : {
                orderId
            },
            include : [
                {
                    model : Order,
                    include : [
                        {
                            model : Payment,
                            attributes : ["paymentMethod","paymentStatus"]
                        }
                    ],
                    attributes : ["orderStatus","phoneNumber","totalAmount"]
                },
                {
                    model : Product,
                    include : [
                        {
                            model : Category,
                            attributes : ["categoryName"]
                        }
                    ]
                }
            ]
        })
        if(!orders) {
            res.status(400).json({
                message : "No orders found !!"
            })
        }
        else {
            res.status(200).json({
                message : "Order details fetched successfully",
                data : orders
            })
        }
    }

    static async cancelOrder(req:AuthRequest,res:Response) {
        const {id} = req.params;
        if(!id) {
            res.status(400).json({
                message : "Please provide id"
            })
            return
        }
        const userId = req.user?.id;
        const [order] = await Order.findAll({
            where : {
                id,
                userId
            }
        })
        if(!order) {
            res.status(400).json({
                message : "You don't have this order"
            })
            return
        }
        if(order.orderStatus == OrderStatus.Delivered || order.orderStatus == OrderStatus.Ontheway || order.orderStatus == OrderStatus.Preparation) {
            res.status(400).json({
                message : "You cannot change order status now sorry!!"
            })
            return
        }
        await Order.update({orderStatus : OrderStatus.Cancelled},{
            where : {
                id
            }
        })
        res.status(200).json({
            message : "Order status updated successfully !!"
        })
    }

    static async changeOrderStatus(req:AuthRequest,res:Response) {
        const {id} = req.params;
        if(!id) {
            res.status(400).json({
                message : "Please provide id !!"
            })
            return
        }
        const {orderStatus} = req.body;
        if(!orderStatus) {
            res.status(400).json({
                message : "Please provide order status"
            })
            return 
        }
        const [order] = await Order.findAll({
            where : {
                id
            }
        })
        if(!order) {
            res.status(400).json({
                message : "Order with this id doesn't exists !!"
            })
            return
        }
        order.orderStatus = orderStatus
        await order.save();

        res.status(200).json({
            message : "Order status changed successfully !!"
        })
    }

    static async deleteOrder(req:AuthRequest,res:Response) {
        const {id} = req.params;
        if(!id) {
            res.status(400).json({
                message : "Please provide id !!"
            })
            return
        }
        const order : OrderDataPayment = await Order.findByPk(id) as OrderDataPayment
        const paymentId = order.paymentId
        if(!order) {
            res.status(400).json({
                message : "You don't have this order !!"
            })
            return
        }
        await OrderDetail.destroy({
            where : {
                orderId : id
            }
        })
        await Order.destroy({
            where : {
                id
            }
        })
        await Payment.destroy({
            where : {
                id : paymentId
            }
        })
        res.status(200).json({
            message : "Order deleted successfully!!"
        })
    }

    static async fetchAllOrders(req:AuthRequest,res:Response) {
        const orderExists = await Order.findAll();
        if(orderExists.length == 0) {
            res.status(404).json({
                message : "Order not found !!"
            })
            return
        }

        res.status(200).json({
            message : "Order fetched successfully !!",
            data : orderExists
        })
    }
}

export default OrderController