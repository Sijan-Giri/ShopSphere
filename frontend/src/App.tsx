import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/user/Register"
import { Provider } from "react-redux"
import store from "./store/store"
import Home from "./pages/home/Home"
import Login from "./pages/user/Login"
import ProductDetail from "./pages/product/ProductDetail"

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
     </Routes>
     </BrowserRouter>
     </Provider>
    </>
  )
}

export default App
