import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/user/Register"
import { Provider } from "react-redux"
import store from "./store/store"
import Home from "./pages/home/Home"
import Login from "./pages/user/Login"

function App() {

  return (
    <>
     <Provider store={store}>
      <BrowserRouter>
     <Routes>
      <Route path="/register" element={<Register />}/>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
     </Routes>
     </BrowserRouter>
     </Provider>
    </>
  )
}

export default App
