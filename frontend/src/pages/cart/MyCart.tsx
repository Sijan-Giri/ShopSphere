import { deleteMyCartItem, updateCartItem } from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import Navbar from "../navbar/Navbar"

const MyCart = () => {
  const {cart:carts} = useAppSelector((state) => state.cart);
   const dispatch = useAppDispatch();

  const subTotal = carts?.reduce((total , cart) => total + cart?.Product?.productPrice * cart?.quantity,0);

  const totalQty = carts?.length > 0 && carts?.reduce((total,cart) => total + cart?.quantity ,0);

  const shippingCharge = 100;

  const total = subTotal + shippingCharge

  const handleUpdate = (productId : string, quantity : number) => {
    dispatch(updateCartItem(productId , quantity))
  }

  const handleDelete = (productId: string) => {
    dispatch(deleteMyCartItem(productId))
  }

  return (
<>
<Navbar />
    <div>
  <div className="flex flex-col justify-center items-center min-h-screen">
    <div className="bg-gray-100 rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {
        carts?.length > 0 && carts?.map((cart) => {
          return (
            <>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <img 
            src={cart?.Product?.productImage} 
            alt="Product Image" 
            className="mr-4" 
            style={{ width: '100px', height: 'auto' }} 
          />
          <div>
            <h2 className="font-bold">{cart?.Product?.productName}</h2>
          </div>
        </div>
        <div className="flex items-center">
          <button className="text-red-500 hover:text-red-700"><i className="fas fa-trash" /></button>
          <div className="mx-4 flex items-center">
            <button 
              className="text-lg px-2 py-1 bg-gray-200 rounded" 
              onClick={() => handleUpdate(cart?.Product?.id , cart?.quantity - 1 )}
            >
              -
            </button>
            <input 
              type="number" 
              value={cart?.quantity} 
              className="w-16 text-center mx-2"
            />
            <button 
              className="text-lg px-2 py-1 bg-gray-200 rounded" 
              onClick={() => handleUpdate(cart?.Product?.id , cart?.quantity + 1 )}
            >
              +
            </button>
          </div>
          <span className="font-bold">{cart?.Product?.productPrice * cart?.quantity}</span>
          <button onClick={() => handleDelete(cart?.Product?.id)} className="ml-6 bg-red-500 text-amber-50 p-2">Delete</button>
        </div>
      </div>
    </>
          )
        })
      }
      <hr className="my-4" />
      <div className="flex justify-between items-center">
        <span className="font-bold">Subtotal:</span>
        <span className="font-bold">{subTotal}</span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span>Total Quantity:</span>
        <span>{totalQty}</span>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between items-center">
        <span className="font-bold">Shipping Charge:</span>
        <span className="font-bold">100</span>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between items-center">
        <span className="font-bold">Total:</span>
        <span className="font-bold">{total}</span>
      </div>
      <div className="flex justify-center mt-6">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Checkout</button>
      </div>
    </div>
  </div>
</div>
</>

  )
}

export default MyCart