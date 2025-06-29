import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import Navbar from "../navbar/Navbar"
import { fetchMyOrders } from "../../store/checkoutSlice";
import { Link } from "react-router-dom";

const MyOrder = () => {
    const dispatch = useAppDispatch();
    const {order : items} = useAppSelector((state) => state.checkout)
    const [searchTerm , setSearchTerm] = useState<string>("");

  const filteredOrder = items?.filter((item) => item?.id.toLowerCase().includes(searchTerm) || item?.orderStatus.toLowerCase().includes(searchTerm) || item?.Payment?.paymentMethod.toLowerCase().includes(searchTerm) || item?.totalAmount.toString().toLowerCase().includes(searchTerm))

    useEffect(() => {
        dispatch(fetchMyOrders())
    },[])
  return (
    <div>
        <Navbar />
    <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
      <div>
        <h3 className="text-lg font-semibold text-slate-800">Shopping Cart</h3>
        <p className="text-slate-500">Review your ordered items.</p>
      </div>
      <div className="mx-3">
        <div className="w-full max-w-sm min-w-[200px] relative">
          <div className="relative">
            <input className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md" placeholder="Search for order..." onChange={(e) => setSearchTerm(e.target.value)} />
            <button className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded " type="button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8 text-slate-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr className="border-b border-slate-300 bg-slate-50">
            <th className="p-4 text-sm font-normal leading-none text-slate-500">Order Id</th>
            <th className="p-4 text-sm font-normal leading-none text-slate-500">Order Status</th>
            <th className="p-4 text-sm font-normal leading-none text-slate-500">Total Amount</th>
            <th className="p-4 text-sm font-normal leading-none text-slate-500">Payment Method</th>
            <th className="p-4 text-sm font-normal leading-none text-slate-500">Delete</th>
            <th className="p-4 text-sm font-normal leading-none text-slate-500" />
          </tr>
        </thead>
        <tbody>
          {
            filteredOrder?.map((item) => {
                return (
                    <>
                    <tr className="hover:bg-slate-50">
            <td className="p-4 border-b border-slate-200 py-5">
              <Link to={`/my-order/${item?.id}`}><p className="text-sm text-slate-500">{item?.id}</p></Link>
            </td>
            <td className="p-4 border-b border-slate-200 py-5">
              <p className="block font-semibold text-sm text-slate-800">{item?.orderStatus}</p>
            </td>
            <td className="p-4 border-b border-slate-200 py-5">
              <p className="text-sm text-slate-500">{item?.totalAmount}</p>
            </td>
            <td className="p-4 border-b border-slate-200 py-5">
              <p className="text-sm text-slate-500">{item?.Payment?.paymentMethod}</p>
            </td>
            <td className="p-4 border-b border-slate-200 py-5">
              <button type="button" className="text-slate-500 hover:text-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </td>
          </tr>
                    </>
                )
            })
          }
        </tbody>
      </table>
    </div></div>

  )
}

export default MyOrder