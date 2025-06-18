import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/user/Register"
import { Provider } from "react-redux"
import store from "./store/store"

function App() {

  return (
    <>
     <Provider store={store}>
      <BrowserRouter>
     <Routes>
      <Route path="/register" element={<Register />}/>
     </Routes>
     </BrowserRouter>
     </Provider>
    </>
  )
}

export default App
