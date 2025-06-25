import { Link } from "react-router-dom"
import Navbar from "../navbar/Navbar"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { useState, type ChangeEvent, type FormEvent } from "react";
import { PaymentMethod, type IOrderData } from "../../globals/types/types";
import { createOrder } from "../../store/checkoutSlice";

const Checkout = () => {

  const { cart: carts } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch()
  const subtotal = carts?.reduce((acc, product) => acc + product?.Product?.productPrice * product?.quantity, 0)
  const shipping = 100;
  const total = subtotal + shipping

  const [data , setData] = useState<IOrderData>({
    firstName : "",
    lastName : "",
    email : "",
    phoneNumber : "",
    shippingAddress : "",
    paymentMethod : PaymentMethod.Cod,
    totalAmount : 0,
    products : []
  })

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {name , value} = e.target;
    setData({
      ...data,
      [name] : value
    })
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const productData = carts.length > 0 ? carts.map((cart) => {
    return {
      productId : cart?.Product?.id,
      productQty : cart?.quantity
    }
  }) : [];
    const finalData = {
      ...data,
      products : productData,
      totalAmount : total
    }
    dispatch(createOrder(finalData))
  }

  return (
    <>
      <Navbar />
      <div className="bg-white sm:px-8 px-4 py-6">
        <div className="max-w-screen-xl max-md:max-w-xl mx-auto">
              <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 lg:gap-x-12">
            <div className="lg:col-span-2">
                <div>
                  <h2 className="text-xl text-slate-900 font-semibold mb-6">Delivery Details</h2>
                  <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                    <div>
                      <label className="text-sm text-slate-900 font-medium block mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        placeholder="Enter First Name"
                        className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-900 font-medium block mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        placeholder="Enter Last Name"
                        className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-900 font-medium block mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter Email"
                        className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-900 font-medium block mb-2">Phone No.</label>
                      <input
                        type="number"
                        name="phoneNumber"
                        onChange={handleChange}
                        placeholder="Enter Phone No."
                        className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-900 font-medium block mb-2">Shipping Address</label>
                      <input
                        type="text"
                        name="shippingAddress"
                        onChange={handleChange}
                        placeholder="Enter Your Address"
                        className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-900 font-medium block mb-2">City</label>
                      <input
                        type="text"
                        placeholder="Enter City"
                        className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-900 font-medium block mb-2">State</label>
                      <input
                        type="text"
                        placeholder="Enter State"
                        className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-900 font-medium block mb-2">Zip Code</label>
                      <input
                        type="text"
                        placeholder="Enter Zip Code"
                        className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-12">
      <h2 className="text-xl text-slate-900 font-semibold mb-6">Payment</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
          <div>
            <div className="flex items-center">
              <input
                type="radio"
                name="method"
                value="card"
                id="card"
                // checked='card'
                // onChange={handlePaymentMethodChange}
                className="w-5 h-5 cursor-pointer"
              />
              <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                <img
                  src="https://c7.alamy.com/comp/M0FJ47/cod-cash-on-delivery-rubber-stamp-M0FJ47.jpg"
                  className="w-12"
                  alt="MasterCard"
                />
              </label>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500 font-medium">
            Pay with COD
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
          <div>
            <div className="flex items-center">
              <input
                type="radio"
                name="method"
                value="paypal"
                id="paypal"
                className="w-5 h-5 cursor-pointer"
              />
              <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                <img
                  src="https://web.khalti.com/static/img/logo1.png  "
                  className="w-20"
                  alt="PayPal"
                />
              </label>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500 font-medium">
            Pay with Khalti
          </p>
        </div>
      </div>
    </div>
                <div className="mt-12 max-w-md">
                  <p className="text-slate-900 text-sm font-medium mb-2">Do you have a promo code?</p>
                  <div className="flex gap-4">
                    <input
                      type="email"
                      placeholder="Promo code"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                    <button
                      type="button"
                      className="flex items-center justify-center font-medium tracking-wide bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-md text-sm text-white cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              
            </div>

            <div className="relative">
              <h2 className="text-xl text-slate-900 font-semibold mb-6">Order Summary</h2>
              <div className="space-y-6">
                {carts?.length > 0 ? (
                  carts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between space-x-4 border-b border-gray-300 pb-4">
                      <div className="flex items-center space-x-4">
                        <img src={product?.Product?.productImage} alt={product?.Product?.productName} className="w-16 h-16 object-cover" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{product?.Product?.productName}</p>
                          <p className="text-sm text-slate-500">Price: Rs{product?.Product?.productPrice * product?.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-slate-500">Your cart is empty.</p>
                )}
              </div>

              <ul className="text-slate-500 font-medium space-y-4 mt-6">
                <li className="flex flex-wrap gap-4 text-sm">
                  Subtotal <span className="ml-auto font-semibold text-slate-900">Rs {subtotal}</span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Shipping <span className="ml-auto font-semibold text-slate-900">Rs {shipping}</span>
                </li>
                <hr className="border-slate-300" />
                <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">
                  Total <span className="ml-auto">Rs {total}</span>
                </li>
              </ul>

              <div className="space-y-4 mt-8">
                <button
                  type="submit"
                  className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                >
                  Complete Purchase
                </button>
                <Link to="/">
                  <button
                    type="button"
                    className="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-gray-100 hover:bg-gray-200 border border-gray-300 text-slate-900 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
