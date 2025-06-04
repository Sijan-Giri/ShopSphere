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
}

export default new CategoryController