import { Request, Response } from "express";
import Category from "../database/models/categoryModel";

class CategoryController{
    categoryData = [
            {
                categoryName : "Electronics"
            },
            {
                categoryName : "Groceries"
            },
            {
                categoryName : "Foods"
            }
        ]

         async seedCategory():Promise<void>{
            const categoryExists = await Category.findAll();
            if(categoryExists.length <= 0) {
                await Category.bulkCreate(this.categoryData);
                console.log("Category seeded successfully !!")
            }
            else {
                console.log("Category already seeded !!")
            }
        }

        async addCategory(req:Request,res:Response):Promise<void>{
            const {categoryName} = req.body;
            if(!categoryName) {
                res.status(400).json({
                    message : "Please provide category name"
                })
                return
            }
            const category = await Category.create({
                categoryName
            })
            res.status(200).json({
                message : "Category created successfully",
                data : category
            })
        }

        async getCategory(req:Request,res:Response):Promise<void>{

            const category = await Category.findAll();
            if(category.length <= 0) {
                res.status(400).json({
                    message : "No category available !!"
                })
                return
            } 
            res.status(200).json({
                message : "Category fetched successfully",
                data : category
            })
        }

        async deleteCategory(req:Request,res:Response):Promise<void>{
            const {id} = req.params;
            if(!id) {
                res.status(400).json({
                    message : "Please provide id"
                })
                return
            }
            const categoryExists = await Category.findByPk(id)
            if(!categoryExists) {
                res.status(400).json({
                    message : "No category found with this id!!"
                })
                return
            }
            await Category.destroy({
                where : {
                    id
                }
            })
            res.status(200).json({
                message : "Category deleted successfully !!"
            })
        }

        async updateCategory(req:Request,res:Response):Promise<void>{
            const {categoryName} = req.body;
            if(!categoryName) {
                res.status(400).json({
                    message : "Please provide category name !!"
                })
                return
            }
            const {id} = req.params;
            if(!id) {
                res.status(400).json({
                    message : "Please provide id"
                })
                return
            }
            const categoryExists = await Category.findByPk(id);
            if(!categoryExists) {
                res.status(400).json({
                    message : "No category found with this id !!"
                })
                return
            }
            const updatedCategory = await Category.update({
                categoryName
            },{
                where : {id}
            },)
            res.status(200).json({
                message : "Category updated successfully !!",
                data : updatedCategory
            })
        }
}

export default new CategoryController