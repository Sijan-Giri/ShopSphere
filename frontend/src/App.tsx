import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/user/Register"
import { Provider } from "react-redux"
import store from "./store/store"
import Home from "./pages/home/Home"
import Login from "./pages/user/Login"
import ProductDetail from "./pages/product/ProductDetail"
import MyCart from "./pages/cart/MyCart"
import Checkout from "./pages/checkout/Checkout"
import MyOrder from "./pages/order/MyOrder"
import MyOrderDetail from "./pages/order/MyOrderDetail"
import AdminStats from "./pages/admin"
import AdminProduct from "./pages/admin/components/AdminProduct"
import AdminCategory from "./pages/admin/AdminCategory"
import AdminUser from "./pages/admin/components/AdminUser"
import AdminPayment from "./pages/admin/components/AdminPayment"
import AdminOrder from "./pages/admin/components/AdminOrder"

function App() {

  return (
    <>
     <Provider store={store}>
      <BrowserRouter>
     <Routes>
      <Route path="/register" element={<Register />}/>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/product-detail/:id" element={<ProductDetail />} />
      <Route path="/my-cart" element={<MyCart />}/>
      <Route path="/my-checkout" element={<Checkout />}/>
      <Route path="/my-orders" element={<MyOrder />}/>
      <Route path="/my-order/:id" element={<MyOrderDetail />}/>
      <Route path="/admin/products" element={<AdminProduct />}/>
      <Route path="/admin/users" element={<AdminUser />}/>
      <Route path="/admin/orders" element={<AdminOrder />}/>
      <Route path="/admin/payment" element={<AdminPayment />}/>
      <Route path="/admin/categories" element={<AdminCategory />}/>
      <Route path="/admin" element={<AdminStats />}/>
     </Routes>
     </BrowserRouter>
     </Provider>
    </>
  )
}

export default App
