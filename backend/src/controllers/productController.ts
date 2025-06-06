import { Request, Response } from "express";
import Product from "../database/models/productModel";
import Category from "../database/models/categoryModel";

interface ProductData extends Request{
    file? : Express.Multer.File
}

class ProductController {
    static async createProduct(req:ProductData,res:Response){
        const {productName , productDescription , productPrice , productStockQty , productDiscount , categoryId} = req.body;
        const productImage = req.file ? req.file.filename : "https://imgs.search.brave.com/vmALrai4jbGqgkctmp3YG72pQAyqEKwNdq82U0wG2kI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzExLzA3LzU5LzE4/LzM2MF9GXzExMDc1/OTE4MDRfZURSMnVa/VFVDZ0U2bzlzOU90/c1NiN1M0M0hGUnpk/V3QuanBn";
        if(!productName || !productDescription || !productPrice || !productStockQty || !categoryId) {
            res.status(400).json({
                message : "Please provide productName , productDescription , productDiscount , productPrice , productStockQty , categoryId"
            })
            return
        }
        const product = await Product.create({
            productName ,
            productDescription ,
            productPrice ,
            productStockQty ,
            productDiscount : productDiscount || 0 ,
            categoryId,
            productImage
        })
        res.status(200).json({
            message : "Product created successfully",
            data : product
        })
    }
    static async getAllProducts(req:ProductData,res:Response) {
        const products = await Product.findAll({
            include : [
                {
                    model : Category
                }
            ]
        });
        if(products.length == 0) {
            res.status(400).json({
                message : "No products found !!"
            })
            return
        }
        res.status(200).json({
            message : "Products fetched successfully",
            data : products
        })
    }

    static async getSingleProduct(req:ProductData,res:Response) {
        const {id} = req.params;
        if(!id) {
            res.status(400).json({
                message : 'Please provide an id'
            })
            return
        }
        const productExists = await Product.findByPk(id);
        if(productExists) {
            res.status(400).json({
                message : "Product with this id doesn't exists !!"
            })
            return
        }
        const product = await Product.findAll({
            where : {
                id
            },
            include : [
                {
                    model : Category
                }
            ]
        })
        res.status(200).json({
            message : "Product fetched successfully",
            data : product
        })
    }

    static async deleteProduct(req:ProductData,res:Response){
        const {id} = req.params;
        if(!id) {
            res.status(400).json({
                message : 'Please provide an id'
            })
            return
        }
        const productExists = await Product.findByPk(id);
        if(productExists) {
            res.status(400).json({
                message : "Product with this id doesn't exists !!"
            })
            return
        }
        await Product.destroy({
            where : {
                id
            }
        })
        res.status(200).json({
            message : "Product deleted successfully !!"
        })
    }

    static async updateProduct(req:ProductData,res:Response) {
        const {id} = req.params;
        if(!id) {
            res.status(400).json({
                message : 'Please provide an id'
            })
            return
        }
        const {productName , productDescription , productPrice , productStockQty , productDiscount , categoryId} = req.body;
        const productImage = req.file ? req.file?.filename : "https://imgs.search.brave.com/vmALrai4jbGqgkctmp3YG72pQAyqEKwNdq82U0wG2kI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzExLzA3LzU5LzE4/LzM2MF9GXzExMDc1/OTE4MDRfZURSMnVa/VFVDZ0U2bzlzOU90/c1NiN1M0M0hGUnpk/V3QuanBn";
        if(!productName || !productDescription || !productPrice || !productStockQty || !categoryId) {
            res.status(400).json({
                message : "Please provide productName , productDescription , productDiscount , productPrice , productStockQty , categoryId"
            })
            return
        }
        const productExists = await Product.findByPk(id);
        if(productExists) {
            res.status(400).json({
                message : "Product with this id doesn't exists !!"
            })
            return
        }
        const product = await Product.update({
            productName ,
            productDescription ,
            productPrice ,
            productStockQty ,
            productDiscount : productDiscount || 0 ,
            categoryId,
            productImage
        },{
            where : {
                id
            }
        })
        res.status(200).json({
            message : "Product updated successfully",
            data : product
        })
    }
}

export default ProductController