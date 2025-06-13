import { Response } from "express";
import { AuthRequest } from "./orderController";
import Cart from "../database/models/cartModel";
import Product from "../database/models/productModel";

class CartController{
    static async addToCart(req:AuthRequest , res : Response) {
        const userId = req.user?.id;
        const {productId , quantity} = req.body;
        if(!productId || !quantity) {
            res.status(400).json({
                message : "Please provide productId & quantity"
            })
            return
        }
        const userProductAlreadyAdddedToCart = await Cart.findOne({
            where : {
                productId,
                userId
            }
        })
        if(userProductAlreadyAdddedToCart) {
            userProductAlreadyAdddedToCart.quantity =+ quantity;
            await userProductAlreadyAdddedToCart.save()
        }
        else {
            var cart = await Cart.create({
                userId,
                productId,
                quantity
            })
        }
        res.status(200).json({
            message : "Product added to cart successfully"
        })
    }

    static async getAllCarts(req:AuthRequest,res:Response) {
        const cart = await Cart.findAll();

        if(cart.length == 0) {
            res.status(400).json({
                message : "No cart items found !!"
            })
        }
        else {
            res.status(200).json({
                message : "Cart fetched successfully",
                data : cart
            })
        }
    }

    static async getMyCartItems(req:AuthRequest,res:Response) {
        const userId = req.user?.id;
        const cart = await Cart.findAll({
            where : {
                userId
            },
            include : [
                {
                    model : Product,
                    attributes : ['id','productName' , 'productPrice' ,'productImage']
                }
            ]
        })
        if(cart.length == 0) {
            res.status(400).json({
                message : 'Cart Items not found !!'
            })
        }
        else {
            res.status(200).json({
                message : "Cart fetched successfully",
                data : cart
            })
        }
    }

    static async deleteMyCart(req:AuthRequest,res:Response) {
        const userId = req.user?.id;
        const {productId} = req.params;
        if(!productId) {
            res.status(400).json({
                message : "Please provide product id"
            })
            return
        }
        const productExists = await Product.findByPk(productId)
        if(!productExists) {
            res.status(400).json({
                message : "Product doesnot exists !!"
            })
            return
        }
        const cartExists = await Cart.findOne({
            where : {
                userId,
                productId
            }
        })
        if(!cartExists) {
            res.status(400).json({
                message : "No cart found !!"
            })
            return
        }
        await Cart.destroy({
            where : {
                userId
            }
        })
        res.status(200).json({
            message : 'Cart item deleted successfully'
        })
    }

    static async updateCartItem(req:AuthRequest,res:Response) {
        const userId = req.user?.id;
        const {productId} = req.params;
        const {quantity} = req.body;
        if(!quantity) {
            res.status(400).json({
                message : "Please provide quantity"
            })
            return
        }
        if(!productId) {
            res.status(400).json({
                message : "Provide product id"
            })
            return
        }
        const cartItem = await Cart.findOne({
            where : {
                userId,
                productId
            }
        })
        if(!cartItem) {
            res.status(400).json({
                message : 'No cart found !!'
            })
        }
        else {
            cartItem.quantity = quantity;
            await cartItem.save()
            res.status(200).json({
                message : "Cart updated successfully",
                data : cartItem
            })
        }
    }
}

export default CartController