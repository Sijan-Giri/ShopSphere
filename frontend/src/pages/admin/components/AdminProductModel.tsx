import { useState, type ChangeEvent, type FormEvent } from "react";
import { fetchCategories } from "../../../store/adminCategorySlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { Status, type IProduct } from "../../../globals/types/types";
import { addProduct, setStatus } from "../../../store/adminProductSlice";

interface ProductModelProps{
    closeModel : () => void
}

const AdminProductModel:React.FC<ProductModelProps> = ({closeModel}:ProductModelProps) => {

    const {status} = useAppSelector((state) => state.adminProduct);

    const [data , setData] = useState<IProduct>({
        productName : '',
        productDescription : '',
        productPrice : 0,
        productStockQty : 0,
        productDiscount : 0,
        productImage : '',
        CategoryId : ''
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
        const {name , value , type} = e.target;
        setData({
            ...data,
            [name] : type == "file" ? (e.target as HTMLInputElement).files?.[0] : value
        })
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addProduct(data))
        if(status == Status.Success) {
            closeModel()
            dispatch(setStatus(Status.Loading))
        }
    }

    const dispatch = useAppDispatch();
    const {category:categories} = useAppSelector((state) => state.categories)

    const handleFetchCategories = () => {
        dispatch(fetchCategories())
    }

  return (
       <>
<div id="modal" className="fixed inset-0 z-50 flex items-center justify-center">
  <div className="fixed inset-0 bg-black/50" />
  <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Product</h3>
      <button onClick={closeModel} id="closeModalButton" className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        <svg className="h-4 w-4 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="product_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Name</label>
          <input
            onChange={handleChange}
            id="product_name"
            name="productName"
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label htmlFor="product_description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Description</label>
          <textarea
          onChange={handleChange}
            id="product_description"
            name="productDescription"
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter product description"
            required
          />
        </div>

        {/* Product Price */}
        <div>
          <label htmlFor="product_price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Price</label>
          <input
          onChange={handleChange}
            id="product_price"
            name="productPrice"
            type="number"
            step="0.01"
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter product price"
            required
          />
        </div>

        {/* Product Stock Quantity */}
        <div>
          <label htmlFor="product_stock_qty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Stock Quantity</label>
          <input
          onChange={handleChange}
            id="product_stock_qty"
            name="productStockQty"
            type="number"
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter stock quantity"
            required
          />
        </div>

        {/* Product Discount */}
        <div>
          <label htmlFor="product_discount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Discount (%)</label>
          <input
          onChange={handleChange}
            id="product_discount"
            name="productDiscount"
            type="number"
            step="0.1"
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Enter discount percentage"
          />
        </div>

        {/* Product Image */}
        <div>
          <label htmlFor="product_image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Image</label>
          <input
          onChange={handleChange}
            id="product_image"
            name="productImage"
            type="file"
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        {/* Category Select */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Category</label>
          <select
          onChange={handleChange}
            onClick={handleFetchCategories}
            id="category"
            name="CategoryId"
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            required
          >
            <option value="">Choose a category</option>
            {
                categories?.length > 0 && categories?.map((category) => {
                    return (
                        <>
                        <option value={category?.id} >{category?.categoryName}</option>
                        </>
                    )
                })
            }
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={closeModel} id="cancelButton" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
            Cancel
          </button>
          <button
            id="submitProductButton"
            className="flex items-center justify-center px-4 py-2 cursor-pointer text-sm font-medium text-white rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 dark:from-indigo-500 dark:to-violet-500 dark:hover:from-indigo-600 dark:hover:to-violet-600"
          >
            Add Product
            <svg className="h-4 w-4 inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  </div>
</div>

    </>
  )
}

export default AdminProductModel