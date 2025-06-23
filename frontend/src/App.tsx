import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/user/Register"
import { Provider } from "react-redux"
import store from "./store/store"
import Home from "./pages/home/Home"
import Login from "./pages/user/Login"
import ProductDetail from "./pages/product/ProductDetail"
import MyCart from "./pages/cart/MyCart"

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
     </Routes>
     </BrowserRouter>
     </Provider>
    </>
  )
}

export default App
