import { Link } from "react-router-dom"
import type { IProduct } from "../../globals/types/types"

interface ICardProps{
  product : IProduct
}

const Card:React.FC<ICardProps> = ({product}) => {
  return (
    <>
  <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
  <div className="w-full h-48 bg-gray-200 flex justify-center items-center">
    {product?.productImage ? (
      <img className="w-full object-cover" src={`${product?.productImage}`} alt="Product Image" />
    ) : (
      <span className="text-gray-500">No Image Available</span>
    )}
  </div>
  
  <div className="p-5">
    <h3 className="text-lg font-semibold text-gray-800">{product?.productName}</h3>
    <p className="text-gray-600 text-sm mt-2">{product?.productDescription}</p>
    <div className="flex items-center justify-between mt-4">
      <span className="text-xl font-bold text-orange-500">${product?.productPrice}</span>
      <Link to={`/product-detail/${product?.id}`}><button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition duration-200">
        Read More
      </button></Link>
    </div>
  </div>
</div>

    </>
  )
}

export default Card